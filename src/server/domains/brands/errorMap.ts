import { ErrorKeys } from './errors.types'
import { ErrorInfo } from '@errors/errors.types'

export const BRAND_ERROR_MAP: Record<ErrorKeys, ErrorInfo> = {
  [ErrorKeys.BRAND_NOT_FOUND]: {
    message: 'The requested brand could not be found.',
    statusCode: 404,
  },
  [ErrorKeys.BRAND_NAME_DUPLICATE]: {
    message: 'A brand with this name already exists.',
    statusCode: 400,
  },
  [ErrorKeys.INVALID_BRAND_DATA]: {
    message: 'The brand data provided is invalid.',
    statusCode: 400,
  },
  [ErrorKeys.FAILURE_TO_CREATE_BRAND]: {
    message: 'Failed to create brand.',
    statusCode: 500,
  },
}
