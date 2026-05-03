import type { FastifyInstance } from "fastify";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { linkRepo } from "../repos/link.repo.js";
import { clickRepo } from "../repos/click.repo.js";
import { pixelRepo } from "../repos/misc.repo.js";
import { redis, linkCacheKey, LINK_CACHE_TTL } from "../lib/redis.js";

const PIXEL_CACHE_TTL = 3600; // 1 hour
const pixelCacheKey = (linkId: string) => `pixels:${linkId}`;

/** Append UTM params stored on the link to the destination URL */
function buildDestination(link: any): string {
  const utm: Record<string, string | undefined> = {
    utm_source: link.utmSource,
    utm_medium: link.utmMedium,
    utm_campaign: link.utmCampaign,
    utm_term: link.utmTerm,
    utm_content: link.utmContent,
  };
  const params = Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`);

  if (!params.length) return link.originalUrl;

  const sep = link.originalUrl.includes("?") ? "&" : "?";
  return `${link.originalUrl}${sep}${params.join("&")}`;
}

/** Resolve country from IP using local geoip-lite (no external HTTP call) */
function resolveGeo(ip: string) {
  try {
    return geoip.lookup(ip);
  } catch {
    return null;
  }
}

/** Build pixel script tags + noscript fallbacks */
function buildPixelScripts(pixels: any[]): string {
  return pixels
    .map((p: any) => {
      if (p.type === "FACEBOOK") {
        return (
          `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${p.pixelId}');fbq('track','PageView');</script>` +
          // Gap 5: noscript img fallback
          `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${p.pixelId}&ev=PageView&noscript=1"/></noscript>`
        );
      }
      if (p.type === "GOOGLE") {
        return `<script async src="https://www.googletagmanager.com/gtag/js?id=${p.pixelId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${p.pixelId}');</script>`;
      }
      return "";
    })
    .join("");
}

export async function redirectRoute(app: FastifyInstance) {
  app.get(
    "/:slug",
    {
      config: {
        cors: {
          origin: true, // allow all origins ONLY here
        },
        rateLimit: { max: 60, timeWindow: "1 minute" },
      },
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
      if (link.expiresAt && new Date(link.expiresAt) < new Date())
        return reply.redirect(
          302,
          `${process.env.FRONTEND_URL}/expired?slug=${slug}`,
        );

      if (link.maxClicks && link.clickCount >= link.maxClicks)
        return reply.redirect(
          302,
          `${process.env.FRONTEND_URL}/expired?slug=${slug}`,
        );

      // Parse UA
      const ua = req.headers["user-agent"] || "";
      const parser = new UAParser(ua);
      const device = parser.getDevice().type || "desktop";
      const browser = parser.getBrowser().name || "unknown";
      const os = parser.getOS().name || "unknown";
      const referrer = String(
        req.headers.referer || req.headers.referrer || "",
      );
      const ip = req.ip;
      // In dev, req.ip is 127.0.0.1 - use a real public IP so geoip resolves
      const resolvedIp =
        ip === "127.0.0.1" ||
        ip === "::1" ||
        ip.startsWith("192.168.") ||
        ip.startsWith("10.")
          ? "103.21.244.0" // India (Mumbai) - change to your actual IP for accurate local testing
          : ip;

      // Geo lookup - local, synchronous, no external HTTP
      const geoResult = resolveGeo(resolvedIp);
      const country = geoResult?.country ?? "";
      const city = (geoResult as any)?.city ?? "";

      // Smart rules (Business plan)
      let destination = buildDestination(link);
      if (link.smartRules?.length) {
        for (const rule of link.smartRules) {
          if (
            (rule.type === "device" && rule.value === device) ||
            (rule.type === "country" && rule.value === country) ||
            (rule.type === "os" && rule.value === os)
          ) {
            destination = rule.destination;
            break;
          }
        }
      }

      // Track click fire-and-forget
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
        // Gap 9: skip pixel injection if link owner is on FREE plan (downgrade case)
        const ownerPlan = link.user?.plan ?? link.ownerPlan;
        if (ownerPlan === "FREE") {
          return reply.redirect(301, destination);
        }

        // Gap 3: cache pixel records to avoid per-redirect DB hit
        let pixels: any[];
        const cachedPixels = await redis.get(pixelCacheKey(link.id));
        if (cachedPixels) {
          pixels = JSON.parse(cachedPixels);
        } else {
          // Gap 4: fetch only pixels that belong to the link owner
          pixels = await pixelRepo.findByIdsAndUser(link.pixelIds, link.userId);
          await redis.setex(
            pixelCacheKey(link.id),
            PIXEL_CACHE_TTL,
            JSON.stringify(pixels),
          );
        }

        if (pixels.length) {
          const scripts = buildPixelScripts(pixels);
          // Gap 2: loading indicator while pixel scripts fire + redirect
          return reply
            .type("text/html")
            .send(
              `<!DOCTYPE html><html><head>${scripts}<meta http-equiv="refresh" content="0;url=${destination}"></head><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#6b7280;font-size:14px"><span>Redirecting…</span><script>window.location.href="${destination}"</script></body></html>`,
            );
        }
      }

      return reply.redirect(301, destination);
    },
  );
}
