import { NextApiHandler } from "next";
import { updateIngredientAmountsInPantry } from "@domains/pantries/core/pantryService";
import { sendErrorResponse } from "@errors";
import { ErrorKeys } from "../errors.types";
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { acceptPutOnly } from "@errors/methodgatekeeper";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptPutOnly(req, res)
    const {user_id} = req.query;
    const {itemList, action} = req.body;
    if (!action) {
      return sendErrorResponse(res, ErrorKeys.PANTRY_ACTION_MISSING)
    }
    if (!itemList) {
      return sendErrorResponse(res, ErrorKeys.ITEM_LIST_MISSING)
    }
    if (!user_id || typeof user_id === 'object') {
      return sendErrorResponse(res, CoreErrors.AUTHENTICATION_FAILED)
    }
    const update = {
      user_id,
      itemList,
      action
    }
    const result = await updateIngredientAmountsInPantry(update)
    if (result.success) {
      return res.status(200).send("OK")
    }
    return sendErrorResponse(res, result.error);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;