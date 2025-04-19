import { ErrorKeys } from './errors.types'
import { ErrorInfo } from '@errors/errors.types'

export const PRODUCT_ERROR_MAP: Record<ErrorKeys, ErrorInfo> = {
  [ErrorKeys.FAILURE_TO_FINDSERT]: {
    message: 'Oof! That product could neither be found nor created.',
    statusCode: 500,
  },
  [ErrorKeys.PRODUCT_NOT_FOUND]: {
    message: "Hmm, I can't seem to find that product anywhere in the database.",
    statusCode: 404,
  },
  [ErrorKeys.PRODUCT_NAME_DUPLICATE]: {
    message:
      'Looks like this product name is already taken. Mind trying something else?',
    statusCode: 409,
  },
  [ErrorKeys.INVALID_PRODUCT_DATA]: {
    message: "Something's off with this product data. Want to double-check it?",
    statusCode: 400,
  },
  [ErrorKeys.MISSING_REQUIRED_FIELDS]: {
    message: "Oops! You're missing some important product details we need.",
    statusCode: 400,
  },
  [ErrorKeys.INVALID_PACKAGE_TYPE]: {
    message:
      "That package type doesn't work for us. Try single, multiple, weight, or apiece.",
    statusCode: 400,
  },
  [ErrorKeys.INGREDIENT_NOT_FOUND]: {
    message:
      "I can't find the ingredient you specified. Did it get lost in the pantry?",
    statusCode: 404,
  },
  [ErrorKeys.BRAND_NOT_FOUND]: {
    message: "I don't reconize that brand. Want to add it?",
    statusCode: 404,
  },
  [ErrorKeys.UNIT_NOT_FOUND]: {
    message: "I can't measure with that unit - I'm not familiar with it!",
    statusCode: 404,
  },
  [ErrorKeys.FAILURE_TO_CREATE_PRODUCT]: {
    message:
      "Well, that didn't work. Something went wrong creating your product.",
    statusCode: 500,
  },
  [ErrorKeys.FAILURE_TO_UPDATE_PRODUCT]: {
    message:
      "We couldn't update your product. The database is being stubborn today.",
    statusCode: 500,
  },
}
