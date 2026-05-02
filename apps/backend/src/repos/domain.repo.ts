import { prisma } from '../lib/prisma.js'

export const domainRepo = {
  findByUser: (userId: string) => prisma.customDomain.findMany({ where: { userId } }),
  findByDomain: (domain: string) => prisma.customDomain.findUnique({ where: { domain } }),
  findById: (id: string) => prisma.customDomain.findUnique({ where: { id } }),
  findByToken: (verifyToken: string) => prisma.customDomain.findUnique({ where: { verifyToken } }),
  create: (data: any) => prisma.customDomain.create({ data }),
  update: (id: string, data: any) => prisma.customDomain.update({ where: { id }, data }),
  delete: (id: string, userId: string) => prisma.customDomain.deleteMany({ where: { id, userId } }),
}
