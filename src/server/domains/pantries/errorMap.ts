import { ErrorKeys } from './errors.types';

interface ErrorInfo {
  message: string;
  statusCode: number;
}

export const PANTRY_ERROR_MAP: Record<ErrorKeys, ErrorInfo> = {
  [ErrorKeys.ITEM_LIST_MISSING]: {
    message: "Please submit a list of ingredients.",
    statusCode: 400
  },
  [ErrorKeys.UNKNOWN_PANTRY_ACTION]: {
    message: "I don't recognize that type of upate.",
    statusCode: 400
  },
   [ErrorKeys.PANTRY_ACTION_MISSING]: {
    message: "You need to specify what the action is.",
    statusCode: 400
  },
  [ErrorKeys.ITEMS_NOT_IN_PANTRY ]: {
    message: "You don't have the required items.",
    statusCode: 400
  }
}