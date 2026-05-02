import type { FastifyInstance } from 'fastify'
import { authController } from '../controllers/auth.controller.js'
import { authenticate } from '../lib/auth.js'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', authController.register)
  app.post('/login', authController.login)
  app.post('/google', authController.google)
  app.post('/refresh', authController.refresh)
  app.post('/logout', { preHandler: authenticate }, authController.logout)
  app.get('/me', { preHandler: authenticate }, authController.me)
  app.get('/verify-email', authController.verifyEmail)
  app.post('/resend-verification', { preHandler: authenticate }, authController.resendVerification)
  app.post('/forgot-password', authController.forgotPassword)
  app.post('/reset-password', authController.resetPassword)
  app.delete('/delete-account', { preHandler: authenticate }, authController.deleteAccount)
  app.get('/export-data', { preHandler: authenticate }, authController.exportData)
}
