import { userRepo } from '../repos/user.repo.js'
import { linkRepo } from '../repos/link.repo.js'
import { prisma } from '../lib/prisma.js'
import { AppError } from '../lib/errors.js'

export const adminService = {
  getStats: async () => {
    const [users, links, clicks] = await Promise.all([
      userRepo.count(),
      linkRepo.count({}),
      prisma.click.count(),
    ])
    return { users, links, clicks }
  },

  getUsers: async (page: number, limit: number) => {
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([userRepo.findAll(skip, limit), userRepo.count()])
    return { users, total, page, limit }
  },

  updateUser: async (id: string, data: { plan?: string; role?: string }) => {
    const user = await userRepo.findById(id)
    if (!user) throw new AppError('User not found', 404)
    return userRepo.update(id, data)
  },
}
