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
  // ── May 1–15 batch ──────────────────────────────────────────────────────────
  {
    slug: "rebrandly-vs-urli",
    title: "Rebrandly vs Urli: Is Rebrandly Worth 5× the Price?",
    description:
      "Rebrandly starts at ₹2,000/mo and caps you at 25 links and 5,000 tracked clicks. Urli Pro is ₹999/mo with no caps, plus retargeting pixels and link expiry that Rebrandly doesn't offer at any price.",
    date: "May 1, 2025",
    readTime: "8 min read",
    category: "Comparisons",
    keywords: [
      "rebrandly alternative",
      "rebrandly vs urli",
      "rebrandly pricing india",
      "url shortener comparison 2025",
      "best rebrandly alternative",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "overview", title: "What you actually get from each tool" },
      { id: "pricing", title: "Pricing comparison" },
      { id: "features", title: "Feature-by-feature breakdown" },
      { id: "verdict", title: "When to choose which" },
    ],
  },
  {
    slug: "link-click-tracking-guide",
    title: "How to Track Who Clicks Your Links (Country, Device, Referrer)",
    description:
      "Total clicks is a vanity metric. Real link analytics shows you country, device, referrer, and time-of-click data. Here's how to set up proper click tracking and actually use the data to improve your campaigns.",
    date: "May 2, 2025",
    readTime: "9 min read",
    category: "Analytics",
    keywords: [
      "link click tracking",
      "track who clicked my link",
      "url analytics country device",
      "link tracking guide",
      "how to track link clicks",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "problem", title: 'Why "500 clicks" tells you nothing' },
      { id: "what-to-track", title: "The 6 dimensions of click data that matter" },
      { id: "setup", title: "Setting up click tracking in 3 steps" },
      { id: "advanced", title: "Combining click data with conversion data" },
    ],
  },
  {
    slug: "utm-tracking-for-instagram",
    title: "Why Your Instagram Traffic Shows as 'Direct' in GA4 (And How to Fix It)",
    description:
      "Instagram strips referrer data, so most of your Instagram traffic shows up as 'Direct' in GA4. UTM-tagged short links fix this. Here's the exact setup for bio links, stories, and reels.",
    date: "May 3, 2025",
    readTime: "8 min read",
    category: "UTM",
    keywords: [
      "instagram utm tracking",
      "instagram traffic ga4",
      "utm parameters instagram",
      "track instagram bio link clicks",
      "instagram direct traffic fix",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "problem", title: "Why Instagram shows as Direct in GA4" },
      { id: "fix", title: "The UTM fix for Instagram tracking" },
      { id: "stories", title: "Tracking Instagram Stories separately" },
      { id: "step-by-step", title: "Step-by-step setup" },
    ],
  },
  {
    slug: "facebook-pixel-link-shortener",
    title: "How to Fire Your Facebook Pixel on Every Link You Share (Not Just Your Website)",
    description:
      "Your Facebook pixel only fires on your website. But what about links in WhatsApp, email, and Instagram bio? Attach your pixel to short links and build retargeting audiences from every click — anywhere.",
    date: "May 4, 2025",
    readTime: "10 min read",
    category: "Retargeting",
    keywords: [
      "facebook pixel short link",
      "fire pixel on link click",
      "retargeting pixel url shortener",
      "facebook pixel whatsapp link",
      "pixel injection short link",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-gap", title: "The retargeting gap most marketers miss" },
      { id: "solution", title: "How short links fix the pixel gap" },
      { id: "setup", title: "Attaching your Facebook pixel to short links" },
      { id: "campaign", title: "Building your first retargeting campaign" },
    ],
  },
  {
    slug: "link-expiry-flash-sales",
    title: "How to Make Sale Links Expire Automatically (So You Never Forget to Turn Them Off)",
    description:
      "A flash sale link that stays live after the sale ends can cost you lakhs in unintended discounts. Set links to expire by date or click count — automatically, with a custom redirect after expiry.",
    date: "May 5, 2025",
    readTime: "8 min read",
    category: "Link Expiry",
    keywords: [
      "link expiry flash sale",
      "auto expire url",
      "time limited link",
      "url shortener with expiry date",
      "expiring link for sale",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-problem", title: "The ₹3,30,000 mistake a timer would have prevented" },
      { id: "how-expiry-works", title: "How link expiration works" },
      { id: "expired-redirect", title: "What happens after a link expires" },
      { id: "use-cases", title: "5 campaigns that need expiring links" },
      { id: "setup", title: "Setting up expiring links in Urli" },
    ],
  },
  {
    slug: "branded-short-links-custom-domain",
    title: "Why bit.ly Links Get Blocked by Spam Filters (And How to Use Your Own Domain)",
    description:
      "Generic short link domains are flagged by spam filters because spammers use them. Branded links on your own domain get delivered, get clicked 34% more, and survive vendor shutdowns. Here's the 5-minute setup.",
    date: "May 6, 2025",
    readTime: "9 min read",
    category: "Custom Domain",
    keywords: [
      "branded short links",
      "custom domain url shortener",
      "bit.ly spam filter",
      "own domain short link",
      "branded links email deliverability",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "trust-gap", title: "The trust gap between bit.ly and your domain" },
      { id: "vendor-risk", title: "The vendor lock-in risk you're ignoring" },
      { id: "setup", title: "Setting up a custom domain in 5 minutes" },
      { id: "seo", title: "Does a custom short domain help SEO?" },
    ],
  },
  {
    slug: "qr-codes-for-restaurants",
    title: "Dynamic QR Codes for Restaurants: Update Your Menu Without Reprinting",
    description:
      "Static QR codes break when your URL changes. Dynamic QR codes let you update the destination without reprinting anything. Here's how restaurants, retailers, and event organizers use them to save money.",
    date: "May 7, 2025",
    readTime: "9 min read",
    category: "QR Codes",
    keywords: [
      "dynamic qr code restaurant",
      "qr code menu update",
      "editable qr code",
      "qr code without reprinting",
      "dynamic qr code india",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-reprint-problem", title: "Why restaurants keep reprinting menus" },
      { id: "dynamic-solution", title: "Dynamic QR codes: change destination, keep the code" },
      { id: "analytics", title: "What QR code analytics tell you" },
      { id: "beyond-restaurants", title: "6 more QR code use cases" },
      { id: "setup", title: "Creating dynamic QR codes in Urli" },
    ],
  },
  {
    slug: "instagram-bio-link-strategy",
    title: "The Instagram Bio Link Strategy That Actually Converts (Not Just a List of Links)",
    description:
      "Most creators waste their Instagram bio link on a homepage that converts nobody. Here's how to build a focused bio page with per-link analytics and retargeting pixels that turns followers into customers.",
    date: "May 8, 2025",
    readTime: "8 min read",
    category: "Bio Page",
    keywords: [
      "instagram bio link strategy",
      "link in bio instagram",
      "instagram bio page",
      "convert instagram followers",
      "best link in bio tool",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "one-link-problem", title: 'Why "one link in bio" is a conversion killer' },
      { id: "what-works", title: "What a high-converting bio page looks like" },
      { id: "tracking", title: "Tracking which bio links your audience clicks" },
      { id: "retargeting", title: "Turning bio page visitors into ad audiences" },
      { id: "setup", title: "Setting up your bio page" },
    ],
  },
  {
    slug: "affiliate-link-management",
    title: "How to Manage 50+ Affiliate Links Without Losing Your Mind",
    description:
      "Affiliate URLs change. Products get discontinued. Links break. Here's how to use short links as a management layer so you update once and every place you've shared the link is automatically fixed.",
    date: "May 9, 2025",
    readTime: "9 min read",
    category: "Affiliate",
    keywords: [
      "affiliate link management",
      "manage affiliate links",
      "affiliate link tracker",
      "affiliate link shortener",
      "track affiliate link clicks",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-mess", title: "The affiliate link management problem" },
      { id: "short-links-solution", title: "How short links solve affiliate management" },
      { id: "tracking", title: "Tracking which channels drive affiliate revenue" },
      { id: "pixels", title: "Building retargeting audiences from affiliate clicks" },
      { id: "setup", title: "Setting up affiliate link management in Urli" },
    ],
  },
  {
    slug: "social-media-link-tracking",
    title: "Which Social Platform Actually Drives Your Traffic? (How to Find Out)",
    description:
      "Without per-platform link tracking, you're guessing which social channel works. Here's how to set up one-link-per-platform tracking so GA4 shows you exactly where your traffic — and revenue — comes from.",
    date: "May 10, 2025",
    readTime: "8 min read",
    category: "Social Media",
    keywords: [
      "social media link tracking",
      "track social media traffic",
      "which social platform drives traffic",
      "social media utm tracking",
      "per platform link analytics",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-attribution-problem", title: "The social media attribution problem" },
      { id: "one-link-per-platform", title: "The one-link-per-platform rule" },
      { id: "what-data-reveals", title: "What the data usually reveals" },
      { id: "setup", title: "Setting up social media link tracking" },
    ],
  },
  {
    slug: "shopify-url-shortener",
    title: "How Shopify Sellers Use Short Links to Track Which Campaigns Drive Sales",
    description:
      "Shopify's built-in analytics show total sales, not which campaign drove them. UTM-tagged short links connect your Instagram, email, and WhatsApp campaigns to actual revenue in GA4.",
    date: "May 11, 2025",
    readTime: "9 min read",
    category: "E-commerce",
    keywords: [
      "shopify url shortener",
      "shopify link tracking",
      "shopify utm tracking",
      "track shopify sales by channel",
      "shopify short link",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "shopify-link-problem", title: "Why Shopify product URLs are terrible for sharing" },
      { id: "campaign-tracking", title: "Tracking which campaigns drive Shopify sales" },
      { id: "retargeting", title: "Retargeting Shopify visitors from social links" },
      { id: "link-expiry", title: "Using link expiry for Shopify flash sales" },
      { id: "setup", title: "Setting up Shopify link tracking in Urli" },
    ],
  },
  {
    slug: "url-shortener-api-developers",
    title: "URL Shortener API for Developers: Create and Track Links Programmatically",
    description:
      "Manual link creation doesn't scale. Urli's REST API lets you create, update, and track short links from your application — with UTM params, expiry, and pixel support built in.",
    date: "May 12, 2025",
    readTime: "10 min read",
    category: "API",
    keywords: [
      "url shortener api",
      "link shortener api rest",
      "programmatic url shortener",
      "url shortener api india",
      "create short links api",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "why-api", title: "Why developers need a URL shortener API" },
      { id: "urli-api", title: "Urli's REST API: what you get" },
      { id: "quick-start", title: "Quick start: create a short link via API" },
      { id: "api-keys", title: "Getting your API key" },
    ],
  },
  {
    slug: "team-link-management",
    title: "How to Manage Links Across a Marketing Team Without Losing Attribution Data",
    description:
      "When every team member creates links in their own account, UTM data fragments and attribution breaks. Shared workspaces with UTM templates fix this. Here's how to set it up.",
    date: "May 13, 2025",
    readTime: "8 min read",
    category: "Teams",
    keywords: [
      "team link management",
      "shared url shortener team",
      "utm governance team",
      "marketing team link tracking",
      "url shortener workspace",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-chaos", title: "What happens without a shared link system" },
      { id: "workspaces", title: "How workspaces solve team link chaos" },
      { id: "utm-governance", title: "UTM governance: the biggest team benefit" },
      { id: "setup", title: "Setting up a team workspace" },
    ],
  },
  {
    slug: "whatsapp-link-tracking",
    title: "How to Track WhatsApp Broadcast Performance (Your Biggest Channel Is Invisible in GA4)",
    description:
      "WhatsApp doesn't pass referrer data, so all your broadcast traffic shows as 'Direct' in GA4. UTM-tagged short links fix this and let you see exactly which broadcasts drive clicks and sales.",
    date: "May 14, 2025",
    readTime: "9 min read",
    category: "WhatsApp",
    keywords: [
      "whatsapp link tracking",
      "track whatsapp broadcast clicks",
      "whatsapp utm tracking",
      "whatsapp traffic ga4",
      "whatsapp marketing analytics",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "whatsapp-attribution", title: "Why WhatsApp traffic is invisible in GA4" },
      { id: "fix", title: "The UTM fix for WhatsApp tracking" },
      { id: "broadcasts", title: "Tracking WhatsApp broadcast performance" },
      { id: "retargeting", title: "Building retargeting audiences from WhatsApp clicks" },
      { id: "setup", title: "Setting up WhatsApp link tracking" },
    ],
  },
  {
    slug: "email-marketing-link-tracking",
    title: "Email Open Rates Are Broken. Here's What to Track Instead.",
    description:
      "Apple's Mail Privacy Protection made open rates unreliable. Click rates are the new signal — but only if you track per-link clicks, not just total clicks. Here's the complete setup for email link tracking.",
    date: "May 15, 2025",
    readTime: "9 min read",
    category: "Email",
    keywords: [
      "email link tracking",
      "track email clicks",
      "email utm tracking",
      "email marketing analytics",
      "per link email tracking",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "open-rate-lie", title: "Why email open rates are lying to you" },
      { id: "per-link-tracking", title: "Per-link tracking in email campaigns" },
      { id: "deliverability", title: "Short links and email deliverability" },
      { id: "setup", title: "Setting up email link tracking in Urli" },
    ],
  },
  {
    slug: "saas-link-management",
    title: "How SaaS Companies Use Link Tracking to Attribute Trial Signups to the Right Channel",
    description:
      "Most SaaS companies know how many trials they got. They don't know which campaign, channel, or message drove them. UTM-tagged short links connect your marketing to your trial data.",
    date: "May 11, 2025",
    readTime: "9 min read",
    category: "SaaS",
    keywords: [
      "saas link tracking",
      "saas utm tracking",
      "track trial signups by channel",
      "saas marketing attribution",
      "b2b link tracking",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "saas-use-case", title: "How SaaS companies use URL shorteners (and most do it wrong)" },
      { id: "trial-tracking", title: "Tracking trial signups by source" },
      { id: "in-app-links", title: "In-app and onboarding link tracking" },
      { id: "b2b-outreach", title: "B2B outreach: tracking which prospects engage" },
      { id: "setup", title: "Getting started with SaaS link tracking" },
    ],
  },
  {
    slug: "freelancer-link-management",
    title: "How Freelancers Use Link Tracking to Know When Clients Are Reviewing Their Proposals",
    description:
      "When a client clicks your proposal link 4 times in one afternoon, that's the moment to follow up. Tracked short links give freelancers real-time engagement signals that close more deals.",
    date: "May 12, 2025",
    readTime: "8 min read",
    category: "Freelancers",
    keywords: [
      "freelancer link tracking",
      "track proposal clicks",
      "freelancer url shortener",
      "know when client opens proposal",
      "freelancer portfolio tracking",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "freelancer-problem", title: "The freelancer's link problem" },
      { id: "portfolio-tracking", title: "Tracking portfolio and proposal engagement" },
      { id: "client-reporting", title: "Client reporting: branded links for professionalism" },
      { id: "utm-for-clients", title: "Setting up UTM tracking for client campaigns" },
      { id: "setup", title: "Setting up your freelancer link system" },
    ],
  },
  {
    slug: "youtube-creator-link-strategy",
    title: "The YouTube Creator's Guide to Link Management (Never Have a Broken Description Link Again)",
    description:
      "A creator with 200 videos has 1,000+ description links to manage. When affiliate URLs change, links break. Here's the short link system that lets you update once and fix every video automatically.",
    date: "May 13, 2025",
    readTime: "9 min read",
    category: "Creators",
    keywords: [
      "youtube description link management",
      "youtube affiliate link tracker",
      "youtube creator url shortener",
      "manage youtube links",
      "youtube link analytics",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "youtube-link-problem", title: "Why YouTube creators lose revenue from bad link management" },
      { id: "short-links-for-youtube", title: "The short link system for YouTube creators" },
      { id: "analytics", title: "Understanding your YouTube audience with link analytics" },
      { id: "bio-page", title: "Your YouTube channel's link-in-bio page" },
      { id: "setup", title: "Setting up your YouTube link system" },
    ],
  },
  {
    slug: "tiktok-link-in-bio",
    title: "TikTok Link in Bio: How to Turn 'Link in Bio' Into Actual Conversions",
    description:
      "Every TikTok CTA ends with 'link in bio.' Most creators waste that link on a homepage. Here's how to build a focused bio page with per-link analytics that converts TikTok followers into customers.",
    date: "May 14, 2025",
    readTime: "8 min read",
    category: "TikTok",
    keywords: [
      "tiktok link in bio",
      "tiktok bio link strategy",
      "convert tiktok followers",
      "tiktok bio page",
      "tiktok link tracking",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "tiktok-link-problem", title: "TikTok's link problem and why it costs creators money" },
      { id: "bio-page-strategy", title: "The TikTok bio page strategy that converts" },
      { id: "tracking", title: "Tracking TikTok bio link performance" },
      { id: "campaign-links", title: "Tracking specific TikTok campaigns" },
      { id: "setup", title: "Setting up your TikTok link strategy" },
    ],
  },
  {
    slug: "link-management-best-practices",
    title: "Link Management Best Practices: How to Keep 200+ Links Organized and Working",
    description:
      "Link sprawl is invisible until it causes a problem — and then it's expensive. Here's the naming system, UTM governance, and quarterly audit process that keeps your link library clean and your attribution trustworthy.",
    date: "May 15, 2025",
    readTime: "9 min read",
    category: "General",
    keywords: [
      "link management best practices",
      "url shortener organization",
      "utm governance",
      "link audit",
      "link naming convention",
    ],
    author: AUTHOR,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
    toc: [
      { id: "the-link-sprawl-problem", title: "The link sprawl problem every growing team faces" },
      { id: "naming-system", title: "Building a link naming system that scales" },
      { id: "link-hygiene", title: "Link hygiene: the quarterly audit" },
      { id: "utm-governance", title: "UTM governance: the most important practice" },
      { id: "setup", title: "Setting up a link management system in Urli" },
    ],
  },
];

export function getAllPosts() {
  return POSTS;
}

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
