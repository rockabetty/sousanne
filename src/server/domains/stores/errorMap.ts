import { ErrorKeys } from './errors.types'
import { ErrorInfo } from '@errors/errors.types'

export const STORE_ERROR_MAP: Record<ErrorKeys, ErrorInfo> = {
  [ErrorKeys.STORE_NOT_FOUND]: {
    message: "I can't find that store.",
    statusCode: 404,
  },
  [ErrorKeys.STORE_CREATION_FAILED]: {
    message:
      'Whoops. Something went wrong when I tried to make a new store. Can you try again?',
    statusCode: 500,
  },
  [ErrorKeys.STORE_UPDATE_FAILED]: {
    message: "Whoops. That update didn't go through. Can you try again?",
    statusCode: 500,
  },
}
