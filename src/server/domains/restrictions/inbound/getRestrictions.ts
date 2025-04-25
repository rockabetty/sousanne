import { ErrorKeys } from '@errors/errors.types'
import { acceptGetOnly } from '@errors/methodgatekeeper'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  getRestrictions,
  getRestrictionsByCategory,
} from '../core/restrictionService'
import { sendErrorResponse } from '@errors'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  acceptGetOnly(req, res)

  try {
    const { category } = req.query
    if (category) {
      if (!['AVERSION', 'LIFESTYLE', 'HEALTH'].includes(category)) {
        return sendErrorResponse(res, ErrorKeys.INVALID_REQUEST)
      }
      const categoryRestrictions = await getRestrictionsByCategory(category)
      if (categoryRestrictions.success) {
        res.status(200).json(categoryRestrictions.data)
      }
    }
    const restrictions = await getRestrictions()
    if (restrictions.success) {
      res.status(200).json(restrictions.data)
    } else {
      sendErrorResponse(res, restrictions.error)
    }
  } catch (error) {
    res.status(500).json(ErrorKeys.GENERAL_SERVER_ERROR)
  }
}

export default handler
