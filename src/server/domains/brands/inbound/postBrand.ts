import { ErrorKeys as CoreErrorKeys } from '@errors/errors.types'
import { acceptPostOnly, rateLimit } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import { addBrand } from '../core/brandService'
import { sendError } from 'next/dist/server/api-utils'
import { sendErrorResponse } from '@errors'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptPostOnly(req, res)
  rateLimit(req, res)

  const { body } = req

  try {
    const { name } = body

    if (!name) {
      return sendErrorResponse(res, CoreErrorKeys.MISSING_REQUIRED_FIELDS)
    }

    const newBrand = await addBrand({ name })

    if (newBrand.success) {
      res.status(201).json({ brand: newBrand.data })
    } else {
      res.status(400).json(newBrand.error)
    }
  } catch (error) {
    return sendErrorResponse(res, CoreErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
