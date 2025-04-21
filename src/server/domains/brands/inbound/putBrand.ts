import { ErrorKeys } from '@errors/errors.types'
import { acceptPutOnly, rateLimit } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { updateBrandById } from '../core/brandService'
import { sendErrorResponse } from '@errors'
import { parseIntegerOrReject } from '@server-services/sanitizer'
import { rateLimit } from '@errors/methodgatekeeper'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPutOnly(req, res)
  rateLimit(req, res)
  const { body, query } = req
  const { id } = query

  if (!id) {
    res.status(400).json(ErrorKeys.INVALID_REQUEST)
    return
  }

  try {
    const brandId = parseIntegerOrReject(id as string, res, true)
    const { name } = body
    if (!brandId || !name) {
      sendErrorResponse(res, ErrorKeys.MISSING_REQUIRED_FIELDS)
    }

    const updatedBrand = await updateBrandById(brandId as number, { name })

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
