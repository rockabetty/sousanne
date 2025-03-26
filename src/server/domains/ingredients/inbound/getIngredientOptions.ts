import { NextApiHandler } from "next";
import { getIngredientOptionsWithSeasonality, getIngredientOptions } from "../core/ingredientService";
import { excludeIngredientsNotInPantry } from "@domains/pantries/core/pantryService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req)
    const {ingredient_id, seasonal, pantry} = req.query;
    let options;
    
    if (!!seasonal && seasonal === 'true') {
      options = await getIngredientOptionsWithSeasonality(ingredient_id)
    } else {
      options = await getIngredientOptions(ingredient_id)
    }
    
    if (!options.success) {
      return sendErrorResponse(res, options.error)
    }
    
    // reject if no pantry since that's the user's pantry 
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