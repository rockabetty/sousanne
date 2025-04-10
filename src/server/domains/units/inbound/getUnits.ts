import { NextApiHandler } from "next";
import { sendErrorResponse } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ErrorKeys } from "@errors/errors.types";

const handler: NextApiHandler = async (req, res) => {
  try {
    acceptGetOnly(req, res)
    const units = await getUnits();
    if (units.success) {
      return res.status(200).send(units.data);
    }
    return sendErrorResponse(res, ErrorKeys.GENERAL_SERVER_ERROR);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export default handler;
