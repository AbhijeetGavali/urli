import type { FastifyInstance } from "fastify";
import { UAParser } from "ua-parser-js";
import { linkRepo } from "../repos/link.repo.js";
import { clickRepo } from "../repos/click.repo.js";
import { pixelRepo } from "../repos/misc.repo.js";
import { redis, linkCacheKey, LINK_CACHE_TTL } from "../lib/redis.js";

export async function redirectRoute(app: FastifyInstance) {
  app.get(
    "/:slug",
    {
      config: { rateLimit: { max: 60, timeWindow: "1 minute" } },
    },
    async (req, reply) => {
      const { slug } = req.params as { slug: string };

      // Cache-first lookup
      let link: any;
      const cached = await redis.get(linkCacheKey(slug));
      if (cached) {
        link = JSON.parse(cached);
      } else {
        link = await linkRepo.findBySlug(slug);
        if (link)
          await redis.setex(
            linkCacheKey(slug),
            LINK_CACHE_TTL,
            JSON.stringify(link),
          );
      }

      if (!link || !link.isActive)
        return reply.code(404).send({ error: "Link not found" });

      // Expiry check
      if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        return reply.redirect(
          302,
          `${process.env.FRONTEND_URL}/expired?slug=${slug}`,
        );
      }
      if (link.maxClicks && link.clickCount >= link.maxClicks) {
        return reply.redirect(
          302,
          `${process.env.FRONTEND_URL}/expired?slug=${slug}`,
        );
      }

      // Parse request context
      const ua = req.headers["user-agent"] || "";
      const parser = new UAParser(ua);
      const device = parser.getDevice().type || "desktop";
      const browser = parser.getBrowser().name || "unknown";
      const os = parser.getOS().name || "unknown";
      const referrer = String(
        req.headers.referer || req.headers.referrer || "",
      );
      const ip = req.ip;

      // Geo lookup - needed for smart rules; also stored with click
      let country = "",
        city = "";
      try {
        const geo = (await fetch(
          `http://ip-api.com/json/${ip}?fields=country,city,status`,
        ).then((r) => r.json())) as any;
        if (geo.status === "success") {
          country = geo.country;
          city = geo.city;
        }
      } catch {
        /* geo optional */
      }

      // Smart rules (Business plan)
      let destination = link.originalUrl;
      if (link.smartRules?.length) {
        for (const rule of link.smartRules) {
          if (rule.type === "device" && rule.value === device) {
            destination = rule.destination;
            break;
          }
          if (rule.type === "country" && rule.value === country) {
            destination = rule.destination;
            break;
          }
          if (rule.type === "os" && rule.value === os) {
            destination = rule.destination;
            break;
          }
        }
      }

      // Track click (fire-and-forget) - country/city already resolved above
      setImmediate(async () => {
        try {
          await Promise.all([
            clickRepo.create({
              linkId: link.id,
              userId: link.userId,
              ip,
              country,
              city,
              device,
              browser,
              os,
              referrer,
            }),
            linkRepo.incrementClick(link.id),
          ]);
          await redis.del(linkCacheKey(slug));
        } catch {
          /* non-critical */
        }
      });

      // Pixel injection
      if (link.pixelIds?.length) {
        const pixels = await pixelRepo.findByIds(link.pixelIds);
        if (pixels.length) {
          const scripts = pixels
            .map((p: any) => {
              if (p.type === "FACEBOOK")
                return `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${p.pixelId}');fbq('track','PageView');</script>`;
              if (p.type === "GOOGLE")
                return `<script async src="https://www.googletagmanager.com/gtag/js?id=${p.pixelId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${p.pixelId}');</script>`;
              return "";
            })
            .join("");
          return reply
            .type("text/html")
            .send(
              `<!DOCTYPE html><html><head>${scripts}<meta http-equiv="refresh" content="0;url=${destination}"></head><body><script>window.location.href="${destination}"</script></body></html>`,
            );
        }
      }

      return reply.redirect(301, destination);
    },
  );
}
