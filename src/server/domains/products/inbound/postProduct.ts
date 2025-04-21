import { ErrorKeys as CoreErrorKeys } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'
import { acceptPostOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { addBrandedProducts, addProduct } from '../core/productService'
import { addPrices } from '@domains/prices/core/priceService'
import { sendErrorResponse } from '@errors'
import {
  alphaNumericAndSpacingOnly,
  parseFloatOrReject,
  parseIntegerOrReject,
  parseStringOrReject,
} from '@server-services/sanitizer'
import { selectUnitByAbbreviation } from '@domains/units/outbound/unitRepository'
import { validatePackageType } from './validators'
import { parseValidPrices } from '@domains/prices/inbound/validators'
import { PriceModel, UserSubmittedPrice } from '@domains/prices/prices.types'
import { rateLimit } from '@errors/methodgatekeeper'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)
  const { body } = req
  rateLimit(req, res)

  try {
    const {
      name,
      ingredientId,
      packageAmount,
      packageCount,
      packageType,
      unitName,
      organic,
    } = body.product

    if (!ingredientId || !packageType) {
      return sendErrorResponse(res, CoreErrorKeys.MISSING_REQUIRED_FIELDS)
    }

    try {
      const validIngredientId = parseIntegerOrReject(ingredientId, res, true)
      if (!validIngredientId) {
        return sendErrorResponse(res, CoreErrorKeys.INVALID_REQUEST)
      }

      const validPackageType = validatePackageType(packageType, res)

      const validPackageAmount = parseFloatOrReject(packageAmount, res) || 1
      const validPackageCount = parseIntegerOrReject(packageCount, res) || 1

      const unit = await selectUnitByAbbreviation(unitName)
      if (!unit) {
        return sendErrorResponse(res, ErrorKeys.UNIT_NOT_FOUND)
      }

      const validName = name ? alphaNumericAndSpacingOnly(name) : null

      const validatedProduct = {
        name: validName,
        ingredient_id: validIngredientId,
        packageAmount: validPackageAmount,
        packageCount: validPackageCount,
        packageType: validPackageType,
        unitName,
        organic: !!organic,
      }

      const newProduct = await addProduct(validatedProduct)

      if (newProduct?.success) {
        const { prices } = body

        if (!!prices) {
          const parentId = newProduct.data.id
          const brandList: number[] = []
          prices.forEach((price) => {
            const num = parseIntegerOrReject(price.brandId, res)
            const name = parseStringOrReject(price.brandName, res)
            if (num && name) {
              brandList.push({
                brand_id: num,
                productName: `${newProduct.data.name} by ${name}`,
              })
            }
          })
          const brandedProducts = await addBrandedProducts(parentId, brandList)

          const priceList = parseValidPrices(prices, newProduct.data.id, res)
          const newPrices = await addPrices(newProduct.data.id, priceList)
          if (newPrices.success) {
            return res
              .status(200)
              .send({ product: newProduct.data, prices: newPrices })
          }
          sendErrorResponse(
            res,
            newPrices.error || CoreErrorKeys.GENERAL_SERVER_ERROR
          )
        }
        return res.status(200).send({ product: newProduct.data })
      }
      if (newProduct?.error) {
        sendErrorResponse(
          res,
          newProduct?.error || ErrorKeys.FAILURE_TO_CREATE_PRODUCT
        )
      }
    } catch (validationError) {
      if (validationError instanceof Error) {
        sendErrorResponse(
          res,
          (validationError.message as ErrorKeys) ||
            ErrorKeys.INVALID_PRODUCT_DATA
        )
      }
      return sendErrorResponse(res, ErrorKeys.INVALID_PRODUCT_DATA)
    }
  } catch (error) {
    return sendErrorResponse(res, ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
