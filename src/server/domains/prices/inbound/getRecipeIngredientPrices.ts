import { sendErrorResponse } from '@errors'
import { acceptGetOnly } from '@errors/methodgatekeeper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getIngredientPricesByRecipe } from '../core/priceService'
import { parseStringOrReject } from '@server-services/sanitizer'

const getRecipeIngredientPricesHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    acceptGetOnly(req, res)
    const { slug } = req.query
    parseStringOrReject(slug)
    const recipeIngredientPrices = await getIngredientPricesByRecipe(slug)
    if (recipeIngredientPrices.success) {
      res.status(200).send(recipeIngredientPrices.data)
    }
    sendErrorResponse(res, recipeIngredientPrices.error)
  } catch (error) {
    sendErrorResponse(res, error)
  }
}

export default getRecipeIngredientPricesHandler
