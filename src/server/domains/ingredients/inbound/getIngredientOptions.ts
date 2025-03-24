import { NextApiHandler } from "next";
import { getIngredientOptionsWithSeasonality, getIngredientOptions } from "../core/ingredientService";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req)
    const {ingredient_id, seasonal} = req.query;
    if (!!seasonal && seasonal === 'true') {
      const seasonalOptions = await getIngredientOptionsWithSeasonality(ingredient_id)
      if (seasonalOptions.success) {
        return res.status(200).send(seasonalOptions.data)
      }
      return sendErrorResponse(res, seasonalOptions.error)
    } else {
      const options = await getIngredientOptions(ingredient_id)
      if (options.success) {
        return res.status(200).send(options.data)
      }
      return sendErrorResponse(res, options.error)
    }
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;
