import type { FastifyInstance } from 'fastify'
import { analyticsController } from '../controllers/analytics.controller.js'
import { authenticate } from '../lib/auth.js'

export async function analyticsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)
  app.get('/overview', analyticsController.getOverview)
  app.get('/:linkId', analyticsController.getLinkStats)
  app.get('/:linkId/clicks', analyticsController.getClicks)
}
