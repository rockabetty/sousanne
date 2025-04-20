import {
  parsePriceOrThrow,
  parseIntegerOrThrow,
} from '@server-services/sanitizer'
import { PriceModel } from '../prices.types'
import { insertPrices } from '../outbound/priceRepository'
import { handleServiceError } from '@errors'
import { ErrorKeys } from '../errors.types'
import { ApiResponse } from '@errors/apiResponse.types'

export async function addPrices(
  productId: number,
  prices: PriceModel[]
): Promise<ApiResponse<PriceModel[]>> {
  try {
    const priceTransaction = await insertPrices(productId, prices)
    if (priceTransaction.length > 0) {
      return {
        success: true,
        data: priceTransaction,
      }
    }
    return {
      success: false,
      error: ErrorKeys.PRICES_NOT_CREATED,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

export async function getPrices(
  productId: number,
  storeId: number
): Promise<ApiResponse<PriceModel[]>> {
  try {
    const productId = parseIntegerOrThrow(productId)
    const storeId = parseIntegerOrThrow(storeId)
    const priceList = await getPrices(productId, storeId)
    return {
      success: true,
      data: priceList,
    }
  } catch (error) {
    handleServiceError(error)
  }
}
