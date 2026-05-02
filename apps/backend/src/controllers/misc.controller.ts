import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { qrService, utmService, pixelService, workspaceService, apiKeyService, bioService } from '../services/misc.service.js'
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
const pixelSchema = z.object({ name: z.string(), type: z.enum(['FACEBOOK', 'GOOGLE']), pixelId: z.string() })
export const pixelController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ pixels: await pixelService.list((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const data = pixelSchema.parse(req.body)
      return reply.code(201).send({ pixel: await pixelService.create(user.id, user.plan, data) })
    } catch (err) { return handleError(reply, err) }
  },
  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await pixelService.delete((req.params as any).id, (req as any).currentUser.id)
      return reply.send({ ok: true })
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
const bioSchema = z.object({ slug: z.string().min(3).max(50), title: z.string(), description: z.string().optional(), avatar: z.string().optional(), links: z.array(z.any()).optional(), theme: z.string().optional() })
export const bioController = {
  get: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ bio: await bioService.get((req as any).currentUser.id) }) }
    catch (err) { return handleError(reply, err) }
  },
  getPublic: async (req: FastifyRequest, reply: FastifyReply) => {
    try { return reply.send({ bio: await bioService.getPublic((req.params as any).slug) }) }
    catch (err) { return handleError(reply, err) }
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
