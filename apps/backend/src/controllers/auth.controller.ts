import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { authService } from '../services/auth.service.js'
import { handleError } from '../lib/errors.js'
import { redis, blacklistKey } from '../lib/redis.js'
import { nanoid } from 'nanoid'

const registerSchema = z.object({ email: z.string().email(), name: z.string().min(2), password: z.string().min(8), termsAccepted: z.boolean().refine(v => v === true, 'You must accept the terms') })
const loginSchema = z.object({ email: z.string().email(), password: z.string() })
const googleSchema = z.object({ googleId: z.string(), email: z.string().email(), name: z.string(), avatar: z.string().optional() })
const emailSchema = z.object({ email: z.string().email() })
const resetSchema = z.object({ token: z.string(), password: z.string().min(8) })

function signTokens(app: any, userId: string) {
  const jti = nanoid()
  const accessToken = app.jwt.sign({ id: userId, jti }, { expiresIn: '15m' })
  const refreshToken = app.jwt.sign({ id: userId, type: 'refresh' }, { expiresIn: '7d' })
  return { accessToken, refreshToken }
}

export const authController = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = registerSchema.parse(req.body)
      const user = await authService.register(data)
      const tokens = signTokens(req.server, user.id)
      return reply.code(201).send({ ...tokens, user })
    } catch (err) { return handleError(reply, err) }
  },

  login: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email, password } = loginSchema.parse(req.body)
      const user = await authService.login(email, password)
      const tokens = signTokens(req.server, user.id)
      return reply.send({ ...tokens, user })
    } catch (err) { return handleError(reply, err) }
  },

  google: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = googleSchema.parse(req.body)
      const user = await authService.googleAuth(data)
      const tokens = signTokens(req.server, user.id)
      return reply.send({ ...tokens, user })
    } catch (err) { return handleError(reply, err) }
  },

  refresh: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { refreshToken } = req.body as any
      if (!refreshToken) return reply.code(400).send({ error: 'Missing refresh token' })
      const payload = req.server.jwt.verify(refreshToken) as any
      if (payload.type !== 'refresh') return reply.code(401).send({ error: 'Invalid token' })
      const user = await authService.getMe(payload.id)
      const tokens = signTokens(req.server, user.id)
      return reply.send(tokens)
    } catch (err) { return handleError(reply, err) }
  },

  logout: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = req.user as any
      if (payload?.jti) await redis.setex(blacklistKey(payload.jti), 900, '1')
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },

  me: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      return reply.send({ user: (req as any).currentUser })
    } catch (err) { return handleError(reply, err) }
  },

  resendVerification: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      await authService.resendVerification(user.id)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },

  verifyEmail: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { token } = req.query as any
      await authService.verifyEmail(token)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },

  forgotPassword: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email } = emailSchema.parse(req.body)
      await authService.forgotPassword(email)
      return reply.send({ ok: true }) // always ok (don't reveal existence)
    } catch (err) { return handleError(reply, err) }
  },

  resetPassword: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { token, password } = resetSchema.parse(req.body)
      await authService.resetPassword(token, password)
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },

  deleteAccount: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const { password } = req.body as any
      await authService.deleteAccount(user.id, password)
      const payload = req.user as any
      if (payload?.jti) await redis.setex(blacklistKey(payload.jti), 900, '1')
      return reply.send({ ok: true })
    } catch (err) { return handleError(reply, err) }
  },

  exportData: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (req as any).currentUser
      const data = await authService.exportData(user.id)
      return reply.header('Content-Disposition', 'attachment; filename="urli-data-export.json"').send(data)
    } catch (err) { return handleError(reply, err) }
  },
}
