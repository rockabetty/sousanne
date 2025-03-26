import { NextApiHandler } from "next";
import { countIngredientAmountInPantry } from "@domains/pantries/core/pantryService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req)
    const {ingredient_id, user_id} = req.query;
    const ingredientCount = await countIngredientAmountInPantry(ingredient_id, user_id)

    if (ingredientCount.success) {
      return res.status(200).send(ingredientCount.data)
    }
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;