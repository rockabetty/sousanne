import { ErrorKeys } from './errors.types'
import { ErrorInfo } from '@errors/errors.types'

export const SHOPPING_LIST_ERROR_MAP: Record<ErrorKeys, ErrorInfo> = {
  [ErrorKeys.SHOPPING_LIST_NOT_FOUND]: {
    message: "I can't find that shopping list.",
    statusCode: 404,
  },
  [ErrorKeys.SHOPPING_LIST_ITEM_NOT_FOUND]: {
    message: "I can't think this item in your shopping list!.",
    statusCode: 404,
  },
  [ErrorKeys.SHOPPING_LIST_CREATION_FAILED]: {
    message:
      'Whoops. Something went wrong when I tried to make a new shopping list. Can you try again?',
    statusCode: 500,
  },
  [ErrorKeys.SHOPPING_LIST_UPDATE_FAILED]: {
    message: "Whoops. That update didn't go through. Can you try again?",
    statusCode: 500,
  },
  [ErrorKeys.SHOPPING_LIST_ITEM_CREATION_FAILED]: {
    message:
      'Whoops.  Something went wrong when making that item. Can you try again?',
    statusCode: 500,
  },
  [ErrorKeys.SHOPPING_LIST_ITEM_UPDATE_FAILED]: {
    message:
      'Whoops.  Something went wrong when updating that item. Can you try again?',
    statusCode: 500,
  },
  [ErrorKeys.USER_NOT_OWNER]: {
    message: "Sorry, but, this isn't your shopping list!",
    statusCode: 403,
  },
}
