import {
  parseIntegerOrReject,
  parsePriceOrReject,
} from '@server-services/sanitizer'
import { NextApiResponse } from 'next'
import { PriceModel, UserSubmittedPrice } from '../prices.types'
import { sendErrorResponse } from '@errors'
import { ErrorKeys } from '@errors/errors.types'

export const parseValidPrices = function (
  prices: UserSubmittedPrice[],
  productId: string,
  res: NextApiResponse
): UserSubmittedPrice[] {
  console.log('parse valid prices invoked')
  const validPrices = []
  for (let currPrice of prices) {
    const newPrice = {} as Partial<PriceModel>
    const { price, storeId, currencyId } = currPrice
    if (!price || !productId || !storeId || !currencyId) {
      sendErrorResponse(res, ErrorKeys.MISSING_REQUIRED_FIELDS)
    }

    newPrice.price = parsePriceOrReject(price, res, true) || undefined
    newPrice.product_id =
      parseIntegerOrReject(productId, res, true) || undefined
    newPrice.store_id = parseIntegerOrReject(storeId, res, true) || undefined
    newPrice.currency_id = parseIntegerOrReject(currencyId, res) || undefined
    validPrices.push(newPrice)
  }

  return validPrices
}
