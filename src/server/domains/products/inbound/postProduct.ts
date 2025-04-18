import { ErrorKeys as CoreErrorKeys, ErrorKeys } from '@errors/errors.types'
import { acceptPostOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { addProduct } from '../core/productService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)
  const { body } = req

  const {
    name,
    ingredient_id,
    packageAmount,
    packageCount,
    packageType,
    unitName,
  } = body.product
  console.log(body)

  if (!ingredient_id || !packageType) {
    res.status(400).send(CoreErrorKeys.INVALID_REQUEST)
  }

  const newProduct = await addProduct({
    name,
    ingredient_id,
    packageAmount,
    packageCount,
    packageType,
    unitName,
  })

  console.log(newProduct)

  if (newProduct.success) {
    res.status(200).send('ok')
  }
  res.status(500).send(newProduct?.error)
}

export default handler
