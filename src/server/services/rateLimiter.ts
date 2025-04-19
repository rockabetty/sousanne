const rateLimitStore: Record<string, { count: number; timestamp: number }> = {}
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5
const CLEANUP_INTERVAL = 60 * 60 * 1000 // Clean up hourly

// to prevent memory bloat
setInterval(() => {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((key) => {
    if (now - rateLimitStore[key].timestamp > RATE_LIMIT_WINDOW) {
      delete rateLimitStore[key]
    }
  })
}, CLEANUP_INTERVAL)

export const rateLimiter = (ip: string) => {
  const currentTime = Date.now()
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 1, timestamp: currentTime }
    return true
  }

  const { count, timestamp } = rateLimitStore[ip]

  if (currentTime - timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore[ip] = { count: 1, timestamp: currentTime }
    return true
  }

  if (count < MAX_REQUESTS) {
    rateLimitStore[ip].count += 1
    return true
  }

  return false
}
