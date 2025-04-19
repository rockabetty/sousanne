import { ErrorKeys } from '@errors/errors.types'
import { acceptGetOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { getBrand } from '../core/brandService'
import { parseIntegerOrThrow } from '@server-services/sanitizer'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptGetOnly(req, res)

  const { id } = req.query

  if (!id) {
    res.status(400).json(ErrorKeys.INVALID_REQUEST)
    return
  }

  try {
    const brandId = parseIntegerOrThrow(id)
    const brand = await getBrand(brandId)

    if (brand.success) {
      res.status(200).json(brand.data)
    } else {
      res.status(404).json(brand.error)
    }
  } catch (error) {
    res.status(500).json(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
