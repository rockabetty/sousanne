import { ErrorKeys } from '@errors/errors.types'
import { acceptPutOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { updateBrandById } from '../core/brandService'
import { parseIntegerOrThrow } from '@server-services/sanitizer'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPutOnly(req, res)
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
      res.status(400).json(ErrorKeys.INVALID_REQUEST)
      return
    }

    const updatedBrand = await updateBrandById(brandId, { name })

    if (updatedBrand.success) {
      res.status(200).json({ brand: updatedBrand.data })
    } else {
      res.status(400).json(updatedBrand.error)
    }
  } catch (error) {
    res.status(500).json(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
