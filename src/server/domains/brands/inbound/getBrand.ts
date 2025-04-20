import { ErrorKeys as CoreErrorKeys } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'
import { acceptGetOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { getBrand } from '../core/brandService'
import { parseIntegerOrReject } from '@server-services/sanitizer'
import { sendErrorResponse } from '@errors'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptGetOnly(req, res)

  const { id } = req.query

  if (!id) {
    res.status(400).json(CoreErrorKeys.INVALID_REQUEST)
    return
  }

  try {
    const brandId = parseIntegerOrReject(id as string, res, true)
    if (brandId) {
      const brand = await getBrand(brandId)
      if (brand.success) {
        res.status(200).json(brand.data)
      } else {
        sendErrorResponse(res, brand.error)
      }
    }
    sendErrorResponse(res, ErrorKeys.BRAND_NOT_FOUND)
  } catch (error) {
    res.status(500).json(CoreErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
