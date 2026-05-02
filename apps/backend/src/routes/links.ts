import type { FastifyInstance } from 'fastify'
import { linkController } from '../controllers/link.controller.js'
import { authenticate } from '../lib/auth.js'

export async function linkRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)
  app.post('/', linkController.create)
  app.get('/', linkController.list)
  app.get('/:id', linkController.getOne)
  app.patch('/:id', linkController.update)
  app.delete('/:id', linkController.delete)
}
