import { ErrorKeys as CoreErrorKeys } from '@errors/errors.types'
import { ErrorKeys } from '../errors.types'
import { NextApiRequest, NextApiResponse } from 'next'
import { removeBrand } from '../core/brandService'
import { parseIntegerOrReject } from '@server-services/sanitizer'
import { acceptPostOnly, rateLimit } from '@errors/methodgatekeeper'
import { sendError } from 'next/dist/server/api-utils'
import { sendErrorResponse } from '@errors'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)
  rateLimit(req, res)
  const { id } = req.query

  if (!id) {
    res.status(400).json(CoreErrorKeys.INVALID_REQUEST)
    return
  }

  try {
    const brandId = parseIntegerOrReject(id as string, res, true)
    if (brandId) {
      const result = await removeBrand(brandId)
      if (result.success) {
        res.status(200).json({ success: true })
      } else {
        res.status(404).json(result.error)
      }
    }
    sendErrorResponse(res, ErrorKeys.BRAND_NOT_FOUND)
  } catch (error) {
    res.status(500).json(CoreErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
