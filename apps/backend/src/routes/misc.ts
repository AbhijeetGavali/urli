import type { FastifyInstance } from 'fastify'
import { qrController, utmController, pixelController, workspaceController, apiKeyController, bioController, adminController } from '../controllers/misc.controller.js'
import { domainController } from '../controllers/domain.controller.js'
import { authenticate, requireAdmin } from '../lib/auth.js'

export async function qrRoutes(app: FastifyInstance) {
  app.get('/:linkId', { preHandler: authenticate }, qrController.generate)
}

export async function utmRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)
  app.get('/', utmController.list)
  app.post('/', utmController.create)
  app.delete('/:id', utmController.delete)
}

export async function pixelRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)
  app.get('/', pixelController.list)
  app.post('/', pixelController.create)
  app.delete('/:id', pixelController.delete)
  app.get('/:id/verify', pixelController.verify)
}

export async function workspaceRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)
  app.get('/', workspaceController.list)
  app.post('/', workspaceController.create)
  app.post('/:id/members', workspaceController.addMember)
  app.delete('/:id/members/:userId', workspaceController.removeMember)
}

export async function apiKeyRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)
  app.get('/', apiKeyController.list)
  app.post('/', apiKeyController.create)
  app.delete('/:id', apiKeyController.delete)
}

export async function bioRoutes(app: FastifyInstance) {
  app.get('/public/:slug', bioController.getPublic)
  app.get('/', { preHandler: authenticate }, bioController.get)
  app.put('/', { preHandler: authenticate }, bioController.upsert)
}

export async function adminRoutes(app: FastifyInstance) {
  app.addHook('preHandler', requireAdmin)
  app.get('/stats', adminController.getStats)
  app.get('/users', adminController.getUsers)
  app.patch('/users/:id', adminController.updateUser)
}

export async function domainRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate)
  app.get('/', domainController.list)
  app.post('/', domainController.add)
  app.post('/:id/verify', domainController.verify)
  app.delete('/:id', domainController.delete)
}
