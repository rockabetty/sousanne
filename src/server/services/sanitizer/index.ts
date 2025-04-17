import { ErrorKeys } from "@errors/errors.types";

export const alphaNumericAndSpacingOnly = (unsafeString: string) => {
    // Keep alphanumeric, spaces, hyphens, and underscores
    return unsafeString.replace(/[^0-9a-zA-Z \-_]/g, '').trim();
}

export const isValidInteger = (value: string): boolean => {
  const validNumberRegexp = /^-?\d+$/;
  if (!validNumberRegexp.test(value)) {
    return false;
  }
  const num = parseInt(value, 10);
  return Number.isFinite(num) && Number.isInteger(num);
};

export const isValidNumber = (value: string): boolean => {
  // Allow decimal numbers, optionally with scientific notation
  const validNumberRegex = /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/;
  if (!validNumberRegex.test(value)) {
    return false;
  }
  const num = Number(value);
  return !isNaN(num) && Number.isFinite(num);
};

export const parseIntegerOrThrow = (value: string | null | undefined): number | null => {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (!isValidInteger(value)) {
    throw new Error(ErrorKeys.INVALID_REQUEST);
  }
  return parseInt(value, 10);
};

export const parseFloatOrThrow = (value: string | null | undefined): number | null => {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (!isValidNumber(value)) {
    throw new Error(ErrorKeys.INVALID_REQUEST);
  }
  return Number(value);
};