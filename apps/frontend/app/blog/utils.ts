export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  author: { name: string; role: string; avatar: string };
  toc: { id: string; title: string }[];
  coverImage: string;
}

const AUTHOR = {
  name: "Arjun Mehta",
  role: "Head of Growth, Urli",
  avatar: "AM",
};

export const POSTS: Post[] = [
  {
    slug: "bitly-alternative-free",
    title: "Bitly Showing Ads on Your Links? 7 Better Alternatives in 2025",
    description:
      "Bitly now shows a full-page ad before redirecting your visitors - killing your click-through rates. Here are 7 alternatives that never show ads, including one at ₹999/mo with features Bitly charges ₹16,000/mo for.",
    date: "May 2, 2025",
    readTime: "10 min read",
    category: "Comparisons",
    keywords: [
      "bitly alternative",
      "bitly alternative free",
      "free url shortener no ads",
      "bitly showing ads",
      "url shortener without ads india",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "why-leaving", title: "Why Bitly users are leaving in 2025" },
      { id: "alternatives", title: "7 best alternatives compared" },
      { id: "what-to-look-for", title: "What to look for in a shortener" },
      { id: "pricing-comparison", title: "Pricing comparison table" },
      { id: "verdict", title: "Which one should you use?" },
    ],
  },
  {
    slug: "url-shortener-with-analytics",
    title:
      "Which URL Shortener Actually Shows You Who Clicked? (2025 Comparison)",
    description:
      "Most URL shorteners only show total clicks. You need country, device, referrer, and time-series data to make real decisions. Here's which tools actually deliver - and which ones hide the data behind paywalls.",
    date: "May 1, 2025",
    readTime: "12 min read",
    category: "Guides",
    keywords: [
      "url shortener with analytics",
      "link click tracking",
      "url shortener that shows location",
      "track who clicked my link",
      "best url shortener analytics india",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "why-basic-counts", title: 'Why "total clicks" is useless' },
      {
        id: "what-good-looks-like",
        title: "What real link analytics looks like",
      },
      { id: "use-analytics", title: "How to use data to improve campaigns" },
      { id: "tools-comparison", title: "Tool-by-tool comparison" },
    ],
  },
  {
    slug: "etsy-seller-link-tracking",
    title:
      "How to Find Out Which Social Platform Actually Drives Your Etsy Sales",
    description:
      "You're posting on Pinterest, Instagram, and TikTok - but which one is actually sending buyers? Here's the exact UTM + URL shortener setup Etsy sellers use to track every sale back to its source.",
    date: "Apr 30, 2025",
    readTime: "9 min read",
    category: "Etsy",
    keywords: [
      "etsy link tracking",
      "track etsy traffic source",
      "etsy utm tracking",
      "which social media drives etsy sales",
      "url shortener for etsy sellers",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "problem", title: "Why Etsy's built-in stats lie to you" },
      { id: "solution", title: "The UTM + short link solution" },
      { id: "utm-setup", title: "Step-by-step UTM setup for Etsy" },
      { id: "retargeting", title: "Bonus: retarget everyone who clicks" },
      { id: "step-by-step", title: "Full setup walkthrough" },
    ],
  },
  {
    slug: "custom-url-shortener",
    title:
      "Why bit.ly Links Look Spammy (And How to Use Your Own Domain Instead)",
    description:
      "Generic short links like bit.ly/3xK9mP get blocked by spam filters and look untrustworthy. Custom branded links like go.yourbrand.com get 34% more clicks. Here's how to set one up in 5 minutes.",
    date: "Apr 28, 2025",
    readTime: "8 min read",
    category: "Guides",
    keywords: [
      "custom url shortener",
      "branded short links",
      "custom domain url shortener",
      "own domain url shortener",
      "white label url shortener india",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "problem", title: "Why generic short links hurt conversions" },
      { id: "benefits", title: "What branded links actually do for you" },
      { id: "setup", title: "How to connect your own domain (5 min)" },
      { id: "goo-gl-lesson", title: "The goo.gl shutdown lesson" },
    ],
  },
  {
    slug: "retargeting-pixels-url-shortener",
    title: "How to Retarget People Who Click Your Amazon or Affiliate Links",
    description:
      "You can't put a Facebook pixel on Amazon's domain. But you can put one on your short link - so every person who clicks gets added to your retargeting audience. Here's the exact setup, including for affiliate links.",
    date: "Apr 26, 2025",
    readTime: "11 min read",
    category: "Marketing",
    keywords: [
      "retargeting pixel url shortener",
      "facebook pixel affiliate link",
      "retarget amazon link clicks",
      "add pixel to short link",
      "url shortener with facebook pixel",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80&auto=format&fit=crop",
    toc: [
      {
        id: "problem",
        title: "Why you can't pixel third-party links directly",
      },
      {
        id: "how-it-works",
        title: "How pixel injection through short links works",
      },
      { id: "setup", title: "Setting up FB + Google pixels in Urli" },
      { id: "use-cases", title: "Real use cases: affiliate, Amazon, Etsy" },
      { id: "roi", title: "What ROI to expect" },
    ],
  },
  {
    slug: "utm-parameters-guide",
    title:
      "Your GA4 Traffic Sources Are Wrong - Here's How to Fix Them With UTMs",
    description:
      'If your team uses "Email", "email", and "EMAIL" as utm_source values, GA4 treats them as three different channels. Here\'s how to enforce UTM standards with templates so your attribution data is actually trustworthy.',
    date: "Apr 24, 2025",
    readTime: "13 min read",
    category: "Marketing",
    keywords: [
      "utm parameters guide",
      "fix ga4 attribution",
      "utm template builder",
      "utm tracking best practices",
      "ga4 utm source medium campaign",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "what-are-utm", title: "What UTM parameters actually do" },
      { id: "chaos-problem", title: "Why your GA4 data is probably wrong" },
      { id: "fix-with-templates", title: "How UTM templates fix attribution" },
      { id: "best-practices", title: "UTM naming conventions that scale" },
      { id: "ga4-setup", title: "Verifying UTMs in GA4" },
    ],
  },
  {
    slug: "link-expiry-use-cases",
    title:
      "How to Make a Link Expire Automatically (Flash Sales, Events, Promos)",
    description:
      "A flash sale link that stays live after the sale ends costs real money. A conference link that still works 6 months later looks unprofessional. Here's how to set links to expire by date or click count - and what to show after.",
    date: "Apr 22, 2025",
    readTime: "8 min read",
    category: "Features",
    keywords: [
      "expiring url link",
      "link that expires automatically",
      "time limited url",
      "url shortener with expiry",
      "how to make a link expire",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "why-matters", title: "The real cost of links that don't expire" },
      { id: "use-cases", title: "7 situations where expiry saves you" },
      { id: "how-to-set", title: "How to set expiry in Urli" },
      { id: "expired-page", title: "What to show after a link expires" },
    ],
  },
  {
    slug: "linktree-alternative",
    title: "Stop Paying for Linktree - Get a Better Link-in-Bio Page for Free",
    description:
      "Linktree charges ₹750/mo for a page with 5 links and their branding on it. You can get a fully custom link-in-bio page on your own domain - with analytics - included in a URL shortener you're already paying for.",
    date: "Apr 20, 2025",
    readTime: "8 min read",
    category: "Comparisons",
    keywords: [
      "linktree alternative free",
      "link in bio page own domain",
      "linktree vs urli",
      "free linktree alternative india",
      "link in bio with analytics",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&auto=format&fit=crop",
    toc: [
      {
        id: "linktree-problem",
        title: "What you're actually paying Linktree for",
      },
      { id: "what-you-need", title: "What a good bio page actually needs" },
      {
        id: "comparison",
        title: "Urli bio page vs Linktree: feature comparison",
      },
      { id: "setup", title: "Setting up your bio page in 3 minutes" },
    ],
  },
  {
    slug: "utm-builder-guide",
    title: "The Only UTM Builder Guide You'll Ever Need (Stop Guessing Where Your Traffic Comes From)",
    description:
      "Most marketers use UTM parameters wrong — inconsistent naming, missing fields, and no templates. Here's the complete guide to building UTM links that give you clean, trustworthy attribution data in GA4.",
    date: "May 3, 2025",
    readTime: "9 min read",
    category: "Marketing",
    keywords: [
      "utm builder",
      "utm link generator",
      "utm parameters explained",
      "utm tracking google analytics",
      "utm builder free tool",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "what-are-utms", title: "What UTM parameters actually are" },
      { id: "the-mess", title: "Why most teams have broken attribution" },
      { id: "five-params", title: "The 5 UTM parameters explained" },
      { id: "naming-rules", title: "Naming rules that scale across teams" },
      { id: "utm-builder", title: "Using a UTM builder to enforce consistency" },
      { id: "ga4-check", title: "Verifying your UTMs in GA4" },
    ],
  },
  {
    slug: "pixel-retargeting-guide",
    title: "How to Retarget Anyone Who Clicks Your Links (Even Amazon, Affiliate & Bio Links)",
    description:
      "You can't put a Facebook or Google pixel on Amazon's domain. But you can fire it from your short link — so every click builds your retargeting audience automatically. Here's the complete setup guide.",
    date: "May 3, 2025",
    readTime: "10 min read",
    category: "Marketing",
    keywords: [
      "pixel retargeting",
      "retargeting pixel url shortener",
      "facebook pixel affiliate link",
      "retarget link clicks",
      "google ads retargeting short link",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-problem", title: "Why you can't pixel third-party pages" },
      { id: "how-it-works", title: "How pixel injection through short links works" },
      { id: "facebook-setup", title: "Setting up Facebook Pixel retargeting" },
      { id: "google-setup", title: "Setting up Google Ads retargeting" },
      { id: "use-cases", title: "Real use cases: affiliate, Amazon, bio links" },
      { id: "roi", title: "What ROI to expect from link retargeting" },
    ],
  },
  {
    slug: "bio-page-linktree-alternative",
    title: "Why Your Linktree Bio Page Is Costing You Followers (And What to Use Instead)",
    description:
      "Linktree charges ₹750/mo for a page with their branding on it, no analytics per link, and no custom domain. Here's how to build a better link-in-bio page that you actually own — for free.",
    date: "May 3, 2025",
    readTime: "8 min read",
    category: "Comparisons",
    keywords: [
      "linktree alternative",
      "link in bio page",
      "free linktree alternative",
      "bio page own domain",
      "linktree vs alternatives 2025",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "linktree-problem", title: "The real cost of Linktree" },
      { id: "what-you-lose", title: "What you lose by using Linktree" },
      { id: "what-good-looks-like", title: "What a great bio page actually needs" },
      { id: "templates", title: "Choosing the right template for your audience" },
      { id: "sections", title: "Using sections to build a richer bio page" },
      { id: "setup", title: "Setting up your bio page in 5 minutes" },
    ],
  },
  {
    slug: "qr-code-generator-dynamic",
    title:
      "Printed QR Codes That You Can Edit Later - How Dynamic QR Codes Work",
    description:
      "Static QR codes are permanent - if the URL changes, you reprint everything. Dynamic QR codes let you change the destination after printing. Here's when this matters and how to create them for free.",
    date: "Apr 18, 2025",
    readTime: "9 min read",
    category: "Features",
    keywords: [
      "dynamic qr code generator",
      "editable qr code",
      "qr code that can be changed",
      "free dynamic qr code india",
      "qr code with analytics",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&q=80&auto=format&fit=crop",
    toc: [
      {
        id: "static-vs-dynamic",
        title: "Static vs dynamic QR codes: the key difference",
      },
      {
        id: "when-saves-money",
        title: "When dynamic QR codes save real money",
      },
      {
        id: "analytics",
        title: "Tracking QR code scans by location and device",
      },
      { id: "setup", title: "Creating a dynamic QR code in Urli" },
    ],
  },
  {
    slug: "url-shortener-for-newsletters",
    title:
      "Why Your Newsletter Links Are Getting Flagged as Spam (And How to Fix It)",
    description:
      "bit.ly and tinyurl.com links in emails trigger spam filters because spammers use them too. Branded short links on your own domain get delivered, look trustworthy, and let you track exactly which links your subscribers click.",
    date: "Apr 16, 2025",
    readTime: "10 min read",
    category: "Guides",
    keywords: [
      "url shortener for email newsletters",
      "newsletter links spam filter",
      "track newsletter link clicks",
      "branded links email marketing",
      "best url shortener for email",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&q=80&auto=format&fit=crop",
    toc: [
      {
        id: "why-trackable",
        title: "Why generic short links hurt email deliverability",
      },
      { id: "what-you-need", title: "What newsletter creators actually need" },
      { id: "setup", title: "Setting up branded links for your newsletter" },
      { id: "advanced", title: "Advanced: retarget your newsletter readers" },
    ],
  },
];

export function getAllPosts() {
  return POSTS;
}
export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
