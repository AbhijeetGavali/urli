import { prisma } from '../lib/prisma.js'

export const userRepo = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findByGoogleId: (googleId: string) => prisma.user.findUnique({ where: { googleId } }),
  findByResetToken: (token: string) => prisma.user.findFirst({ where: { resetToken: token, resetTokenExpiry: { gt: new Date() } } }),
  findByVerifyToken: (token: string) => prisma.user.findFirst({ where: { verifyToken: token } }),

  create: (data: any) => prisma.user.create({ data }),
  update: (id: string, data: any) => prisma.user.update({ where: { id }, data }),

  findAll: (skip: number, take: number) =>
    prisma.user.findMany({ skip, take, orderBy: { createdAt: 'desc' }, select: { id: true, email: true, name: true, plan: true, role: true, createdAt: true, emailVerified: true } }),
  count: () => prisma.user.count(),

  softDelete: (id: string) =>
    prisma.user.update({ where: { id }, data: { deletedAt: new Date(), email: `deleted_${id}@deleted.invalid`, name: 'Deleted User', passwordHash: null, googleId: null } }),

  findWithData: (id: string) =>
    prisma.user.findUnique({ where: { id }, include: { links: { include: { clicks: true } }, utmTemplates: true, pixels: true, apiKeys: { select: { id: true, name: true, createdAt: true } }, bioPage: true, subscription: true } }),
}
