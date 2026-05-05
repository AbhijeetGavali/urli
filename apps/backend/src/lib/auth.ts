import type { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from './prisma.js'
import { redis, blacklistKey } from './redis.js'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  try {
    // Support API key auth via Bearer urli_xxx token
    console.log("Public shorten request from", req.ip);
    const authHeader = req.headers.authorization || ''
    if (authHeader.startsWith('Bearer urli_')) {
      const key = authHeader.slice(7)
      const apiKey = await prisma.apiKey.findUnique({ where: { key }, include: { user: true } })
      if (!apiKey || !apiKey.user || apiKey.user.deletedAt) {
        return reply.code(401).send({ error: 'Invalid API key' })
      }
      // Update lastUsedAt non-blocking
      prisma.apiKey.update({ where: { id: apiKey.id }, data: { lastUsedAt: new Date() } }).catch(() => {})
      ;(req as any).currentUser = apiKey.user
      return
    }

    await req.jwtVerify()
    const payload = req.user as { id: string; jti?: string }
    if (payload.jti && await redis.get(blacklistKey(payload.jti))) {
      return reply.code(401).send({ error: 'Token revoked' })
    }
    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (!user || user.deletedAt) return reply.code(401).send({ error: 'Unauthorized' })
    ;(req as any).currentUser = user
  } catch {
    return reply.code(401).send({ error: 'Unauthorized' })
  }
}

export async function requireAdmin(req: FastifyRequest, reply: FastifyReply) {
  await authenticate(req, reply)
  if ((req as any).currentUser?.role !== 'ADMIN') {
    return reply.code(403).send({ error: 'Forbidden' })
  }
}

export async function optionalAuth(req: FastifyRequest, _reply: FastifyReply) {
  try {
    await req.jwtVerify()
    const payload = req.user as { id: string }
    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (user) (req as any).currentUser = user
  } catch { /* no-op */ }
}
