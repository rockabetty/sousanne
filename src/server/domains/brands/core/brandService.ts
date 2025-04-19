import { handleServiceError } from '@errors'
import {
  insertBrand,
  selectBrandById,
  selectBrandByName,
  selectBrands,
  updateBrand,
  deleteBrand,
} from '../outbound/brandRepository'
import { alphaNumericAndSpacingOnly } from '@server-services/sanitizer'
import { ErrorKeys as CoreErrors } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'
import { BrandModel } from '../brands.types'

export async function addBrand(brandData: { name: string }) {
  try {
    const { name } = brandData

    if (!name) {
      return {
        success: false,
        error: ErrorKeys.INVALID_BRAND_DATA,
      }
    }

    const sanitizedName = alphaNumericAndSpacingOnly(name)

    const existingBrand = await selectBrandByName(sanitizedName)
    if (existingBrand && existingBrand.length > 0) {
      return {
        success: false,
        error: ErrorKeys.BRAND_NAME_DUPLICATE,
      }
    }

    const brandId = await insertBrand({ name: sanitizedName })
    if (brandId) {
      return {
        success: true,
        data: brandId,
      }
    }

    return {
      success: false,
      error: ErrorKeys.FAILURE_TO_CREATE_BRAND,
    }
  } catch (error) {
    return handleServiceError(error)
  }
}

export async function getBrand(id: number) {
  try {
    const brand = await selectBrandById(id)
    if (!brand || brand.length === 0) {
      return {
        success: false,
        error: ErrorKeys.BRAND_NOT_FOUND,
      }
    }

    return {
      success: true,
      data: brand[0],
    }
  } catch (error) {
    return handleServiceError(error)
  }
}

export async function getBrands() {
  try {
    const brands = await selectBrands()
    return {
      success: true,
      data: brands,
    }
  } catch (error) {
    return handleServiceError(error)
  }
}

export async function updateBrandById(id: number, brandData: { name: string }) {
  try {
    const { name } = brandData

    if (!name) {
      return {
        success: false,
        error: ErrorKeys.INVALID_BRAND_DATA,
      }
    }
    const existingBrand = await selectBrandById(id)
    if (!existingBrand || existingBrand.length === 0) {
      return {
        success: false,
        error: ErrorKeys.BRAND_NOT_FOUND,
      }
    }

    const sanitizedName = alphaNumericAndSpacingOnly(name)

    const duplicateBrand = await selectBrandByName(sanitizedName)
    if (
      duplicateBrand &&
      duplicateBrand.length > 0 &&
      duplicateBrand[0].id !== id
    ) {
      return {
        success: false,
        error: ErrorKeys.BRAND_NAME_DUPLICATE,
      }
    }

    const updated = await updateBrand(id, { name: sanitizedName })
    if (updated) {
      return {
        success: true,
        data: updated,
      }
    }

    return {
      success: false,
      error: ErrorKeys.BRAND_NOT_FOUND,
    }
  } catch (error) {
    return handleServiceError(error)
  }
}

export async function removeBrand(id: number) {
  try {
    // Check if brand exists
    const existingBrand = await selectBrandById(id)
    if (!existingBrand || existingBrand.length === 0) {
      return {
        success: false,
        error: ErrorKeys.BRAND_NOT_FOUND,
      }
    }

    const result = await deleteBrand(id)
    if (result) {
      return {
        success: true,
        data: { id },
      }
    }

    return {
      success: false,
      error: ErrorKeys.BRAND_NOT_FOUND,
    }
  } catch (error) {
    return handleServiceError(error)
  }
}
