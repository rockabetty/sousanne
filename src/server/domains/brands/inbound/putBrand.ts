import { ErrorKeys } from '@errors/errors.types'
import { acceptPutOnly, rateLimit } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { updateBrandById } from '../core/brandService'
import { parseIntegerOrThrow } from '@server-services/sanitizer'
import { sendErrorResponse } from '@errors'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPutOnly(req, res)
  rateLimit
  const { body, query } = req
  const { id } = query

  if (!id) {
    res.status(400).json(ErrorKeys.INVALID_REQUEST)
    return
  }

  try {
    const brandId = parseIntegerOrThrow(id)
    const { name } = body

    if (!name) {
      sendErrorResponse(res, ErrorKeys.MISSING_REQUIRED_FIELDS)
    }

    const updatedBrand = await updateBrandById(brandId, { name })

    if (updatedBrand.success) {
      res.status(200).json({ brand: updatedBrand.data })
    } else {
      sendErrorResponse(res, updatedBrand.error)
    }
  } catch (error) {
    res.status(500).json(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
