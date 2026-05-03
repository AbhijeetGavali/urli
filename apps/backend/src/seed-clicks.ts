/**
 * Seed clicks for a link to populate analytics data.
 * Usage: npx tsx src/seed-clicks.ts --slug <slug> [--count 50]
 *
 * Creates realistic click data with varied countries, devices, referrers.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const args = process.argv.slice(2);
const get = (flag: string, def: string) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : def; };

const slug = get("--slug", "");
const count = Number(get("--count", "50"));

if (!slug) { console.error("Usage: npx tsx src/seed-clicks.ts --slug <slug> [--count 50]"); process.exit(1); }

// Real public IPs mapped to countries for geoip-lite to resolve correctly
const SAMPLE_IPS = [
  { ip: "8.8.8.8",        country: "US", city: "Mountain View" },
  { ip: "1.1.1.1",        country: "AU", city: "Sydney" },
  { ip: "103.21.244.0",   country: "IN", city: "Mumbai" },
  { ip: "185.60.216.35",  country: "GB", city: "London" },
  { ip: "31.13.64.35",    country: "DE", city: "Frankfurt" },
  { ip: "104.244.42.1",   country: "US", city: "San Francisco" },
  { ip: "202.12.27.33",   country: "JP", city: "Tokyo" },
  { ip: "196.207.0.1",    country: "KE", city: "Nairobi" },
  { ip: "200.160.0.1",    country: "BR", city: "São Paulo" },
  { ip: "194.0.0.1",      country: "FR", city: "Paris" },
]

const DEVICES   = ["desktop", "desktop", "desktop", "mobile", "mobile", "tablet"]
const BROWSERS  = ["Chrome", "Safari", "Firefox", "Chrome", "Safari", "Edge"]
const OS_LIST   = ["Windows", "macOS", "iOS", "Android", "Linux"]
const REFERRERS = [
  "", "", "",                          // direct (most common)
  "https://twitter.com",
  "https://instagram.com",
  "https://linkedin.com",
  "https://google.com",
  "https://t.co",
  "https://facebook.com",
]

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function randomDate(daysBack: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack))
  d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
  return d
}

async function main() {
  const link = await prisma.link.findUnique({ where: { slug } })
  if (!link) { console.error(`Link not found: ${slug}`); process.exit(1); }

  console.log(`Seeding ${count} clicks for /${slug} → ${link.originalUrl}`)

  const clicks = Array.from({ length: count }, () => {
    const geo = pick(SAMPLE_IPS)
    return {
      linkId:    link.id,
      userId:    link.userId,
      ip:        geo.ip,
      country:   geo.country,
      city:      geo.city,
      device:    pick(DEVICES),
      browser:   pick(BROWSERS),
      os:        pick(OS_LIST),
      referrer:  pick(REFERRERS),
      createdAt: randomDate(30),
    }
  })

  await prisma.click.createMany({ data: clicks })
  await prisma.link.update({ where: { id: link.id }, data: { clickCount: { increment: count } } })

  console.log(`✅ Created ${count} clicks. Visit /dashboard/analytics/${link.id} to see them.`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
