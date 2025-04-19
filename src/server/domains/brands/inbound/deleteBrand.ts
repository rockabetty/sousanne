import { ErrorKeys } from '@errors/errors.types'
import { NextApiRequest, NextApiResponse } from 'next'
import { removeBrand } from '../core/brandService'
import { parseIntegerOrThrow } from '@server-services/sanitizer'
import { acceptPostOnly } from '@errors/methodgatekeeper'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)

  const { id } = req.query

  if (!id) {
    res.status(400).json(ErrorKeys.INVALID_REQUEST)
    return
  }

  try {
    const brandId = parseIntegerOrThrow(id as string)
    const result = await removeBrand(brandId)

    if (result.success) {
      res.status(200).json({ success: true })
    } else {
      res.status(404).json(result.error)
    }
  } catch (error) {
    res.status(500).json(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
