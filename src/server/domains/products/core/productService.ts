import { handleServiceError } from '@errors'
import {
  insertOrSelectOneBrandedProduct,
  insertOrSelectOneProduct,
} from '../outbound/productRepository'
import { ErrorKeys as CoreErrors } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'
import { selectIngredientById } from '@domains/ingredients/outbound/ingredientRepository'
import { Product, ProductFormSubmission, ProductModel } from '../products.types'
import { selectUnitByAbbreviation } from '@domains/units/outbound/unitRepository'

const generateDefaultProductNameFromData = async function (
  product: Product,
  unitName: string
): Promise<string> {
  const ingredientData = await selectIngredientById(product.ingredient_id)
  let { name } = ingredientData
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
  name = `${name}, ${multipackString}${quantityString}`
  if (!!product.organic) {
    name += ', Organic'
  }
  return name
}

export async function addProduct(productData: Product) {
  /* Since Products are in an adjacency list,
     we want to create the generic version first if it
     doesn't exist, then create the branded one.
    */
  try {
    const genericProduct = await addGenericProduct(productData)

    if (genericProduct?.success) {
      if (!!productData?.brand_id) {
        const { brand_id } = productData
        const data = {
          product_id: genericProduct.data.product_id,
          brand_id: brand_id,
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
      data: genericProduct?.data,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

export async function addGenericProduct(productData: ProductFormSubmission) {
  try {
    const {
      ingredient_id,
      packageAmount,
      packageCount,
      packageType,
      unitName,
      product_id,
    } = productData

    const product: ProductModel = {
      id: -1,
      name: '',
      ingredient_id: ingredient_id,
      unit_id: -1,
      brand_id: null,
    }

    product.packaged_item = ['single', 'multiple'].includes(packageType)
    product.display_quantity = packageAmount
    product.package_count = packageCount

    product.name = await generateDefaultProductNameFromData(product, unitName)

    const unit = await selectUnitByAbbreviation(unitName)
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
      error: ErrorKeys.FAILURE_TO_CREATE_PRODUCT,
    }
  } catch (error) {
    handleServiceError(error)
  }
}
