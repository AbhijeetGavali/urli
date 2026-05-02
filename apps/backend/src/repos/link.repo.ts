import { prisma } from '../lib/prisma.js'

export const linkRepo = {
  findBySlug: (slug: string) => prisma.link.findUnique({ where: { slug } }),
  findById: (id: string) => prisma.link.findUnique({ where: { id } }),
  findByIdAndUser: (id: string, userId: string) => prisma.link.findFirst({ where: { id, userId } }),

  findMany: (where: any, skip: number, take: number) =>
    prisma.link.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
  count: (where: any) => prisma.link.count({ where }),

  countThisMonth: (userId: string) => {
    const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0)
    return prisma.link.count({ where: { userId, createdAt: { gte: start } } })
  },

  create: (data: any) => prisma.link.create({ data }),
  update: (id: string, data: any) => prisma.link.update({ where: { id }, data }),
  delete: (id: string) => prisma.link.delete({ where: { id } }),
  incrementClick: (id: string) => prisma.link.update({ where: { id }, data: { clickCount: { increment: 1 } } }),
}
