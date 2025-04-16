import { NextApiHandler } from "next";
import { sendErrorResponse } from "@errors";
import { getIngredients } from "../core/ingredientService";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ErrorKeys } from "@errors/errors.types";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res);
    const {limit, page} = req.params;

    if (isNaN(limit) || isNaN(page)) {
      return sendErrorResponse(res, ErrorKeys.INVALID_REQUEST);
    }
    const ingredients = await getIngredients(limit, page);
    if (!ingredient.success) {
      return sendErrorResponse(res, ingredient.error)
    }
    return res.status(200).send(ingredient.data)
    
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;