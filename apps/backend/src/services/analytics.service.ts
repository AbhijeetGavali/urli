import { clickRepo } from '../repos/click.repo.js'
import { linkRepo } from '../repos/link.repo.js'
import { userRepo } from '../repos/user.repo.js'
import { AppError } from '../lib/errors.js'

// Free plan: hide clicks older than 30 days (never delete)
function planSince(plan: string): Date | undefined {
  if (plan === 'FREE') {
    const d = new Date(); d.setDate(d.getDate() - 30); return d
  }
  return undefined
}

export const analyticsService = {
  getLinkStats: async (linkId: string, userId: string) => {
    const link = await linkRepo.findByIdAndUser(linkId, userId)
    if (!link) throw new AppError('Link not found', 404)

    const user = await userRepo.findById(userId)
    const since = planSince(user?.plan || 'FREE')

    const [total, byCountry, byDevice, byReferrer, overTime] = await Promise.all([
      clickRepo.countByLink(linkId, since),
      clickRepo.groupByCountry(linkId, since),
      clickRepo.groupByDevice(linkId, since),
      clickRepo.groupByReferrer(linkId, since),
      clickRepo.clicksOverTime(linkId, 30),
    ])

    const dailyMap: Record<string, number> = {}
    for (const c of overTime) {
      const day = c.createdAt.toISOString().split('T')[0]
      dailyMap[day] = (dailyMap[day] || 0) + 1
    }

    return {
      link,
      total,
      planLimited: !!since,
      byCountry: byCountry.map(r => ({ country: r.country || 'Unknown', count: r._count })),
      byDevice: byDevice.map(r => ({ device: r.device || 'Unknown', count: r._count })),
      byReferrer: byReferrer.map(r => ({ referrer: r.referrer || 'Direct', count: r._count })),
      daily: Object.entries(dailyMap).map(([date, count]) => ({ date, count })),
    }
  },

  getClicks: async (linkId: string, userId: string, page: number, limit: number) => {
    const link = await linkRepo.findByIdAndUser(linkId, userId)
    if (!link) throw new AppError('Link not found', 404)
    const user = await userRepo.findById(userId)
    const since = planSince(user?.plan || 'FREE')
    const skip = (page - 1) * limit
    const [clicks, total] = await Promise.all([
      clickRepo.findByLink(linkId, skip, limit, since),
      clickRepo.countByLink(linkId, since),
    ])
    return { clicks, total, page, limit, planLimited: !!since }
  },

  getOverview: async (userId: string) => {
    const user = await userRepo.findById(userId)
    const since = planSince(user?.plan || 'FREE')
    const [totalClicks, recentClicks, links] = await Promise.all([
      clickRepo.overviewByUser(userId, undefined), // always all-time
      clickRepo.recentByUser(userId, 30),
      linkRepo.count({ userId }),
    ])
    return { totalClicks, recentClicks, totalLinks: links, planLimited: !!since }
  },
}
