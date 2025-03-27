import { NextApiHandler } from "next";
import { countIngredientAmountInPantry } from "@domains/pantries/core/pantryService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ErrorKeys as CoreErrors } from "@errors/errors.types"

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res);
    const {ingredient_id, user_id} = req.query;
    if (!user_id) {
      return sendErrorResponse(res, CoreErrors.USER_NOT_AUTHORIZED);
    }
    if (!ingredient_id) {
      return sendErrorResponse(res, CoreErrors.INVALID_REQUEST);
    }

    const ingredientCount = await countIngredientAmountInPantry(Number(ingredient_id), Number(user_id));

    if (ingredientCount.success) {
      return res.status(200).send(ingredientCount.data);
    }
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;