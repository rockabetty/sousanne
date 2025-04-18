import { ErrorKeys } from '@errors/errors.types'

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
 * @param value - The string to parse, or null/undefined
 * @param required - If true, throws an error when value is null/undefined/empty
 * @returns The parsed integer or null
 * @throws Error with INVALID_REQUEST key if parsing fails or a required value is missing
 */
export const parseIntegerOrThrow = (
  value: string | null | undefined,
  required: boolean = false
): number | null => {
  if (value === null || value === undefined || value === '') {
    if (!!required) {
      throw new Error(ErrorKeys.INVALID_REQUEST)
    }
    return null
  }
  if (!isValidInteger(value)) {
    throw new Error(ErrorKeys.INVALID_REQUEST)
  }
  return parseInt(value, 10)
}

/**
 * Parses a string into a floating-point number or throws an error if invalid.
 * If the value is null, undefined, or empty, returns null unless required is true.
 *
 * @param value - The string to parse, or null/undefined
 * @param required - If true, throws an error when value is null/undefined/empty
 * @returns The parsed number or null
 * @throws Error with INVALID_REQUEST key
 */
export const parseFloatOrThrow = (
  value: string | null | undefined,
  required: boolean = false
): number | null => {
  if (value === null || value === undefined || value === '') {
    if (!!required) {
      throw new Error(ErrorKeys.INVALID_REQUEST)
    }
    return null
  }
  if (!isValidNumber(value)) {
    throw new Error(ErrorKeys.INVALID_REQUEST)
  }
  return Number(value)
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
 * @returns The cleaned string if valid
 */
export function parseStringOrThrow(
  unparsedString: string,
  maxLength: number = 100
): string {
  if (!unparsedString) {
    throw new Error(ErrorKeys.INVALID_REQUEST)
  }

  let trimmedString = unparsedString.trim()

  if (trimmedString.length === 0 || trimmedString.length > maxLength) {
    throw new Error(ErrorKeys.INVALID_REQUEST)
  }

  // Collapse multiple spaces into a single space
  while (trimmedString.includes('  ')) {
    trimmedString = trimmedString.replace('  ', ' ')
  }

  // These test for control characters like the beepy-beeper, that'd be
  // indicative of actual tomfoolery
  if (/[\x00-\x1F\x7F]/.test(trimmedString)) {
    throw new Error(ErrorKeys.INVALID_REQUEST)
  }

  return trimmedString
}
