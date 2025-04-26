import { NextApiHandler } from 'next'
import {
  getIngredientOptionsWithSeasonality,
  getIngredientOptions,
} from '../core/ingredientService'
import { excludeIngredientsNotInPantry } from '@domains/pantries/core/pantryService'
import { sendErrorResponse } from '@errors'
import { acceptGetOnly } from '@errors/methodgatekeeper'
import { parseRecipeIngredient, RecipeIngredient } from '../ingredients.types'
import { ErrorKeys } from '@errors/errors.types'
import { Ingredient } from '@components/ingredients/ingredients.types'

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res)
    const { ingredient_id, seasonal, pantry } = req.query

    if (!ingredient_id) {
      return sendErrorResponse(res, ErrorKeys.INVALID_REQUEST)
    }

    let options
    const id = Number(ingredient_id)

    if (!!seasonal && seasonal === 'true') {
      options = await getIngredientOptionsWithSeasonality(id)
    } else {
      options = await getIngredientOptions(id)
    }

    if (!options.success) {
      return sendErrorResponse(res, options.error)
    }

    if (!!pantry) {
      const { data } = options
      const parsedData = []
      for (let i = 0; i < data.length; i++) {
        const parsedIngredient: RecipeIngredient = parseRecipeIngredient(
          data[i]
        )
        parsedData.push(parsedIngredient)
      }

      options = await excludeIngredientsNotInPantry(parsedData, pantry)
      if (!options.success) {
        return sendErrorResponse(res, options.error)
      }
    }

    return res.status(200).send(options.data)
  } catch (error) {
    return sendErrorResponse(res, error)
  }
}

export default handler
