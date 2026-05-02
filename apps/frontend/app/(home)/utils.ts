export const FEATURES = [
  {
    icon: "⚡",
    title: "Shorten any URL instantly",
    desc: "Paste a 200-character monster link, get a clean 15-character short link. Custom slugs like urli.app/summer-sale supported.",
  },
  {
    icon: "📊",
    title: "Know exactly who clicked",
    desc: "Country, city, device, browser, OS, referrer - tracked on every click, forever. No 30-day cutoff on paid plans.",
  },
  {
    icon: "🎯",
    title: "Retarget everyone who clicks",
    desc: "Attach your Facebook or Google Ads pixel to any link - even Amazon affiliate links. Build audiences from every click.",
  },
  {
    icon: "⏰",
    title: "Links that expire automatically",
    desc: 'Set a link to die at midnight on sale day, or after 500 clicks. No more embarrassing "sale ended" pages staying live for weeks.',
  },
  {
    icon: "🏷️",
    title: "Stop UTM chaos in GA4",
    desc: 'Create UTM templates your whole team uses. No more "utm_source=Email" vs "utm_source=email" breaking your attribution.',
  },
  {
    icon: "🌐",
    title: "Replace Linktree for free",
    desc: "Get a full link-in-bio page on your own domain - included in Pro. Stop paying ₹750/mo for a page with 5 links.",
  },
  {
    icon: "🔀",
    title: "Smart geo & device redirects",
    desc: "Send Indian visitors to INR pricing, US visitors to USD. Send mobile users to the App Store, desktop to your website.",
  },
  {
    icon: "📱",
    title: "Dynamic QR codes",
    desc: "Printed 500 flyers with a QR code? Change where it points without reprinting. Track scans by location and device.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Maria K.",
    role: "Etsy Shop Owner, 3,200 sales",
    avatar: "MK",
    text: "I was paying ₹750/mo for Linktree AND using Bitly free. Now I pay ₹999/mo for Urli and get both - plus I finally know which Pinterest board drives my Etsy sales.",
  },
  {
    name: "James T.",
    role: "Newsletter Creator, 18k subscribers",
    avatar: "JT",
    text: "Bitly started showing a full-page ad before my links redirected. My open rates dropped 12% in a month. Switched to Urli - zero ads, and my readers actually reach my content.",
  },
  {
    name: "Priya S.",
    role: "Performance Marketer",
    avatar: "PS",
    text: "A client's flash sale link stayed live 2 weeks after the sale ended. Cost them ₹3 lakh in unintended discounts. Now every campaign link has an expiry date. Urli paid for itself in one campaign.",
  },
];

export const COMPARISON = [
  ["No ads shown to your visitors", false, false, true],
  ["Link expiration by date or clicks", false, false, true],
  ["UTM template builder", false, false, true],
  ["Retargeting pixels on any link", false, false, true],
  ["Link-in-bio page included", false, false, true],
  ["Analytics history - forever", false, true, true],
  ["Custom branded domain", false, true, true],
  ["Geo & device smart redirects", false, false, true],
];

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Urli",
  applicationCategory: "BusinessApplication",
  offers: { "@type": "Offer", price: "999", priceCurrency: "INR" },
  description:
    "URL shortener with deep analytics, retargeting pixels, UTM templates, link expiry, and link-in-bio. No ads on your links. ₹999/mo.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://urli.ideasprout.in",
};
