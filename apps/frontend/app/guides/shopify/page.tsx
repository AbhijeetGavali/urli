import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Submit Urli to the Shopify App Store',
  description: 'Step-by-step guide to submitting the Urli Shopify app for public listing on the Shopify App Store.',
  robots: { index: false, follow: false },
}

const STEPS = [
  {
    step: 1, title: 'Create a Shopify Partner Account',
    desc: 'Go to partners.shopify.com and create a free Partner account. This gives you access to the Shopify Partner Dashboard where you manage app submissions.',
    link: { href: 'https://partners.shopify.com', label: 'partners.shopify.com' },
  },
  {
    step: 2, title: 'Create a Development Store',
    desc: 'In the Partner Dashboard, create a development store for testing. This is a free Shopify store you can use to install and test your app without a paid plan.',
  },
  {
    step: 3, title: 'Register Your App',
    desc: 'In the Partner Dashboard → Apps → Create app. Choose "Public app" for App Store listing. Note your API key and secret — add these to your .env file as SHOPIFY_API_KEY and SHOPIFY_API_SECRET.',
  },
  {
    step: 4, title: 'Configure App URLs',
    desc: 'Set your App URL to your deployed Shopify app URL (e.g., https://shopify.urli.app). Set the Allowed redirection URL(s) to your OAuth callback URL.',
  },
  {
    step: 5, title: 'Deploy the App',
    desc: 'Deploy apps/shopify-ext to a hosting provider (Railway, Render, or Fly.io work well for Remix apps). Set all environment variables including SHOPIFY_API_KEY, SHOPIFY_API_SECRET, and URLI_API_KEY.',
  },
  {
    step: 6, title: 'Install on Development Store',
    desc: 'Install your app on your development store to test all functionality. Verify that URL shortening, QR code generation, and link analytics all work correctly.',
  },
  {
    step: 7, title: 'Prepare App Listing Assets',
    desc: 'You\'ll need: App icon (1200×1200px), screenshots (1600×900px, minimum 3), app description (plain text, max 2,800 chars), and a demo video (optional but recommended).',
  },
  {
    step: 8, title: 'Submit for Review',
    desc: 'In the Partner Dashboard → Apps → [Your App] → Distribution → Submit for review. Shopify\'s review team typically responds within 5-7 business days. Common rejection reasons: missing privacy policy, broken functionality, or unclear value proposition.',
  },
  {
    step: 9, title: 'Address Review Feedback',
    desc: 'If rejected, Shopify provides specific feedback. Common fixes: add a privacy policy URL, fix OAuth flow issues, improve app description clarity. Resubmit after addressing all feedback.',
  },
  {
    step: 10, title: 'Go Live',
    desc: 'Once approved, your app is live on the Shopify App Store. Set up your pricing in the Partner Dashboard. Urli\'s Shopify app is free to install — revenue comes from Urli Pro subscriptions.',
  },
]

export default function ShopifyGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-4 h-14 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Urli</Link>
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">Dashboard</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">Developer Guide</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Shopify App Store Submission Guide</h1>
          <p className="text-gray-500 text-lg">Step-by-step instructions to submit the Urli Shopify app for public listing.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <div className="font-semibold text-amber-900 mb-1">Before you start</div>
          <p className="text-sm text-amber-800">You'll need a deployed instance of <code className="bg-amber-100 px-1 rounded">apps/shopify-ext</code> with a public HTTPS URL. Shopify requires all app URLs to use HTTPS.</p>
        </div>

        <div className="space-y-6">
          {STEPS.map(s => (
            <div key={s.step} className="flex gap-5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                {s.step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                {s.link && (
                  <a href={s.link.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                    → {s.link.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Required environment variables</h3>
          <pre className="text-xs bg-gray-900 text-green-400 rounded-xl p-4 overflow-x-auto">{`SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://shopify.urli.app
URLI_API_URL=https://api.urli.app
URLI_API_KEY=urli_your_api_key`}</pre>
        </div>
      </div>
    </div>
  )
}
