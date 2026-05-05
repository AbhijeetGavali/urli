import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { linkService } from '../services/link.service.js'
import { handleError } from '../lib/errors.js'
import { nanoid } from 'nanoid'
import { linkRepo } from '../repos/link.repo.js'
import { redis, linkCacheKey, LINK_CACHE_TTL } from '../lib/redis.js'

const createSchema = z.object({
  originalUrl: z.string().url(),
  slug: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  title: z.string().max(200).nullable().optional(),
  expiresAt: z.string().datetime().nullable().optional(),
  maxClicks: z.number().int().positive().nullable().optional(),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
  utmTerm: z.string().nullable().optional(),
  utmContent: z.string().nullable().optional(),
  pixelIds: z.array(z.string()).optional(),
  smartRules: z.array(z.object({ type: z.string(), value: z.string(), destination: z.string().url() })).optional(),
  workspaceId: z.string().optional(),
})

export const linkController = {
  publicShorten: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { originalUrl } = z.object({ originalUrl: z.string().url() }).parse(req.body)
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      let slug = nanoid(6)
      let attempts = 0
      while (await linkRepo.findBySlug(slug)) {
        slug = nanoid(6)
        if (++attempts > 10) throw new Error('Could not generate unique slug')
      }
      const link = await linkRepo.create({ originalUrl, slug, expiresAt })
      await redis.setex(linkCacheKey(slug), LINK_CACHE_TTL, JSON.stringify(link))
      return reply.code(201).send({ link })
    } catch (err) { return handleError(reply, err) }
  },
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const data = createSchema.parse(req.body)
      const link = await linkService.create(user.id, user.plan, data)
      return reply.code(201).send({ link })
    } catch (err) { return handleError(reply, err) }
  },

  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const result = await linkService.list(user.id, req.query)
      return reply.send(result)
    } catch (err) { return handleError(reply, err) }
  },

  getOne: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { id } = req.params as any
      const link = await linkService.getOne(id, user.id)
      return reply.send({ link })
    } catch (err) { return handleError(reply, err) }
  },

  update: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { id } = req.params as any
      const data = createSchema.partial().parse(req.body)
      const link = await linkService.update(id, user.id, data)
      return reply.send({ link })
    } catch (err) { return handleError(reply, err) }
  },

  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { id } = req.params as any
      await linkService.delete(id, user.id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },
}
