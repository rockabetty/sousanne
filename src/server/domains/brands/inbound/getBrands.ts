import { acceptGetOnly } from '@errors/methodgatekeeper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getBrands } from '../core/brandService'

const getBrandsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  acceptGetOnly(req, res)
  const brands = await getBrands()
  if (brands.success) {
    res.status(200).send(brands.data)
  }
  res.status(500).send(brands.error)
}

export default getBrandsHandler
