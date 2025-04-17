import { ErrorKeys } from './errors.types';
import { ErrorInfo } from '@errors/errors.types';

export const PRODUCT_ERROR_MAP: Record<ErrorKeys, ErrorInfo> = {
  [ErrorKeys.FAILURE_TO_FINDSERT]: {
    message: "The product could neither be found nor created.",
    statusCode: 500
  }
}