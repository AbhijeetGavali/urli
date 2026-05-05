import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import cookie from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";
import jwt from "@fastify/jwt";
import { redis } from "./lib/redis.js";
import { authRoutes } from "./routes/auth.js";
import { linkRoutes, publicLinkRoutes } from "./routes/links.js";
import { analyticsRoutes } from "./routes/analytics.js";
import { subscriptionRoutes } from "./routes/subscriptions.js";
import { redirectRoute } from "./routes/redirect.js";
import {
  qrRoutes,
  utmRoutes,
  pixelRoutes,
  workspaceRoutes,
  apiKeyRoutes,
  bioRoutes,
  adminRoutes,
  domainRoutes,
  featureRequestRoutes,
  bioTemplatePublicRoutes,
} from "./routes/misc.js";

const app = Fastify({ logger: true, trustProxy: true });

await app.register(helmet, { contentSecurityPolicy: false });
await app.register(cors, {
  origin: [process.env.FRONTEND_URL!, process.env.ADMIN_URL!].filter(Boolean),
  credentials: true,
});
await app.register(cookie);
await app.register(jwt, { secret: process.env.JWT_SECRET! });
await app.register(rateLimit, { max: 100, timeWindow: "1 minute", redis });

await app.register(authRoutes, { prefix: "/auth" });
await app.register(publicLinkRoutes, { prefix: "/public-links" });
await app.register(linkRoutes, { prefix: "/links" });
await app.register(analyticsRoutes, { prefix: "/analytics" });
await app.register(subscriptionRoutes, { prefix: "/subscriptions" });
await app.register(qrRoutes, { prefix: "/qr" });
await app.register(utmRoutes, { prefix: "/utm-templates" });
await app.register(pixelRoutes, { prefix: "/pixels" });
await app.register(workspaceRoutes, { prefix: "/workspaces" });
await app.register(apiKeyRoutes, { prefix: "/api-keys" });
await app.register(bioRoutes, { prefix: "/bio" });
await app.register(adminRoutes, { prefix: "/admin" });
await app.register(domainRoutes, { prefix: "/domains" });
await app.register(featureRequestRoutes, { prefix: "/feature-requests" });
await app.register(bioTemplatePublicRoutes, { prefix: "/bio-templates" });
await app.register(redirectRoute); // must be last - catches /:slug

app.get("/health", async () => ({
  status: "ok",
  ts: new Date().toISOString(),
}));

try {
  await app.listen({ port: Number(process.env.PORT) || 4000, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
