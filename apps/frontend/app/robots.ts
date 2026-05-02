export default function robots() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://urli.app'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/api/'] },
    sitemap: `${base}/sitemap.xml`,
  }
}
