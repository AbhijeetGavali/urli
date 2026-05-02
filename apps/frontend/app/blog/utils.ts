export interface Post {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  keywords: string[]
  author: { name: string; role: string; avatar: string }
  toc: { id: string; title: string }[]
  coverImage: string
}

const AUTHOR = { name: 'Arjun Mehta', role: 'Head of Growth, Urli', avatar: 'AM' }

export const POSTS: Post[] = [
  {
    slug: 'bitly-alternative-free',
    title: 'Best Free Bitly Alternatives in 2025 (No Ads, No Limits)',
    description: 'Bitly started showing ads on free links in 2025. Here are the best alternatives that respect your audience and your budget.',
    date: 'May 2, 2025', readTime: '10 min read', category: 'Comparisons',
    keywords: ['bitly alternative', 'bitly alternative free', 'free url shortener no ads'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'why-leaving', title: 'Why people are leaving Bitly' },
      { id: 'alternatives', title: 'Best alternatives in 2025' },
      { id: 'what-to-look-for', title: 'What to look for' },
      { id: 'pricing-comparison', title: 'Pricing comparison' },
      { id: 'verdict', title: 'Verdict' },
    ],
  },
  {
    slug: 'url-shortener-with-analytics',
    title: 'URL Shorteners with Analytics: The Complete Guide for 2025',
    description: 'Not all URL shorteners track the same data. Here\'s what click analytics should include and which tools actually deliver.',
    date: 'May 1, 2025', readTime: '12 min read', category: 'Guides',
    keywords: ['url shortener with analytics', 'link analytics', 'click tracking url shortener'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'why-basic-counts', title: 'Why basic click counts aren\'t enough' },
      { id: 'what-good-looks-like', title: 'What good analytics looks like' },
      { id: 'use-analytics', title: 'How to use analytics to improve campaigns' },
      { id: 'tools-comparison', title: 'Tools comparison' },
    ],
  },
  {
    slug: 'etsy-seller-link-tracking',
    title: 'How Etsy Sellers Can Track Which Platform Drives Sales (2025 Guide)',
    description: 'Pinterest, Instagram, TikTok — which one actually drives your Etsy sales? Here\'s the exact system to find out.',
    date: 'Apr 30, 2025', readTime: '9 min read', category: 'Etsy',
    keywords: ['link shortener for etsy sellers', 'etsy traffic tracking', 'etsy analytics'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'problem', title: 'The Etsy seller\'s traffic problem' },
      { id: 'solution', title: 'The URL shortener solution' },
      { id: 'utm-setup', title: 'Setting up UTM tracking' },
      { id: 'retargeting', title: 'The retargeting bonus' },
      { id: 'step-by-step', title: 'Step-by-step setup' },
    ],
  },
  {
    slug: 'custom-url-shortener',
    title: 'Why You Need a Custom URL Shortener (And How to Set One Up in 5 Minutes)',
    description: 'Generic short links look spammy and die when vendors shut down. Custom branded links build trust and last forever.',
    date: 'Apr 28, 2025', readTime: '8 min read', category: 'Guides',
    keywords: ['custom url shortener', 'branded short links', 'custom domain url shortener'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'problem', title: 'Why generic links hurt your brand' },
      { id: 'benefits', title: 'What a custom shortener gives you' },
      { id: 'setup', title: 'How to set up a custom domain' },
      { id: 'goo-gl-lesson', title: 'The goo.gl lesson' },
    ],
  },
  {
    slug: 'retargeting-pixels-url-shortener',
    title: 'How to Add Retargeting Pixels to Any Link (Even Amazon Affiliate Links)',
    description: 'You can\'t add a Facebook pixel to Amazon\'s domain — but you can add one to your short link. Here\'s exactly how.',
    date: 'Apr 26, 2025', readTime: '11 min read', category: 'Marketing',
    keywords: ['retargeting pixels url shortener', 'facebook pixel short link', 'url shortener retargeting'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'problem', title: 'The retargeting problem' },
      { id: 'how-it-works', title: 'How pixel injection works' },
      { id: 'setup', title: 'Setting up pixels in Urli' },
      { id: 'use-cases', title: 'Real use cases' },
      { id: 'roi', title: 'Expected ROI' },
    ],
  },
  {
    slug: 'utm-parameters-guide',
    title: 'UTM Parameters: The Complete Guide for Marketers (With Templates)',
    description: 'UTM chaos is killing your GA4 data. Here\'s how to standardize UTM parameters across your team and fix attribution forever.',
    date: 'Apr 24, 2025', readTime: '13 min read', category: 'Marketing',
    keywords: ['utm parameters', 'utm builder', 'utm template', 'ga4 utm tracking'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'what-are-utm', title: 'What are UTM parameters?' },
      { id: 'chaos-problem', title: 'The UTM chaos problem' },
      { id: 'fix-with-templates', title: 'Fix with templates' },
      { id: 'best-practices', title: 'UTM best practices' },
      { id: 'ga4-setup', title: 'GA4 setup guide' },
    ],
  },
  {
    slug: 'link-expiry-use-cases',
    title: '7 Use Cases for Link Expiration (Flash Sales, Events, and More)',
    description: 'Auto-expiring links prevent embarrassing situations. Here are 7 real use cases where link expiry saves the day.',
    date: 'Apr 22, 2025', readTime: '8 min read', category: 'Features',
    keywords: ['link expiration', 'expiring url', 'time limited link', 'url shortener expiry'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'why-matters', title: 'Why link expiration matters' },
      { id: 'use-cases', title: '7 use cases' },
      { id: 'how-to-set', title: 'How to set link expiration' },
      { id: 'expired-page', title: 'Custom expired page' },
    ],
  },
  {
    slug: 'linktree-alternative',
    title: 'Linktree Alternatives: Get a Link-in-Bio Page for Free (2025)',
    description: 'Why pay $9/mo for Linktree when you can get a link-in-bio page included with your URL shortener?',
    date: 'Apr 20, 2025', readTime: '8 min read', category: 'Comparisons',
    keywords: ['linktree alternative', 'link in bio page', 'free linktree alternative'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'linktree-problem', title: 'The Linktree pricing problem' },
      { id: 'what-you-need', title: 'What a bio page needs' },
      { id: 'comparison', title: 'Urli vs Linktree' },
      { id: 'setup', title: 'Setting up your bio page' },
    ],
  },
  {
    slug: 'qr-code-generator-dynamic',
    title: 'Dynamic QR Codes: Change the Destination Without Reprinting (Complete Guide)',
    description: 'Static QR codes are a trap. Dynamic QR codes let you update the destination after printing — here\'s why that matters.',
    date: 'Apr 18, 2025', readTime: '9 min read', category: 'Features',
    keywords: ['dynamic qr code', 'qr code generator', 'editable qr code'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'static-vs-dynamic', title: 'Static vs dynamic QR codes' },
      { id: 'when-saves-money', title: 'When dynamic QR codes save money' },
      { id: 'analytics', title: 'QR code analytics' },
      { id: 'setup', title: 'Creating dynamic QR codes' },
    ],
  },
  {
    slug: 'url-shortener-for-newsletters',
    title: 'The Best URL Shortener for Newsletter Creators (2025 Guide)',
    description: 'Newsletter creators need trackable links that don\'t look spammy. Here\'s what to look for and which tools deliver.',
    date: 'Apr 16, 2025', readTime: '10 min read', category: 'Guides',
    keywords: ['url shortener for newsletters', 'newsletter link tracking', 'email link shortener'],
    author: AUTHOR,
    coverImage: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&q=80&auto=format&fit=crop',
    toc: [
      { id: 'why-trackable', title: 'Why newsletter creators need trackable links' },
      { id: 'what-you-need', title: 'What to look for' },
      { id: 'setup', title: 'Setting up link tracking' },
      { id: 'advanced', title: 'Advanced: retargeting from newsletters' },
    ],
  },
]

export function getAllPosts() { return POSTS }
export function getPost(slug: string) { return POSTS.find(p => p.slug === slug) }
