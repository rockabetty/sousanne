import { NextApiHandler } from "next";
import { updateIngredientAmountsInPantry } from "@domains/pantries/core/pantryService";
import { sendErrorResponse } from "@errors";
import { ErrorKeys } from "../errors.types";
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { acceptPutOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptPutOnly(req)
    const {user_id} = req.query;
    const {itemList, action} = req.body;
    if (!action) {
      return sendErrorResponse(res, Errorkeys.PANTRY_ACTION_MISSING)
    }
    if (!itemList) {
      return sendErrorResponse(res, Errorkeys.ITEM_LIST_MISSING)
    }
    if (!user_id) {
      return sendErrorResponse(res, CoreErrors.AUTHENTICATION_FAILED)
    }
    const update = {
      user_id,
      itemList,
      action
    }
    await updateIngredientAmountsInPantry(update)
    return res.status(200).send()
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;