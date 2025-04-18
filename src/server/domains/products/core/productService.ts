import { handleServiceError } from '@errors'
import {
  insertOrSelectOneBrandedProduct,
  insertOrSelectOneProduct,
} from '../outbound/productRepository'
import {
  alphaNumericAndSpacingOnly,
  isValidInteger,
  isValidNumber,
  parseFloatOrThrow,
  parseIntegerOrThrow,
} from '@server-services/sanitizer'
import { ErrorKeys as CoreErrors } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'
import { selectUnitByAbbreviation } from '@domains/units/outbound/unitRepository'
import { selectIngredientById } from '@domains/ingredients/outbound/ingredientRepository'
import { BrandedProduct, ProductModel } from '../products.types'
import { selectBrandByName } from '@domains/brands/outbound/brandRepository'

export const parsePackageTypeOrThrow = (packageType: string) => {
  const trimmed = packageType.trim()
  if (['single', 'multiple', 'weight', 'apiece'].includes(trimmed)) {
    return trimmed
  } else {
    throw new Error(CoreErrors.INVALID_REQUEST)
  }
}

const generateDefaultProductNameFromData = async function (
  product: ProductModel,
  unitName: string
): Promise<string> {
  const ingredientData = await selectIngredientById(product.ingredient_id)
  const { name } = ingredientData
  let ingredientName = name
  let multipackString = ''
  let quantityString = ''

  if (product.package_count && product.package_count > 1) {
    multipackString = `${product.package_count}-pack of `
  }
  if (product.display_quantity && product.display_quantity > 0) {
    quantityString = `${product.display_quantity} ${unitName}`
  }

  if (product.packaged_item == false) {
    // e.g. "Sugar, Bulk"
    return `${name}, Bulk`
  }

  // e.g. "Canned Tuna, 3-pack of 5 oz"
  // e.g. "Canned Tuna, 7 oz"
  return `${name}, ${multipackString}${quantityString}`
}

export async function addProduct(productData: BrandedProduct) {
  /* Since Products are in an adjacency list,
     we want to create the generic version first if it
     doesn't exist, then create the branded one.
    */
  try {
    const genericProduct = await addGenericProduct(productData)

    if (productData.brand_id) {
      const brand = await selectBrandByName(productData.brand)
      if (genericProduct.success) {
        const data = {
          product_id: genericProduct.data.product_id,
          brand_id: brand.data.id,
        }
        const product = await insertOrSelectOneBrandedProduct(data)
        return {
          success: true,
          data: product.data,
        }
      }
    }

    return {
      success: true,
      data: genericProduct.data,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

export async function addGenericProduct(productData) {
  try {
    const {
      ingredient_id,
      packageAmount,
      packageCount,
      packageType,
      unitName,
      product_template_id,
    } = productData

    const product: ProductModel = {
      id: -1,
      name: '',
      ingredient_id: -1,
      unit_id: -1,
      brand_id: null,
    }

    const parsedPackageType = parsePackageTypeOrThrow(packageType) // Removed second parameter
    product.packaged_item = ['single', 'multiple'].includes(parsedPackageType)
    const id = parseIntegerOrThrow(ingredient_id, true)
    if (!id) {
      handleServiceError(CoreErrors.INVALID_REQUEST)
    }
    product.ingredient_id = id
    product.display_quantity = parseFloatOrThrow(packageAmount)
    product.package_count = parseIntegerOrThrow(packageCount) || 1

    if (productData.name) {
      product.name = alphaNumericAndSpacingOnly(productData.name)
    } else {
      product.name = await generateDefaultProductNameFromData(product, unitName)
    }

    const unit = await selectUnitByAbbreviation(unitName)
    if (!unit) {
      handleServiceError(CoreErrors.INVALID_REQUEST)
    }
    product.unit_id = unit.id

    const productId = await insertOrSelectOneProduct(product)
    if (!!productId) {
      return {
        success: true,
        data: productId,
      }
    }
    return {
      success: false,
      error: ErrorKeys.FAILURE_TO_FINDSERT,
    }
  } catch (error) {
    handleServiceError(error)
  }
}
