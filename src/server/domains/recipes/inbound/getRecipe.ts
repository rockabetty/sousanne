import { NextApiHandler } from "next";
import { getRecipeBySlug } from "../core/recipeService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req)
    const {slug} = req.query;
    const recipe = await getRecipeBySlug(slug);
    if (recipe.success) {
      return res.status(200).send(recipe.data);
    }
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;
