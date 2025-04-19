import { ErrorKeys as CoreErrorKeys } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'
import { acceptPostOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { addProduct } from '../core/productService'
import { addPrices } from '@domains/prices/core/priceService'
import { sendErrorResponse } from '@errors'
import {
  alphaNumericAndSpacingOnly,
  parseFloatOrReject,
  parseIntegerOrReject,
} from '@server-services/sanitizer'
import { selectUnitByAbbreviation } from '@domains/units/outbound/unitRepository'
import { validatePackageType } from './validators'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)
  const { body } = req
  console.log(body)

  try {
    const {
      name,
      ingredient_id,
      packageAmount,
      packageCount,
      packageType,
      unitName,
      organic,
    } = body.product

    if (!ingredient_id || !packageType) {
      return sendErrorResponse(res, CoreErrorKeys.MISSING_REQUIRED_FIELDS)
    }

    try {
      const validIngredientId = parseInteger(ingredient_id, true)
      if (!validIngredientId) {
        return sendErrorResponse(res, CoreErrorKeys.INVALID_REQUEST)
      }

      const validPackageType = validatePackageType(packageType)

      const validPackageAmount = parseFloatOrReject(packageAmount, res) || 1
      const validPackageCount = parseIntegerOrReject(packageCount, res) || 1

      // Validate unit exists
      const unit = await selectUnitByAbbreviation(unitName)
      if (!unit) {
        return sendErrorResponse(res, ErrorKeys.UNIT_NOT_FOUND)
      }

      // Validate name if provided
      const validName = name ? alphaNumericAndSpacingOnly(name) : null

      // Create validated product object
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
          const newPrices = await addPrices(newProduct.data.id, prices)
          if (newPrices.success) {
            return res
              .status(200)
              .send({ product: newProduct.data, prices: newPrices })
          }
          return sendErrorResponse(
            res,
            newPrices.error || CoreErrorKeys.GENERAL_SERVER_ERROR
          )
        }
        return res.status(200).send({ product: newProduct.data })
      }
      if (newProduct?.error) {
        return sendErrorResponse(
          res,
          newProduct?.error || ErrorKeys.FAILURE_TO_CREATE_PRODUCT
        )
      }
    } catch (validationError) {
      if (validationError instanceof Error) {
        return sendErrorResponse(
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
