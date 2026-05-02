import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
})

redis.on('error', (err) => console.error('Redis error:', err))

export const LINK_CACHE_TTL = 3600 // 1 hour
export const linkCacheKey = (slug: string) => `link:${slug}`
export const rateLimitKey = (ip: string) => `rl:${ip}`
export const blacklistKey = (jti: string) => `bl:${jti}`
