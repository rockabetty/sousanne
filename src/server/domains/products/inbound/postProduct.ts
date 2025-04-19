import { ErrorKeys as CoreErrorKeys, ErrorKeys } from '@errors/errors.types'
import { acceptPostOnly, rateLimit } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { addProduct } from '../core/productService'
import { addPrices } from '@domains/prices/core/priceService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)
  rateLimit(req, res)
  const { body } = req
  console.log(body)
  try {
    const {
      name,
      ingredient_id,
      packageAmount,
      packageCount,
      packageType,
      unitName,
    } = body.product

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

    if (newProduct.success) {
      // product submissions may or may not also have prices attached.
      const { prices } = body

      if (!!prices) {
        const newPrices = await addPrices(newProduct.data.id, prices)
        if (newPrices.success) {
          res.status(200).send({ product: newProduct.data, prices: newPrices })
        }
        res.status(400).send(newPrices.error)
      }
      res.status(200).send({ product: newProduct.data })
    }
    res.status(400).send(newProduct?.error)
  } catch (error) {
    res.status(500).send(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
