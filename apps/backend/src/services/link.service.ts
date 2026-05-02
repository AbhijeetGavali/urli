import { nanoid } from 'nanoid'
import { linkRepo } from '../repos/link.repo.js'
import { redis, linkCacheKey, LINK_CACHE_TTL } from '../lib/redis.js'
import { AppError } from '../lib/errors.js'

export const linkService = {
  create: async (userId: string, plan: string, data: any) => {
    if (plan === 'FREE') {
      const count = await linkRepo.countThisMonth(userId)
      if (count >= 50) throw new AppError('Free plan limit: 50 links/month. Upgrade to Pro.', 403)
    }
    if (data.pixelIds?.length && plan === 'FREE') {
      throw new AppError('Retargeting pixels require Pro plan', 403)
    }
    if (data.smartRules && plan !== 'BUSINESS') {
      throw new AppError('Smart redirects require Business plan', 403)
    }

    let slug = data.slug || nanoid(6)
    if (data.slug) {
      const taken = await linkRepo.findBySlug(slug)
      if (taken) throw new AppError('Slug already taken', 409)
    } else {
      let attempts = 0
      while (await linkRepo.findBySlug(slug)) {
        slug = nanoid(6)
        if (++attempts > 10) throw new AppError('Could not generate unique slug', 500)
      }
    }

    const link = await linkRepo.create({ ...data, slug, userId })
    await redis.setex(linkCacheKey(slug), LINK_CACHE_TTL, JSON.stringify(link))
    return link
  },

  list: async (userId: string, query: any) => {
    const page = Number(query.page) || 1
    const limit = Math.min(Number(query.limit) || 20, 100)
    const skip = (page - 1) * limit
    const where: any = { userId }
    if (query.workspaceId) where.workspaceId = query.workspaceId
    if (query.search) where.OR = [
      { slug: { contains: query.search, mode: 'insensitive' } },
      { originalUrl: { contains: query.search, mode: 'insensitive' } },
      { title: { contains: query.search, mode: 'insensitive' } },
    ]
    const [links, total] = await Promise.all([linkRepo.findMany(where, skip, limit), linkRepo.count(where)])
    return { links, total, page, limit }
  },

  getOne: async (id: string, userId: string) => {
    const link = await linkRepo.findByIdAndUser(id, userId)
    if (!link) throw new AppError('Link not found', 404)
    return link
  },

  update: async (id: string, userId: string, data: any) => {
    const existing = await linkRepo.findByIdAndUser(id, userId)
    if (!existing) throw new AppError('Link not found', 404)
    if (data.slug && data.slug !== existing.slug) {
      const taken = await linkRepo.findBySlug(data.slug)
      if (taken) throw new AppError('Slug already taken', 409)
      await redis.del(linkCacheKey(existing.slug)) // remove old slug cache
    }
    const link = await linkRepo.update(id, data)
    // Always refresh cache so pixel/expiry/active changes take effect immediately
    await redis.setex(linkCacheKey(link.slug), LINK_CACHE_TTL, JSON.stringify(link))
    return link
  },

  delete: async (id: string, userId: string) => {
    const link = await linkRepo.findByIdAndUser(id, userId)
    if (!link) throw new AppError('Link not found', 404)
    await linkRepo.delete(id)
    await redis.del(linkCacheKey(link.slug))
  },
}
