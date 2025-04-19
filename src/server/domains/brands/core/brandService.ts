import { handleServiceError } from '@errors'
import { BrandModel } from '../brands.types'
import { selectBrands } from '../outbound/brandRepository'
import { ApiResponse } from '@errors/apiResponse.types'

export async function getBrands(): Promise<ApiResponse<BrandModel[]>> {
  try {
    const brands = await selectBrands()
    return {
      success: true,
      data: brands,
    }
  } catch (error) {
    handleServiceError(error)
  }
}
