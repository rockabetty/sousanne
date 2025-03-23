import { NextApiHandler } from "next";
import { getRecipes } from "../core/recipeService";
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req)
    const recipes = await getRecipes();
    if (recipes.success) {
      return res.status(200).send(recipes.data);
    }
    return sendErrorResponse(res, recipes.error);
  } catch (error) {
    return sendErrorResponse(res, CoreErrors.GENERAL_SERVER_ERROR);
  }
};

export default handler;
