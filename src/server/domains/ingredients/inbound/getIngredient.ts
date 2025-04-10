import { NextApiHandler } from "next";
import { sendErrorResponse } from "@errors";
import { getIngredientById } from "../core/ingredientService";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ErrorKeys } from "@errors/errors.types";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res);
    const {ingredient_id} = req.query;
    const id = Number(ingredient_id)
    if (!id) {
      return sendErrorResponse(res, ErrorKeys.INVALID_REQUEST);
    }
    const ingredient = await getIngredientById(id);
    if (!ingredient.success) {
      return sendErrorResponse(res, ingredient.error)
    }
    return res.status(200).send(ingredient.data)
    
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;