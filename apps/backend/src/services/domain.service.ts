import dns from "dns/promises";
import { nanoid } from "nanoid";
import { domainRepo } from "../repos/domain.repo.js";
import { AppError } from "../lib/errors.js";

const APP_HOST = process.env.SHORT_DOMAIN || "urli.ideasprout.in";

export const domainService = {
  list: (userId: string) => domainRepo.findByUser(userId),

  add: async (userId: string, plan: string, domain: string) => {
    if (plan === "FREE")
      throw new AppError("Custom domains require Pro plan", 403);
    const existing = await domainRepo.findByDomain(domain);
    if (existing && existing.userId !== userId)
      throw new AppError("Domain already registered", 409);
    if (existing) return existing;

    const verifyToken = `urli-verify=${nanoid(24)}`;
    return domainRepo.create({ userId, domain, verifyToken });
  },

  verify: async (userId: string, domainId: string) => {
    const record = await domainRepo.findById(domainId);
    if (!record || record.userId !== userId)
      throw new AppError("Domain not found", 404);
    if (record.verified) return record;

    // Check CNAME points to our host
    try {
      const cnames = await dns.resolveCname(record.domain);
      const cnameOk = cnames.some((c) => c.includes(APP_HOST));

      // Also check TXT record for ownership verification
      let txtOk = false;
      try {
        const txts = await dns.resolveTxt(record.domain);
        txtOk = txts.flat().some((t) => t === record.verifyToken);
      } catch {
        /* TXT may not exist yet */
      }

      if (!cnameOk && !txtOk) {
        throw new AppError(
          `DNS not configured. Add a CNAME record: ${record.domain} → ${APP_HOST}\nOr add TXT record: ${record.domain} → ${record.verifyToken}`,
          400,
        );
      }

      return domainRepo.update(record.id, { verified: true });
    } catch (err: any) {
      if (err instanceof AppError) throw err;
      throw new AppError(
        "DNS lookup failed. Check your domain configuration.",
        400,
      );
    }
  },

  delete: async (userId: string, id: string) => {
    const deleted = await domainRepo.delete(id, userId);
    if (!deleted.count) throw new AppError("Domain not found", 404);
  },

  getInstructions: (domain: string) => ({
    cname: { type: "CNAME", name: domain, value: APP_HOST, ttl: 3600 },
    note: `Point your domain's CNAME record to ${APP_HOST}. DNS changes can take up to 48 hours to propagate.`,
    caddy: `# Add to your Caddyfile:\n${domain} {\n  reverse_proxy localhost:4000\n}`,
  }),
};
