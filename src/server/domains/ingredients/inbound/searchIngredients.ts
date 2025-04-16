import { NextApiHandler } from "next";
import { sendErrorResponse } from "@errors";
import { getIngredientById, searchIngredients } from "../core/ingredientService";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ErrorKeys as CoreErrors } from "@errors/errors.types";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res);

    const {search, limit, page} = req.query;

    const parsedLimit = !!limit ? Number(limit) : undefined;
    const parsedPage = !!page ? Number(page): undefined;

    if (!search) {
      return sendErrorResponse(res, CoreErrors.INVALID_REQUEST);
    }

    const ingredients = await searchIngredients(search as string, parsedLimit, parsedPage)
    if (!ingredients.success) {
      return sendErrorResponse(res, ingredients.error)
    }
    return res.status(200).send(ingredients.data)
    
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;