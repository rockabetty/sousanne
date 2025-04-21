import { sendErrorResponse } from '@errors'
import { ErrorKeys } from '@errors/errors.types'
import { NextApiResponse } from 'next'

/**
 * Filters a string to only keep alphanumeric characters, spaces,
 * hyphens, and underscores. Trims trailing whitespace.
 *
 * @param unfilteredString - The input string to be filtered
 * @returns A cleaned string containing only allowed characters
 */
export const alphaNumericAndSpacingOnly = (unfilteredString: string) => {
  // Keep alphanumeric, spaces, hyphens, and underscores
  return unfilteredString.replace(/[^0-9a-zA-Z \-_]/g, '').trim()
}

/**
 * Validates if a string represents a valid integer.
 * Accepts positive and negative integers without decimal points.
 *
 * @param value - The string to validate
 * @returns True if the string represents a valid integer, false otherwise
 */
export const isValidInteger = (value: string): boolean => {
  const validNumberRegexp = /^-?\d+$/
  if (!validNumberRegexp.test(value)) {
    return false
  }
  const num = parseInt(value, 10)
  return Number.isFinite(num) && Number.isInteger(num)
}

/**
 * Validates if a string represents a valid number.
 * Accepts decimal numbers with optional scientific notation.
 *
 * @param value - The string to validate
 * @returns True if the string represents a valid number, false otherwise
 */
export const isValidNumber = (value: string): boolean => {
  // a number which may or may not have a decimal point
  const validNumberRegex = /^-?\d+(\.\d+)?$/
  if (!validNumberRegex.test(value)) {
    return false
  }
  const num = Number(value)
  return !isNaN(num) && Number.isFinite(num)
}

/**
 * Parses a string into an integer or throws an error if invalid.
 * If the value is null, undefined, or empty, returns null unless required is true.
 *
 * @param value - The string to parse
 * @param required - If true, sends an error response when value is falsy
 * @param res - NextApiResponse object to send error responses
 * @returns The parsed integer
 * @note calls sendErrorResponse, which returns, when validation fails
 */
export const parseIntegerOrReject = (
  value: number | string | null | undefined,
  res: NextApiResponse,
  required: boolean = false
): number | null => {
  if (value === null || value === undefined || value === '') {
    if (!!required) {
      sendErrorResponse(res, ErrorKeys.MISSING_REQUIRED_FIELDS)
    }
    return null
  }
  if (!isValidInteger(value)) {
    sendErrorResponse(res, errorKeys.INVALID_REQUEST)
  }
  return parseInt(value, 10)
}

/**
 * Parses a string into a floating-point number or throws an error if invalid.
 * If the value is null, undefined, or empty, returns null unless required is true.
 *
 * @param value - The string to parse
 * @param required - If true, sends an error response when value is falsy
 * @param res - NextApiResponse object to send error responses
 * @returns The parsed float
 * @note calls sendErrorResponse, which retuns, when validation fails
 */
export const parseFloatOrReject = (
  value: number | string | null | undefined,
  res: NextApiResponse,
  required: boolean = false
): number | null => {
  if (value === null || value === undefined || value === '') {
    if (!!required) {
      sendErrorResponse(res, ErrorKeys.MISSING_REQUIRED_FIELDS)
    }
    return null
  }
  if (!isValidNumber(value)) {
    sendErrorResponse(res, errorKeys.INVALID_REQUEST)
  }
  return Number(value)
}

/**
 * Parses a string into a price in cents for USD
 * Converts decimal prices (e.g. "12.99" or "1.98") to integer cents (1299 or 198)
 * to avoid floating point rounding errors during calculations.
 *
 * @param value - The string to parse
 * @param required - If true, sends an error response when value is falsy
 * @param res - NextApiResponse object to send error responses
 * @returns The parsed price in cents
 * @note calls sendErrorResponse, which returns, when validation fails
 */
export const parsePriceOrReject = (
  value: string | number | null | undefined,
  res: NextApiResponse,
  required: boolean = false
): number | null => {
  if (value === null || value === undefined || value === '') {
    if (required) {
      sendErrorResponse(res, ErrorKeys.MISSING_REQUIRED_FIELDS)
    }
    return null
  }
  // Remove any currency symbols and whitespace
  const cleanValue = value.replace(/[$,\s]/g, '')
  if (!/^\d+(\.\d{1,2})?$/.test(cleanValue)) {
    sendErrorResponse(res, res, errorKeys.INVALID_REQUEST)
  }
  return Math.round(parseFloat(cleanValue) * 100)
}

/**
 * A practical validator for strings to be stored in the DB.
 * This is not intended to make things 'safe' it's intended
 * to reject unreasonable, display-unfriendly user inputs.
 * Protect ya neck, paramaterize yo queries
 *
 * It's just for short inputs like a brand name or the
 * name of an ingredient.
 *
 * @param unparsedString The string to validate
 * @param maxLength Maximum allowed length after trimming
 * @param required - If true, sends an error response if falsy
 * @returns The cleaned string if valid.
 * @note calls sendErrorResponse, which returns, when validation fails
 */
export function parseStringOrReject(
  unparsedString: string,
  res: NextApiResponse,
  maxLength: number = 100,
  required: boolean = false
): NextApiResponse | string {
  if (unparsedString && typeof unparsedString !== 'string') {
    sendErrorResponse(res, ErrorKeys.INVALID_REQUEST)
  }

  if (required && unparsedString != null && unparsedString == undefined) {
    sendErrorResponse(res, ErrorKeys.MISSING_REQUIRED_FIELDS)
  }

  let trimmedString = unparsedString.trim()

  if (trimmedString.length === 0 || trimmedString.length > maxLength) {
    sendErrorResponse(res, ErrorKeys.INVALID_REQUEST)
  }

  // Collapse multiple spaces into a single space
  while (trimmedString.includes('  ')) {
    trimmedString = trimmedString.replace('  ', ' ')
  }

  // These test for control characters like the beepy-beeper, that'd be
  // indicative of actual tomfoolery
  if (/[\x00-\x1F\x7F]/.test(trimmedString)) {
    sendErrorResponse(res, ErrorKeys.INVALID_REQUEST)
  }

  return trimmedString
}
