import type { FastifyInstance } from 'fastify'
import { linkController } from '../controllers/link.controller.js'
import { authenticate } from '../lib/auth.js'

export async function linkRoutes(app: FastifyInstance) {
  // Public: anonymous shorten — isolated scope so authenticate hook below doesn't apply
  app.register(async (pub) => {
    pub.post('/shorten', {
      config: { rateLimit: { max: 5, timeWindow: '1 hour' } },
    }, linkController.publicShorten)
  })

  app.addHook('preHandler', authenticate)
  app.post('/', linkController.create)
  app.get('/', linkController.list)
  app.get('/:id', linkController.getOne)
  app.patch('/:id', linkController.update)
  app.delete('/:id', linkController.delete)
}
