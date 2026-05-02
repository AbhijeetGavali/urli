import type { FastifyReply } from 'fastify'
import { ZodError } from 'zod'

export class AppError extends Error {
  constructor(public message: string, public statusCode = 400) {
    super(message)
  }
}

export function handleError(reply: FastifyReply, err: unknown) {
  if (err instanceof AppError) {
    return reply.code(err.statusCode).send({ error: err.message })
  }
  if (err instanceof ZodError) {
    return reply.code(400).send({ error: 'Validation failed', details: err.flatten() })
  }
  console.error(err)
  return reply.code(500).send({ error: 'Internal server error' })
}
