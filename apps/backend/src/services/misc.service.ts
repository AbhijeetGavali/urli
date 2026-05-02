import QRCode from 'qrcode'
import { nanoid } from 'nanoid'
import { linkRepo } from '../repos/link.repo.js'
import { utmRepo, pixelRepo, workspaceRepo, apiKeyRepo, bioRepo } from '../repos/misc.repo.js'
import { AppError } from '../lib/errors.js'

export const qrService = {
  generate: async (linkId: string, userId: string, format: 'png' | 'svg' = 'png') => {
    const link = await linkRepo.findByIdAndUser(linkId, userId)
    if (!link) throw new AppError('Link not found', 404)
    const url = `${process.env.SHORT_DOMAIN ? `https://${process.env.SHORT_DOMAIN}` : 'http://localhost:4000'}/${link.slug}`
    if (format === 'svg') return QRCode.toString(url, { type: 'svg' })
    return QRCode.toDataURL(url, { width: 400, margin: 2 })
  },
}

export const utmService = {
  list: (userId: string) => utmRepo.findByUser(userId),
  create: (userId: string, data: any) => utmRepo.create({ ...data, userId }),
  delete: async (id: string, userId: string) => {
    const deleted = await utmRepo.delete(id, userId)
    if (!deleted.count) throw new AppError('Template not found', 404)
  },
}

export const pixelService = {
  list: (userId: string) => pixelRepo.findByUser(userId),
  create: (userId: string, plan: string, data: any) => {
    if (plan === 'FREE') throw new AppError('Retargeting pixels require Pro plan', 403)
    return pixelRepo.create({ ...data, userId })
  },
  delete: async (id: string, userId: string) => {
    const deleted = await pixelRepo.delete(id, userId)
    if (!deleted.count) throw new AppError('Pixel not found', 404)
  },
}

export const workspaceService = {
  list: (userId: string) => workspaceRepo.findByUser(userId),

  create: async (userId: string, plan: string, name: string) => {
    if (plan !== 'BUSINESS') throw new AppError('Workspaces require Business plan', 403)
    const ws = await workspaceRepo.create({ name, ownerId: userId })
    await workspaceRepo.addMember(ws.id, userId, 'OWNER')
    return ws
  },

  addMember: async (workspaceId: string, requesterId: string, userId: string, role: string) => {
    const member = await workspaceRepo.getMember(workspaceId, requesterId)
    if (!member || !['OWNER', 'ADMIN'].includes(member.role)) throw new AppError('Insufficient permissions', 403)
    return workspaceRepo.addMember(workspaceId, userId, role as any)
  },

  removeMember: async (workspaceId: string, requesterId: string, userId: string) => {
    const member = await workspaceRepo.getMember(workspaceId, requesterId)
    if (!member || !['OWNER', 'ADMIN'].includes(member.role)) throw new AppError('Insufficient permissions', 403)
    return workspaceRepo.removeMember(workspaceId, userId)
  },
}

export const apiKeyService = {
  list: (userId: string) => apiKeyRepo.findByUser(userId),

  create: async (userId: string, plan: string, name: string) => {
    if (plan === 'FREE') throw new AppError('API keys require Pro plan', 403)
    const key = `urli_${nanoid(32)}`
    return apiKeyRepo.create({ userId, name, key })
  },

  delete: async (id: string, userId: string) => {
    const deleted = await apiKeyRepo.delete(id, userId)
    if (!deleted.count) throw new AppError('API key not found', 404)
  },
}

export const bioService = {
  get: (userId: string) => bioRepo.findByUser(userId),
  getPublic: async (slug: string) => {
    const bio = await bioRepo.findBySlug(slug)
    if (!bio) throw new AppError('Bio page not found', 404)
    return bio
  },
  upsert: async (userId: string, plan: string, data: any) => {
    if (plan === 'FREE') throw new AppError('Link-in-bio requires Pro plan', 403)
    if (data.slug) {
      const existing = await bioRepo.findBySlug(data.slug)
      if (existing && existing.userId !== userId) throw new AppError('Slug already taken', 409)
    }
    return bioRepo.upsert(userId, data)
  },
}
