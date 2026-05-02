import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Urli',
  description: 'How Urli collects, uses, and protects your personal data. Compliant with GDPR, Indian IT Act 2000, and SPDI Rules 2011.',
  alternates: { canonical: '/privacy' },
}

const LAST_UPDATED = 'May 2, 2025'

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{title}</h2>
      <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
    </section>
  )
}

const TOC = [
  ['#who-we-are', 'Who We Are (Data Controller)'],
  ['#data-we-collect', 'Data We Collect'],
  ['#how-we-use', 'How We Use Your Data'],
  ['#legal-basis', 'Legal Basis for Processing'],
  ['#data-sharing', 'Data Sharing & Third Parties'],
  ['#cookies', 'Cookies & Tracking'],
  ['#data-retention', 'Data Retention'],
  ['#your-rights', 'Your Rights'],
  ['#international', 'International Transfers'],
  ['#children', 'Children\'s Privacy'],
  ['#security', 'Security'],
  ['#changes', 'Changes to This Policy'],
  ['#contact', 'Contact & Grievance Officer'],
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-4 h-14 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="text-lg font-bold text-gray-900">Urli</Link>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-gray-900">Terms</Link>
          <Link href="/cookies" className="hover:text-gray-900">Cookies</Link>
          <Link href="/refund" className="hover:text-gray-900">Refund</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-12">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contents</div>
            <nav className="space-y-1">
              {TOC.map(([href, label]) => (
                <a key={href} href={href} className="block text-sm text-gray-500 hover:text-blue-600 py-1 hover:translate-x-1 transition-all">
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-3xl">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
            <p className="text-sm text-gray-400">Last updated: {LAST_UPDATED} · Effective: {LAST_UPDATED}</p>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
              This policy applies to Urli (urli.app) and describes how we handle your personal data in compliance with the <strong>Information Technology Act, 2000</strong>, the <strong>IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong> (SPDI Rules), and the <strong>General Data Protection Regulation (GDPR)</strong> where applicable.
            </div>
          </div>

          <Section id="who-we-are" title="1. Who We Are (Data Controller)">
            <p>Urli ("we", "us", "our") is a URL shortening and link management SaaS platform, a product of <strong>IdeaSprout Technologies</strong> (<a href="https://ideasprout.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ideasprout.in</a>).</p>
            <p>For the purposes of GDPR and Indian data protection law, IdeaSprout Technologies is the <strong>data controller</strong> responsible for your personal data.</p>
            <p><strong>Contact:</strong> <a href="mailto:support@ideasprout.in" className="text-blue-600 hover:underline">support@ideasprout.in</a></p>
          </Section>

          <Section id="data-we-collect" title="2. Data We Collect">
            <p><strong>Account data</strong> (provided by you):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name and email address (at registration)</li>
              <li>Password (stored as a bcrypt hash — we never store plaintext passwords)</li>
              <li>Google account ID and profile picture (if you sign in with Google)</li>
              <li>Consent timestamps: when you accepted our Terms and Privacy Policy</li>
            </ul>
            <p className="mt-3"><strong>Usage and analytics data</strong> (collected automatically):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address, country, and city of link visitors (for click analytics)</li>
              <li>Device type, browser, and operating system of link visitors</li>
              <li>Referrer URL (the page that sent a visitor to your short link)</li>
              <li>Timestamps of link clicks</li>
            </ul>
            <p className="mt-3"><strong>Payment data:</strong> Subscription payments are processed by <strong>Razorpay</strong>. We do not store card numbers, CVVs, or bank account details. Razorpay's privacy policy applies to payment data.</p>
            <p className="mt-3"><strong>Technical data:</strong> Server logs, error reports, and session tokens (JWT) stored in your browser's localStorage.</p>
          </Section>

          <Section id="how-we-use" title="3. How We Use Your Data">
            <ul className="list-disc pl-5 space-y-2">
              <li>To create and manage your account</li>
              <li>To provide the URL shortening, analytics, QR code, and link management services</li>
              <li>To send transactional emails: account verification, password reset, subscription receipts</li>
              <li>To display click analytics in your dashboard</li>
              <li>To process subscription payments via Razorpay</li>
              <li>To enforce plan limits (Free: 50 links/month, 30-day analytics)</li>
              <li>To detect and prevent fraud, abuse, and violations of our Terms of Use</li>
              <li>To comply with legal obligations under Indian law</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> use your data for advertising, sell it to third parties, or use it to build advertising profiles.</p>
          </Section>

          <Section id="legal-basis" title="4. Legal Basis for Processing (GDPR)">
            <p>For users in the European Economic Area (EEA), our legal bases are:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contract performance</strong> (Art. 6(1)(b)): Processing necessary to provide the service you signed up for</li>
              <li><strong>Consent</strong> (Art. 6(1)(a)): You explicitly accepted this Privacy Policy at registration</li>
              <li><strong>Legitimate interests</strong> (Art. 6(1)(f)): Security, fraud prevention, and service improvement</li>
              <li><strong>Legal obligation</strong> (Art. 6(1)(c)): Compliance with applicable laws</li>
            </ul>
            <p className="mt-3">Under the <strong>SPDI Rules 2011</strong>, we collect sensitive personal data (passwords) only with your informed consent, use it only for the stated purpose, and allow you to withdraw consent and request deletion at any time.</p>
          </Section>

          <Section id="data-sharing" title="5. Data Sharing & Third Parties">
            <p>We share data only with the following categories of recipients:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Razorpay</strong> (razorpay.com) — payment processing. Subject to Razorpay's Privacy Policy.</li>
              <li><strong>Google</strong> — if you use Google Sign-In, subject to Google's Privacy Policy.</li>
              <li><strong>ip-api.com</strong> — IP geolocation for click analytics (IP addresses sent; no personal account data shared).</li>
              <li><strong>Infrastructure providers</strong> — hosting, database, and email delivery providers under data processing agreements.</li>
              <li><strong>Law enforcement</strong> — only when required by a valid court order or applicable Indian law.</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> sell, rent, or trade your personal data.</p>
          </Section>

          <Section id="cookies" title="6. Cookies & Tracking">
            <p>We use <strong>essential cookies and localStorage</strong> only:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Authentication tokens</strong> (JWT): Stored in localStorage to keep you logged in. Expires in 15 minutes (access token) and 7 days (refresh token).</li>
              <li><strong>Session state</strong>: Redux state persisted in localStorage for UI preferences.</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> use advertising cookies, third-party tracking pixels on our own pages, or analytics cookies (e.g., Google Analytics).</p>
            <p>See our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link> for full details.</p>
          </Section>

          <Section id="data-retention" title="7. Data Retention">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account data</strong>: Retained while your account is active. Upon deletion, your account is anonymised within 30 days and personal identifiers are removed.</li>
              <li><strong>Click analytics</strong>: Retained indefinitely (never deleted). Free plan users can view the last 30 days; paid users can view all history. IP addresses are stored for analytics and fraud prevention.</li>
              <li><strong>Payment records</strong>: Retained for 7 years as required by Indian tax law (GST compliance).</li>
              <li><strong>Server logs</strong>: Retained for 90 days.</li>
            </ul>
          </Section>

          <Section id="your-rights" title="8. Your Rights">
            <p>Under GDPR and the SPDI Rules, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right of access</strong>: Request a copy of all personal data we hold about you. Use the "Export my data" feature in Dashboard → Settings, or email support@ideasprout.in.</li>
              <li><strong>Right to rectification</strong>: Correct inaccurate data via Dashboard → Settings.</li>
              <li><strong>Right to erasure ("right to be forgotten")</strong>: Delete your account and personal data via Dashboard → Settings → Delete Account, or email support@ideasprout.in. We will process deletion within 30 days.</li>
              <li><strong>Right to data portability</strong>: Download your data in JSON format via Dashboard → Settings → Export Data.</li>
              <li><strong>Right to withdraw consent</strong>: You may withdraw consent at any time by deleting your account. Withdrawal does not affect the lawfulness of processing before withdrawal.</li>
              <li><strong>Right to object</strong>: Object to processing based on legitimate interests by emailing support@ideasprout.in.</li>
              <li><strong>Right to lodge a complaint</strong>: If you are in the EEA, you may lodge a complaint with your local data protection authority. In India, you may contact the IT Secretary under the IT Act.</li>
            </ul>
            <p className="mt-3">To exercise any right, email <a href="mailto:support@ideasprout.in" className="text-blue-600 hover:underline">support@ideasprout.in</a>. We will respond within <strong>30 days</strong> (GDPR) or <strong>30 days</strong> (SPDI Rules).</p>
          </Section>

          <Section id="international" title="9. International Data Transfers">
            <p>Urli is operated from India. If you access our service from outside India, your data may be transferred to and processed in India. By using Urli, you consent to this transfer.</p>
            <p>For EEA users, transfers are made under appropriate safeguards (Standard Contractual Clauses where applicable).</p>
          </Section>

          <Section id="children" title="10. Children's Privacy">
            <p>Urli is not directed at children under 13 years of age. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, contact support@ideasprout.in and we will delete it promptly.</p>
          </Section>

          <Section id="security" title="11. Security">
            <p>We implement industry-standard security measures:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>HTTPS/TLS encryption for all data in transit</li>
              <li>bcrypt (cost factor 12) for password hashing</li>
              <li>JWT with short expiry (15 minutes) and refresh token rotation</li>
              <li>JWT blacklisting on logout via Redis</li>
              <li>Rate limiting on all API endpoints</li>
              <li>Regular security reviews</li>
            </ul>
            <p className="mt-3">No method of transmission over the internet is 100% secure. In the event of a data breach affecting your rights, we will notify you within 72 hours as required by GDPR.</p>
          </Section>

          <Section id="changes" title="12. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email and by updating the "Last updated" date above. Continued use of Urli after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section id="contact" title="13. Contact & Grievance Officer">
            <p>For privacy questions, data requests, or complaints:</p>
            <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm space-y-1">
              <p><strong>Email:</strong> <a href="mailto:support@ideasprout.in" className="text-blue-600 hover:underline">support@ideasprout.in</a></p>
              <p><strong>Grievance Officer (India — IT Act 2000, Rule 5(9)):</strong> support@ideasprout.in</p>
              <p><strong>Response time:</strong> Within 30 days of receipt</p>
            </div>
          </Section>
        </main>
      </div>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-3">
          {[['/terms', 'Terms of Use'], ['/cookies', 'Cookie Policy'], ['/refund', 'Refund Policy'], ['/account-deletion', 'Account Deletion']].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-gray-700">{label}</Link>
          ))}
        </div>
        © {new Date().getFullYear()} IdeaSprout Technologies. Urli is a product of IdeaSprout. All rights reserved.
      </footer>
    </div>
  )
}
