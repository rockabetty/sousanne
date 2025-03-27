import { NextApiHandler } from "next";
import { getRecipeBySlug } from "../core/recipeService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ErrorKeys } from "@errors/errors.types";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res)
    const {slug} = req.query;
    if (!slug) {
      return sendErrorResponse(res, ErrorKeys.INVALID_REQUEST);
    }
    const recipe = await getRecipeBySlug(slug as string);
    if (recipe.success) {
      return res.status(200).send(recipe.data);
    }
    return sendErrorResponse(res, ErrorKeys.GENERAL_SERVER_ERROR);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;
