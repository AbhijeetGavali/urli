import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { linkService } from '../services/link.service.js'
import { handleError } from '../lib/errors.js'

const createSchema = z.object({
  originalUrl: z.string().url(),
  slug: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  title: z.string().max(200).optional(),
  expiresAt: z.string().datetime().optional(),
  maxClicks: z.number().int().positive().optional(),
  utmSource: z.string().optional(), utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(), utmTerm: z.string().optional(), utmContent: z.string().optional(),
  pixelIds: z.array(z.string()).optional(),
  smartRules: z.array(z.object({ type: z.string(), value: z.string(), destination: z.string().url() })).optional(),
  workspaceId: z.string().optional(),
})

export const linkController = {
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
