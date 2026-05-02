import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy — Urli',
  description: 'How Urli uses cookies and local storage. We use only essential authentication tokens — no advertising or tracking cookies.',
  alternates: { canonical: '/cookies' },
}

const LAST_UPDATED = 'May 2, 2025'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-4 h-14 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Urli</Link>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-900">Terms</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Cookie Policy</h1>
          <p className="text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>
          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 text-sm text-green-800">
            <strong>Short version:</strong> Urli uses only essential authentication tokens stored in localStorage. We do not use advertising cookies, third-party tracking cookies, or analytics cookies (e.g., Google Analytics). No cookie consent banner is required.
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">What are cookies?</h2>
          <p className="text-gray-600 leading-relaxed">Cookies are small text files stored on your device by a website. They are widely used to make websites work, remember your preferences, and provide analytics. Urli uses <strong>localStorage</strong> (a browser storage mechanism similar to cookies) rather than traditional HTTP cookies for authentication.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">What we store and why</h2>
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Purpose</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['accessToken', 'localStorage', 'JWT access token — keeps you authenticated', '15 minutes'],
                  ['refreshToken', 'localStorage', 'JWT refresh token — renews your session', '7 days'],
                  ['redux state', 'localStorage', 'UI preferences and cached API responses', 'Session'],
                ].map(([name, type, purpose, expiry]) => (
                  <tr key={name} className="hover:bg-gray-50/50">
                    <td className="p-4 font-mono text-xs text-gray-700">{name}</td>
                    <td className="p-4 text-gray-600">{type}</td>
                    <td className="p-4 text-gray-600">{purpose}</td>
                    <td className="p-4 text-gray-500">{expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">All storage is <strong>essential</strong> for the service to function. Without these tokens, you cannot stay logged in.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">What we do NOT use</h2>
          <div className="space-y-3">
            {[
              ['🚫', 'Google Analytics or similar analytics cookies'],
              ['🚫', 'Facebook Pixel or advertising cookies on our own pages'],
              ['🚫', 'Third-party tracking or retargeting cookies'],
              ['🚫', 'Social media tracking pixels'],
              ['🚫', 'Session recording tools (Hotjar, FullStory, etc.)'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">Note: If you use Urli's <strong>retargeting pixel feature</strong> on your own links, those pixels (Facebook, Google) are injected into your destination pages for your visitors — not on Urli's own pages. You are responsible for disclosing this to your visitors.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Third-party services</h2>
          <p className="text-gray-600 leading-relaxed mb-3">The following third-party services may set their own cookies when you interact with them:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li><strong>Razorpay</strong> — sets cookies during the payment checkout flow. See <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Razorpay's Privacy Policy</a>.</li>
            <li><strong>Google Sign-In</strong> — if you use Google OAuth, Google may set cookies. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google's Privacy Policy</a>.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">How to clear stored data</h2>
          <p className="text-gray-600 leading-relaxed mb-3">To remove all Urli data from your browser:</p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>Sign out of Urli (this clears authentication tokens)</li>
            <li>Open your browser's Developer Tools → Application → Local Storage → urli.app → Clear all</li>
            <li>Or clear all site data via your browser's privacy settings</li>
          </ol>
          <p className="text-sm text-gray-500 mt-3">Clearing localStorage will sign you out of Urli.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Contact</h2>
          <p className="text-gray-600">For questions about this Cookie Policy, email <a href="mailto:privacy@urli.app" className="text-blue-600 hover:underline">privacy@urli.app</a>.</p>
        </section>
      </div>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-3">
          {[['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use'], ['/refund', 'Refund Policy'], ['/account-deletion', 'Account Deletion']].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-gray-700">{label}</Link>
          ))}
        </div>
        © {new Date().getFullYear()} Urli. All rights reserved.
      </footer>
    </div>
  )
}
