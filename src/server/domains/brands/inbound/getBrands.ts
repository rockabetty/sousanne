import { ErrorKeys } from '@errors/errors.types'
import { acceptGetOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { getBrands } from '../core/brandService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptGetOnly(req, res)

  try {
    const brands = await getBrands()

    if (brands.success) {
      res.status(200).json(brands.data)
    } else {
      res.status(400).json(brands.error)
    }
  } catch (error) {
    res.status(500).json(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
