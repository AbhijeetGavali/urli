import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { subscriptionService } from '../services/subscription.service.js'
import { handleError } from '../lib/errors.js'

const createSchema = z.object({ plan: z.enum(['PRO', 'BUSINESS']) })
const verifySchema = z.object({
  razorpay_subscription_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
})

export const subscriptionController = {
  getPlans: async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      return reply.send(subscriptionService.getPlans())
    } catch (err) { return handleError(reply, err) }
  },

  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { plan } = createSchema.parse(req.body)
      const result = await subscriptionService.createSubscription(user.id, plan)
      return reply.send(result)
    } catch (err) { return handleError(reply, err) }
  },

  verify: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const data = verifySchema.parse(req.body)
      const result = await subscriptionService.verifyPayment(user.id, data)
      return reply.send(result)
    } catch (err) { return handleError(reply, err) }
  },

  webhook: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const sig = req.headers['x-razorpay-signature'] as string
      // Use raw body string for HMAC — re-serializing parsed JSON changes key order
      const rawBody = (req as any).rawBody ?? JSON.stringify(req.body)
      await subscriptionService.handleWebhook(rawBody, sig)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },

  cancel: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      await subscriptionService.cancel(user.id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },

  getStatus: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const sub = await subscriptionService.getStatus(user.id)
      return reply.send({ subscription: sub })
    } catch (err) { return handleError(reply, err) }
  },
}
