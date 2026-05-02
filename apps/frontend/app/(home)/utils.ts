export const FEATURES = [
  { icon: '⚡', title: 'One-click shortening', desc: 'Paste any URL, get a clean short link instantly. Custom slugs supported.' },
  { icon: '📊', title: 'Deep analytics', desc: 'Country, device, browser, referrer — tracked forever on paid plans.' },
  { icon: '🎯', title: 'Retargeting pixels', desc: 'Attach Facebook or Google pixels to any link. Build audiences from every click.' },
  { icon: '⏰', title: 'Link expiry', desc: 'Set links to expire by date or click count. Perfect for flash sales.' },
  { icon: '🏷️', title: 'UTM templates', desc: 'Enforce UTM standards across your team. No more messy GA4 data.' },
  { icon: '🌐', title: 'Link-in-bio page', desc: 'Replace Linktree. Build a bio page on your own domain, included in Pro.' },
  { icon: '🔀', title: 'Smart redirects', desc: 'Route US visitors to USD pricing, mobile users to App Store.' },
  { icon: '📱', title: 'Dynamic QR codes', desc: 'Change the destination after printing. Never reprint a QR code again.' },
]

export const TESTIMONIALS = [
  { name: 'Maria K.', role: 'Etsy Shop Owner', avatar: 'MK', text: 'Finally a tool that fits between Bitly free and their $199 plan. I track every Pinterest pin for $15/mo.' },
  { name: 'James T.', role: 'Newsletter Creator', avatar: 'JT', text: 'Switched from Bitly after they started showing ads on my links. Urli is cleaner and cheaper.' },
  { name: 'Priya S.', role: 'Digital Marketer', avatar: 'PS', text: 'The link expiry feature alone saved a client relationship. Flash sale links now auto-expire.' },
]

export const STATS = [
  { value: '$1.1B', label: 'Market size 2026', sub: '↑ 15% CAGR' },
  { value: '95%', label: 'B2B marketers use short links', sub: 'Paid intent' },
  { value: '585%', label: 'Bitly free→premium jump', sub: 'Your opening' },
  { value: '30 days', label: 'Free trial', sub: 'No card needed' },
]

export const COMPARISON = [
  ['No ads / interstitials', false, true, true],
  ['Link expiration', false, false, true],
  ['UTM template builder', false, false, true],
  ['Retargeting pixels', false, false, true],
  ['Link-in-bio page', false, false, true],
  ['Forever analytics', false, true, true],
  ['Custom domain', false, true, true],
  ['Smart redirects', false, false, true],
]

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Urli',
  applicationCategory: 'BusinessApplication',
  offers: { '@type': 'Offer', price: '15', priceCurrency: 'USD' },
  description: 'Smart URL shortener with analytics, retargeting pixels, UTM templates, and link-in-bio.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://urli.app',
}
