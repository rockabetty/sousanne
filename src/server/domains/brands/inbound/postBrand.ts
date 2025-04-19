import { ErrorKeys } from '@errors/errors.types'
import { acceptPostOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { addBrand } from '../core/brandService'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)
  const { body } = req

  try {
    const { name } = body

    if (!name) {
      res.status(400).json(ErrorKeys.INVALID_REQUEST)
      return
    }

    const newBrand = await addBrand({ name })

    if (newBrand.success) {
      res.status(201).json({ brand: newBrand.data })
    } else {
      res.status(400).json(newBrand.error)
    }
  } catch (error) {
    res.status(500).json(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
