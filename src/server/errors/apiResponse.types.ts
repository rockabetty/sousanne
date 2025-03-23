import { ErrorKeys as CoreErrors } from './errors.types';

// More error types from domains may be defiend later so we'll union 'em here.
export type ApplicationErrorKey = 
  | CoreErrors;

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
    timestamp?: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: ApplicationErrorKey;
    message: string;
    details?: any;
    endpoint?: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;