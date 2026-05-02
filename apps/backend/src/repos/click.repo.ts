import { prisma } from '../lib/prisma.js'

const sinceFilter = (since?: Date) => since ? { createdAt: { gte: since } } : {}

export const clickRepo = {
  create: (data: any) => prisma.click.create({ data }),

  findByLink: (linkId: string, skip: number, take: number, since?: Date) =>
    prisma.click.findMany({ where: { linkId, ...sinceFilter(since) }, skip, take, orderBy: { createdAt: 'desc' } }),

  countByLink: (linkId: string, since?: Date) =>
    prisma.click.count({ where: { linkId, ...sinceFilter(since) } }),

  groupByCountry: (linkId: string, since?: Date) =>
    prisma.click.groupBy({ by: ['country'], where: { linkId, ...sinceFilter(since) }, _count: true }),

  groupByDevice: (linkId: string, since?: Date) =>
    prisma.click.groupBy({ by: ['device'], where: { linkId, ...sinceFilter(since) }, _count: true }),

  groupByReferrer: (linkId: string, since?: Date) =>
    prisma.click.groupBy({ by: ['referrer'], where: { linkId, ...sinceFilter(since) }, _count: true }),

  clicksOverTime: (linkId: string, days: number) => {
    const since = new Date(); since.setDate(since.getDate() - days)
    return prisma.click.findMany({
      where: { linkId, createdAt: { gte: since } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    })
  },

  overviewByUser: (userId: string, since?: Date) =>
    prisma.click.count({ where: { userId, ...sinceFilter(since) } }),

  recentByUser: (userId: string, days: number) => {
    const since = new Date(); since.setDate(since.getDate() - days)
    return prisma.click.count({ where: { userId, createdAt: { gte: since } } })
  },
}
