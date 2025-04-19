import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorKeys as CoreErrors } from './errors.types'
import { sendErrorResponse } from './index'

export const acceptGetOnly = function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return sendErrorResponse(res, CoreErrors.METHOD_NOT_ALLOWED)
  }
}

export const acceptPutOnly = function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return sendErrorResponse(res, CoreErrors.METHOD_NOT_ALLOWED)
  }
}

export const acceptPostOnly = function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return sendErrorResponse(res, CoreErrors.METHOD_NOT_ALLOWED)
  }
}

export const rateLimit = function (req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  if (!rateLimiter(ip as string)) {
    res.status(429).json({
      error: 'Too many requests. Please try again later.',
    })
  }
}
