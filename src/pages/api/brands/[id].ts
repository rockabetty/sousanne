import { NextApiRequest, NextApiResponse } from 'next'
import getBrand from '@domains/brands/inbound/getBrand'
import putBrand from '@domains/brands/inbound/putBrand'
import deleteBrand from '@domains/brands/inbound/deleteBrand'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getBrand(req, res)
    case 'PUT':
      return putBrand(req, res)
    case 'POST':
      return deleteBrand(req, res)
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
