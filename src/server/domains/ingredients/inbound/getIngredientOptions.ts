import { NextApiHandler } from "next";
import { getIngredientOptionsWithSeasonality, getIngredientOptions } from "../core/ingredientService";
import { excludeIngredientsNotInPantry } from "@domains/pantries/core/pantryService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { parseRecipeIngredient } from "../ingredients.types";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res);
    const {ingredient_id, seasonal, pantry} = req.query;
    let options;
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
      options = await excludeIngredientsNotInPantry(options.data, pantry)
      if (!options.success) {
        return sendErrorResponse(res, options.error)
      }
    }
    
    return res.status(200).send(options.data)
    
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;