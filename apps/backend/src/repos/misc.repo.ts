import { prisma } from '../lib/prisma.js'

export const workspaceRepo = {
  findById: (id: string) => prisma.workspace.findUnique({ where: { id }, include: { members: { include: { user: { select: { id: true, name: true, email: true, avatar: true } } } } } }),
  findByUser: (userId: string) =>
    prisma.workspace.findMany({ where: { members: { some: { userId } } }, include: { members: true } }),
  create: (data: any) => prisma.workspace.create({ data }),
  update: (id: string, data: any) => prisma.workspace.update({ where: { id }, data }),
  delete: (id: string) => prisma.workspace.delete({ where: { id } }),
  addMember: (workspaceId: string, userId: string, role: any) =>
    prisma.workspaceMember.create({ data: { workspaceId, userId, role } }),
  removeMember: (workspaceId: string, userId: string) =>
    prisma.workspaceMember.delete({ where: { workspaceId_userId: { workspaceId, userId } } }),
  getMember: (workspaceId: string, userId: string) =>
    prisma.workspaceMember.findUnique({ where: { workspaceId_userId: { workspaceId, userId } } }),
}

export const utmRepo = {
  findByUser: (userId: string) => prisma.uTMTemplate.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
  create: (data: any) => prisma.uTMTemplate.create({ data }),
  delete: (id: string, userId: string) => prisma.uTMTemplate.deleteMany({ where: { id, userId } }),
}

export const pixelRepo = {
  findByUser: (userId: string) => prisma.pixel.findMany({ where: { userId } }),
  findByIds: (ids: string[]) => prisma.pixel.findMany({ where: { id: { in: ids } } }),
  create: (data: any) => prisma.pixel.create({ data }),
  delete: (id: string, userId: string) => prisma.pixel.deleteMany({ where: { id, userId } }),
}

export const apiKeyRepo = {
  findByUser: (userId: string) => prisma.apiKey.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
  findByKey: (key: string) => prisma.apiKey.findUnique({ where: { key } }),
  create: (data: any) => prisma.apiKey.create({ data }),
  delete: (id: string, userId: string) => prisma.apiKey.deleteMany({ where: { id, userId } }),
  touch: (id: string) => prisma.apiKey.update({ where: { id }, data: { lastUsedAt: new Date() } }),
}

export const bioRepo = {
  findByUser: (userId: string) => prisma.bioPage.findUnique({ where: { userId } }),
  findBySlug: (slug: string) => prisma.bioPage.findUnique({ where: { slug } }),
  upsert: (userId: string, data: any) =>
    prisma.bioPage.upsert({ where: { userId }, create: { userId, ...data }, update: data }),
}
