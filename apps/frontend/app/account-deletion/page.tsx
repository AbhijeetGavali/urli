import type { Metadata } from 'next'
import Link from 'next/link'
import AccountDeletionClient from './client'

export const metadata: Metadata = {
  title: 'Delete Your Account — Urli',
  description: 'Permanently delete your Urli account and all associated data. Required by Google OAuth policy and GDPR.',
  alternates: { canonical: '/account-deletion' },
}

export default function AccountDeletionPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-4 h-14 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Urli</Link>
        <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🗑️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Delete Your Account</h1>
          <p className="text-gray-500">This action is permanent and cannot be undone.</p>
        </div>

        {/* What gets deleted */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">What happens when you delete your account</h2>
          <div className="space-y-3">
            {[
              { icon: '🔗', label: 'All your short links', detail: 'Links will stop redirecting within 24 hours' },
              { icon: '📊', label: 'All click analytics data', detail: 'Historical click data will be permanently deleted' },
              { icon: '📱', label: 'QR codes, UTM templates, pixels', detail: 'All configurations will be removed' },
              { icon: '🌐', label: 'Bio page', detail: 'Your link-in-bio page will be taken offline' },
              { icon: '👥', label: 'Workspace memberships', detail: 'You will be removed from all workspaces' },
              { icon: '🔑', label: 'API keys', detail: 'All API keys will be revoked immediately' },
            ].map(({ icon, label, detail }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-lg shrink-0">{icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800">{label}</div>
                  <div className="text-xs text-gray-500">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What is retained */}
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5 mb-8 text-sm">
          <div className="font-semibold text-amber-900 mb-2">⚠️ What we retain after deletion</div>
          <ul className="text-amber-800 space-y-1 list-disc pl-4">
            <li>Payment records are retained for 7 years as required by Indian tax law (GST compliance)</li>
            <li>Anonymised aggregate click statistics (no personal identifiers) may be retained for service analytics</li>
            <li>Records required by law enforcement or court orders</li>
          </ul>
        </div>

        {/* Alternatives */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 mb-8 text-sm">
          <div className="font-semibold text-blue-900 mb-2">💡 Before you delete</div>
          <ul className="text-blue-800 space-y-1">
            <li>• <strong>Downgrade to Free</strong> — keep your account and links at no cost</li>
            <li>• <strong>Export your data</strong> — download all your data before deleting (Dashboard → Settings → Export Data)</li>
            <li>• <strong>Contact support</strong> — email privacy@urli.app if you have a specific issue we can resolve</li>
          </ul>
        </div>

        <AccountDeletionClient />

        <p className="text-center text-xs text-gray-400 mt-8">
          Questions? Email <a href="mailto:privacy@urli.app" className="text-blue-600 hover:underline">privacy@urli.app</a>
          {' '}· <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          {' '}· <Link href="/terms" className="hover:underline">Terms of Use</Link>
        </p>
      </div>
    </div>
  )
}
