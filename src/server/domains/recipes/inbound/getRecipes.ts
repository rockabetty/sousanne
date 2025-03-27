import { NextApiHandler } from "next";
import { getRecipes } from "../core/recipeService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res);
    const recipes = await getRecipes();
    if (recipes.success) {
      return res.status(200).send(recipes.data);
    }
    return sendErrorResponse(res, recipes.error);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;
