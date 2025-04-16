import { NextApiHandler } from "next";
import { sendErrorResponse } from "@errors";
import { getIngredients } from "../core/ingredientService";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ErrorKeys } from "@errors/errors.types";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res);
    const {limit, page} = req.query;

    const parsedLimit = !!limit ? Number(limit) : undefined;
    const parsedPage = !!page ? Number(page): undefined;

    const ingredients = await getIngredients(parsedLimit, parsedPage);
  
    if (!ingredients.success) {
      return sendErrorResponse(res, ingredients.error)
    }
    return res.status(200).send(ingredients.data)
    
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;