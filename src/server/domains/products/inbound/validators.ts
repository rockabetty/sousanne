import { sendErrorResponse } from '@errors'

export const validatePackageType = (packageType: string, res): string => {
  const trimmed = packageType.trim()
  if (['single', 'multiple', 'weight', 'apiece'].includes(trimmed)) {
    return trimmed
  } else {
    sendErrorResponse(res, ErrorKeys.INVALID_REQUEST)
  }
}
