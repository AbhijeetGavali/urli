import type { FastifyInstance } from "fastify";
import { subscriptionController } from "../controllers/subscription.controller.js";
import { authenticate } from "../lib/auth.js";

export async function subscriptionRoutes(app: FastifyInstance) {
  app.get("/plans", subscriptionController.getPlans);
  // Gap 6: capture raw body for Razorpay HMAC signature verification
  app.post("/webhook", {
    preParsing: async (req, _reply, payload) => {
      const chunks: Buffer[] = []
      for await (const chunk of payload) chunks.push(chunk as Buffer)
      const raw = Buffer.concat(chunks).toString('utf8');
      (req as any).rawBody = raw
      // Return a readable stream from the raw string so Fastify can still parse JSON
      const { Readable } = await import('stream')
      const stream = Readable.from([raw])
      return stream as any
    },
    handler: subscriptionController.webhook,
  });
  app.post(
    "/create",
    { preHandler: authenticate },
    subscriptionController.create,
  );
  app.post(
    "/verify",
    { preHandler: authenticate },
    subscriptionController.verify,
  );
  app.post(
    "/cancel",
    { preHandler: authenticate },
    subscriptionController.cancel,
  );
  app.get(
    "/status",
    { preHandler: authenticate },
    subscriptionController.getStatus,
  );
}
