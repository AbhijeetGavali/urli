import type { FastifyRequest, FastifyReply } from 'fastify'
import { analyticsService } from '../services/analytics.service.js'
import { handleError } from '../lib/errors.js'

export const analyticsController = {
  getLinkStats: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { linkId } = req.params as any
      const result = await analyticsService.getLinkStats(linkId, user.id)
      return reply.send(result)
    } catch (err) { return handleError(reply, err) }
  },

  getClicks: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { linkId } = req.params as any
      const { page = 1, limit = 50 } = req.query as any
      const result = await analyticsService.getClicks(linkId, user.id, Number(page), Number(limit))
      return reply.send(result)
    } catch (err) { return handleError(reply, err) }
  },

  getOverview: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const result = await analyticsService.getOverview(user.id)
      return reply.send(result)
    } catch (err) { return handleError(reply, err) }
  },
}
