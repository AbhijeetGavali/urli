export function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function shortUrl(slug: string) {
  const domain = process.env.NEXT_PUBLIC_SHORT_DOMAIN || 'localhost:4000'
  return `${domain}/${slug}`
}

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}

export function isExpired(link: any) {
  if (!link.expiresAt) return false
  return new Date(link.expiresAt) < new Date()
}

export function isMaxed(link: any) {
  return link.maxClicks && link.clickCount >= link.maxClicks
}

export function getLinkStatus(link: any): 'active' | 'expired' | 'maxed' | 'inactive' {
  if (!link.isActive) return 'inactive'
  if (isExpired(link)) return 'expired'
  if (isMaxed(link)) return 'maxed'
  return 'active'
}

export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  expired: 'bg-amber-100 text-amber-700',
  maxed: 'bg-orange-100 text-orange-700',
  inactive: 'bg-gray-100 text-gray-500',
}
