import { NextApiRequest, NextApiResponse } from 'next'
import getBrands from '@domains/brands/inbound/getBrands'
import postBrand from '@domains/brands/inbound/postBrand'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getBrands(req, res)
    case 'POST':
      return postBrand(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
