import { POSTS } from './blog/utils'

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://urli.ideasprout.in'
  const staticPages = ['', '/pricing', '/blog', '/login', '/register'].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))
  const legalPages = ['/privacy', '/terms', '/cookies', '/refund', '/account-deletion'].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
  const blogPages = POSTS.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  return [...staticPages, ...legalPages, ...blogPages]
}
