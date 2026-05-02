import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { domainService } from '../services/domain.service.js'
import { handleError } from '../lib/errors.js'

export const domainController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ domains: await domainService.list((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  add: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { domain } = z.object({ domain: z.string().min(3) }).parse(req.body)
      const result = await domainService.add(user.id, user.plan, domain)
      return reply.code(201).send({ domain: result, instructions: domainService.getInstructions(domain) })
    } catch (err) { return handleError(reply, err) }
  },
  verify: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { id } = req.params as any
      const domain = await domainService.verify(user.id, id)
      return reply.send({ domain, verified: domain.verified })
    } catch (err) { return handleError(reply, err) }
  },
  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await domainService.delete((req as any).currentUser.id, (req.params as any).id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },
}
