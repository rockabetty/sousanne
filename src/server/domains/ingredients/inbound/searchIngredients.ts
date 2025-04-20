import { NextApiHandler } from 'next'
import { sendErrorResponse } from '@errors'
import { getIngredientById, searchIngredients } from '../core/ingredientService'
import { acceptGetOnly } from '@errors/methodgatekeeper'
import { ErrorKeys as CoreErrors } from '@errors/errors.types'
import { alphaNumericAndSpacingOnly } from '@server-services/sanitizer'

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res)

    const { search, limit, page } = req.query

    const sanitizedQuery = alphaNumericAndSpacingOnly(search as string)
    if (!sanitizedQuery) {
      return res.status(204).send([])
    }

    const parsedLimit = !!limit ? Number(limit) : undefined
    const parsedPage = !!page ? Number(page) : undefined

    const ingredients = await searchIngredients(
      sanitizedQuery,
      parsedLimit,
      parsedPage
    )
    if (!ingredients.success) {
      return sendErrorResponse(res, ingredients.error)
    }
    return res.status(200).send(ingredients.data)
  } catch (error) {
    return sendErrorResponse(res, error)
  }
}

export default handler
