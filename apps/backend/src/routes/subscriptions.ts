import type { FastifyInstance } from 'fastify'
import { subscriptionController } from '../controllers/subscription.controller.js'
import { authenticate } from '../lib/auth.js'

export async function subscriptionRoutes(app: FastifyInstance) {
  app.get('/plans', subscriptionController.getPlans)
  app.post('/webhook', subscriptionController.webhook) // no auth — Razorpay calls this
  app.post('/create', { preHandler: authenticate }, subscriptionController.create)
  app.post('/verify', { preHandler: authenticate }, subscriptionController.verify)
  app.post('/cancel', { preHandler: authenticate }, subscriptionController.cancel)
  app.get('/status', { preHandler: authenticate }, subscriptionController.getStatus)
}
