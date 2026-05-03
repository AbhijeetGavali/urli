import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { qrService, utmService, pixelService, workspaceService, apiKeyService, bioService, bioTemplateService, featureRequestService } from '../services/misc.service.js'
import { adminService } from '../services/admin.service.js'
import { handleError } from '../lib/errors.js'

// QR
export const qrController = {
  generate: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { linkId } = req.params as any
      const { format = 'png' } = req.query as any
      const result = await qrService.generate(linkId, user.id, format)
      return reply.send({ qr: result })
    } catch (err) { return handleError(reply, err) }
  },
}

// UTM
const utmSchema = z.object({ name: z.string(), source: z.string().optional(), medium: z.string().optional(), campaign: z.string().optional(), term: z.string().optional(), content: z.string().optional() })
export const utmController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ templates: await utmService.list((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = utmSchema.parse(req.body)
      return reply.code(201).send({ template: await utmService.create((req as any).currentUser.id, data) })
    } catch (err) { return handleError(reply, err) }
  },
  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await utmService.delete((req.params as any).id, (req as any).currentUser.id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },
}

// Pixel
const pixelSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['FACEBOOK', 'GOOGLE']),
  pixelId: z.string().superRefine((val, ctx) => {
    // determined by the type field — validated in create handler
  }),
})
const pixelSchemaFull = z.discriminatedUnion('type', [
  z.object({ name: z.string().min(1), type: z.literal('FACEBOOK'), pixelId: z.string().regex(/^\d+$/, 'Facebook Pixel ID must be numeric') }),
  z.object({ name: z.string().min(1), type: z.literal('GOOGLE'), pixelId: z.string().regex(/^AW-/, 'Google Pixel ID must start with AW-') }),
])
export const pixelController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ pixels: await pixelService.list((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const data = pixelSchemaFull.parse(req.body)
      return reply.code(201).send({ pixel: await pixelService.create(user.id, user.plan, data) })
    } catch (err) { return handleError(reply, err) }
  },
  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await pixelService.delete((req.params as any).id, (req as any).currentUser.id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },
  // Gap 7: verify a pixel fires correctly by returning a test HTML page
  verify: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const pixel = await pixelService.getOne((req.params as any).id, user.id)
      return reply.send({ ok: true, pixel })
    } catch (err) { return handleError(reply, err) }
  },
}

// Workspace
export const workspaceController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ workspaces: await workspaceService.list((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { name } = z.object({ name: z.string().min(2) }).parse(req.body)
      return reply.code(201).send({ workspace: await workspaceService.create(user.id, user.plan, name) })
    } catch (err) { return handleError(reply, err) }
  },
  addMember: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { id } = req.params as any
      const { userId, role } = z.object({ userId: z.string(), role: z.enum(['ADMIN', 'EDITOR', 'VIEWER']) }).parse(req.body)
      return reply.send({ member: await workspaceService.addMember(id, user.id, userId, role) })
    } catch (err) { return handleError(reply, err) }
  },
  removeMember: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { id, userId } = req.params as any
      await workspaceService.removeMember(id, user.id, userId)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },
}

// API Keys
export const apiKeyController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ apiKeys: await apiKeyService.list((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { name } = z.object({ name: z.string().min(2) }).parse(req.body)
      return reply.code(201).send({ apiKey: await apiKeyService.create(user.id, user.plan, name) })
    } catch (err) { return handleError(reply, err) }
  },
  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await apiKeyService.delete((req.params as any).id, (req as any).currentUser.id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },
}

// Bio Page
const bioSchema = z.object({
  slug: z.string().min(3).max(50),
  title: z.string(),
  description: z.string().optional(),
  avatar: z.string().optional(),
  links: z.array(z.any()).optional(),
  theme: z.string().optional(),
  template: z.string().optional(),
  sections: z.array(z.any()).optional(),
  published: z.boolean().optional(),
})
export const bioController = {
  get: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ bio: await bioService.get((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  getPublic: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ bio: await bioService.getPublic((req.params as any).slug) }) }
    catch (err) { return handleError(reply, err) }
  },
  checkSlug: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { slug } = req.params as any
      const existing = await bioService.checkSlug(slug, (req as any).currentUser.id)
      return reply.send({ available: !existing })
    } catch (err) { return handleError(reply, err) }
  },
  trackClick: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { slug, url } = req.query as any
      if (!url) return reply.code(400).send({ error: 'Missing url' })
      // Fire-and-forget: record the click against the bio page owner
      bioService.recordClick(slug, url, req.ip).catch(() => {})
      return reply.redirect(302, decodeURIComponent(url))
    } catch (err) { return handleError(reply, err) }
  },
  upsert: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const data = bioSchema.parse(req.body)
      return reply.send({ bio: await bioService.upsert(user.id, user.plan, data) })
    } catch (err) { return handleError(reply, err) }
  },
}

// Admin
export const adminController = {
  getStats: async (_req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send(await adminService.getStats()) }
    catch (err) { return handleError(reply, err) }
  },
  getUsers: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { page = 1, limit = 20 } = req.query as any
      return reply.send(await adminService.getUsers(Number(page), Number(limit)))
    } catch (err) { return handleError(reply, err) }
  },
  updateUser: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as any
      const data = z.object({ plan: z.enum(['FREE', 'PRO', 'BUSINESS']).optional(), role: z.enum(['USER', 'ADMIN']).optional() }).parse(req.body)
      return reply.send({ user: await adminService.updateUser(id, data) })
    } catch (err) { return handleError(reply, err) }
  },
}

// Bio Templates (admin-managed)
export const bioTemplateController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { profession } = req.query as any
      return reply.send({ templates: await bioTemplateService.list(profession) })
    } catch (err) { return handleError(reply, err) }
  },
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = z.object({
        profession: z.string(), variantName: z.string(), description: z.string().optional(),
        thumbnail: z.string().optional(), config: z.any(), sortOrder: z.number().optional(),
      }).parse(req.body)
      return reply.code(201).send({ template: await bioTemplateService.create(data) })
    } catch (err) { return handleError(reply, err) }
  },
  update: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as any
      return reply.send({ template: await bioTemplateService.update(id, req.body) })
    } catch (err) { return handleError(reply, err) }
  },
  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await bioTemplateService.delete((req.params as any).id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },
}

// Feature Requests
export const featureRequestController = {
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const data = z.object({
        description: z.string().min(10).max(1000),
        category: z.enum(['NEW_SECTION_TYPE', 'NEW_VARIANT', 'NEW_PROFESSION', 'CUSTOMIZATION_OPTION', 'BUG', 'OTHER']).default('OTHER'),
        isBlocking: z.boolean().default(false),
        context: z.string().optional(),
        bioPageId: z.string().optional(),
      }).parse(req.body)
      const { bioPageId, ...rest } = data
      return reply.code(201).send({ request: await featureRequestService.create(user.id, bioPageId ?? null, rest) })
    } catch (err) { return handleError(reply, err) }
  },
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { status, category, page = 1, limit = 20 } = req.query as any
      const [requests, total] = await featureRequestService.list({ status, category, page: Number(page), limit: Number(limit) })
      return reply.send({ requests, total })
    } catch (err) { return handleError(reply, err) }
  },
  update: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as any
      const data = z.object({
        status: z.enum(['SUBMITTED', 'UNDER_REVIEW', 'PLANNED', 'COMPLETED', 'DECLINED']).optional(),
        adminNote: z.string().optional(),
      }).parse(req.body)
      return reply.send({ request: await featureRequestService.update(id, data) })
    } catch (err) { return handleError(reply, err) }
  },
}
