import { sendErrorResponse } from '@errors'
import { ErrorKeys } from '@errors/errors.types'
import {
  parseIntegerOrReject,
  parseStringOrReject,
} from '@server-services/sanitizer'
import { NextApiRequest, NextApiResponse } from 'next'
import { addStore } from '../core/storeService'

export const postStoreHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let { name, city, state, street, zipcode } = req.body
  console.log('handler')
  console.log(req.body)

  if (zipcode.length != 5) {
    sendErrorResponse(res, ErrorKeys.INVALID_REQUEST)
  }
  name = parseStringOrReject(name, res)
  zipcode = parseIntegerOrReject(zipcode, res)
  // longest street name in the US is ~38 characters, this is plenty
  street = parseStringOrReject(street, res, 50)
  city = parseStringOrReject(street, res, 50)
  // longest state names in US are 14 chars
  state = parseStringOrReject(state, res, 14)

  const newStore = await addStore({
    name,
    street,
    state,
    city,
    zipcode,
  })

  if (newStore.success) {
    return res.status(200).send(newStore.data)
  }
  return sendErrorResponse(res, ErrorKeys.GENERAL_SERVER_ERROR)
}

export default postStoreHandler
