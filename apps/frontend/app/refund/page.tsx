import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy — Urli',
  description: 'Urli refund and cancellation policy for Pro and Business subscriptions. Payments processed by Razorpay.',
  alternates: { canonical: '/refund' },
}

const LAST_UPDATED = 'May 2, 2025'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-4 h-14 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-bold text-gray-900">Urli</Link>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-gray-900">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Refund Policy</h1>
          <p className="text-sm text-gray-400">Last updated: {LAST_UPDATED}</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
            Payments are processed by <strong>Razorpay</strong>. This policy governs refunds for Urli Pro and Business subscriptions. By subscribing, you agree to this policy.
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">1. Free Trial</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>All Pro and Business plans include a <strong>30-day free trial</strong>. No credit card is required to start the trial. You will not be charged during the trial period.</p>
            <p>If you do not add payment details before the trial ends, your account automatically reverts to the Free plan. No charge is made.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">2. Cancellation</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>You may cancel your subscription at any time from <strong>Dashboard → Settings → Subscription → Cancel</strong>.</p>
            <p>Upon cancellation:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your subscription remains active until the end of the current billing period</li>
              <li>You will not be charged for the next billing cycle</li>
              <li>Your account will revert to the Free plan at the end of the period</li>
              <li>Your links and data are retained (subject to Free plan limits)</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">3. Refunds</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p><strong>General policy:</strong> Subscription fees are non-refundable once a billing period has started, except as described below.</p>

            <div className="bg-green-50 rounded-xl border border-green-100 p-4 text-sm">
              <div className="font-semibold text-green-900 mb-2">✓ Eligible for refund</div>
              <ul className="text-green-800 space-y-1 list-disc pl-4">
                <li>Duplicate charges due to a technical error</li>
                <li>Charges made after a confirmed cancellation</li>
                <li>Service was completely unavailable for more than 72 consecutive hours in a billing period (pro-rated)</li>
                <li>Accidental subscription within 48 hours of first charge (first-time subscribers only)</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl border border-red-100 p-4 text-sm">
              <div className="font-semibold text-red-900 mb-2">✗ Not eligible for refund</div>
              <ul className="text-red-800 space-y-1 list-disc pl-4">
                <li>Partial month usage after cancellation</li>
                <li>Forgetting to cancel before renewal</li>
                <li>Account suspended for Terms of Use violations</li>
                <li>Dissatisfaction with features (we encourage you to use the free trial first)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">4. How to Request a Refund</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>To request a refund, email <a href="mailto:support@ideasprout.in" className="text-blue-600 hover:underline">support@ideasprout.in</a> with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your registered email address</li>
              <li>Razorpay payment ID (found in your email receipt)</li>
              <li>Reason for the refund request</li>
            </ul>
            <p>We will respond within <strong>5 business days</strong>. Approved refunds are processed within <strong>7–10 business days</strong> to your original payment method via Razorpay.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">5. Payment Processing</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>All payments are processed by <strong>Razorpay</strong> (Razorpay Software Private Limited, Bangalore, India). Razorpay is a PCI-DSS compliant payment gateway regulated by the Reserve Bank of India (RBI).</p>
            <p>We do not store your card details. For payment disputes, you may also contact Razorpay support directly at <a href="https://razorpay.com/support/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">razorpay.com/support</a>.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">6. Consumer Rights (India)</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>This policy does not limit your rights under the <strong>Consumer Protection Act, 2019</strong> or other applicable Indian consumer protection laws. If you believe you have been charged incorrectly, you may also approach the Consumer Disputes Redressal Forum.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">7. Contact</h2>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm space-y-1">
            <p><strong>Email:</strong> <a href="mailto:support@ideasprout.in" className="text-blue-600 hover:underline">support@ideasprout.in</a></p>
            <p><strong>Response time:</strong> Within 5 business days</p>
            <p><strong>Refund processing:</strong> 7–10 business days after approval</p>
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-3">
          {[['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use'], ['/cookies', 'Cookie Policy'], ['/account-deletion', 'Account Deletion']].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-gray-700">{label}</Link>
          ))}
        </div>
        © {new Date().getFullYear()} IdeaSprout Technologies. Urli is a product of IdeaSprout. All rights reserved.
      </footer>
    </div>
  )
}
