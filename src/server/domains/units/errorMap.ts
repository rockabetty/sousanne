import { ErrorKeys } from './errors.types';
import { ErrorInfo } from '@errors/errors.types';

export const UNIT_ERROR_MAP: Record<ErrorKeys, ErrorInfo> = {
  [ErrorKeys.UNIT_NOT_FOUND]: {
    message: "There is no such unit in the database.",
    statusCode: 404
  }
}