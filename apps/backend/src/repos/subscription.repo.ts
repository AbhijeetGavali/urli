import { prisma } from '../lib/prisma.js'

export const subscriptionRepo = {
  findByUser: (userId: string) => prisma.subscription.findUnique({ where: { userId } }),
  findByRazorpayId: (razorpaySubId: string) => prisma.subscription.findUnique({ where: { razorpaySubId } }),
  create: (data: any) => prisma.subscription.create({ data }),
  update: (id: string, data: any) => prisma.subscription.update({ where: { id }, data }),
  upsertByUser: (userId: string, data: any) =>
    prisma.subscription.upsert({ where: { userId }, create: { userId, ...data }, update: data }),
}
