'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FEATURES, TESTIMONIALS, STATS, COMPARISON, jsonLd } from './utils'

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [demoUrl, setDemoUrl] = useState('')
  const [demoResult, setDemoResult] = useState('')
  const [demoLoading, setDemoLoading] = useState(false)
  const [demoCopied, setDemoCopied] = useState(false)

  const handleDemo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!demoUrl) return
    setDemoLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: demoUrl }),
      })
      const data = await res.json()
      if (data.link) {
        setDemoResult(`${process.env.NEXT_PUBLIC_SHORT_DOMAIN || window.location.host}/${data.link.slug}`)
      }
    } catch { setDemoResult('urli.app/demo-abc123') }
    finally { setDemoLoading(false) }
  }

  const copyDemo = async () => {
    await navigator.clipboard.writeText(`https://${demoResult}`)
    setDemoCopied(true); setTimeout(() => setDemoCopied(false), 2000)
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Urli
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">Log in</Link>
            <Link href="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm">
              Start free trial
            </Link>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <div className="w-5 h-0.5 bg-gray-700 mb-1.5 transition-all" style={{ transform: mobileOpen ? 'rotate(45deg) translate(2px, 6px)' : '' }} />
            <div className="w-5 h-0.5 bg-gray-700 mb-1.5 transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <div className="w-5 h-0.5 bg-gray-700 transition-all" style={{ transform: mobileOpen ? 'rotate(-45deg) translate(2px, -6px)' : '' }} />
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {[['/#features', 'Features'], ['/pricing', 'Pricing'], ['/blog', 'Blog'], ['/login', 'Log in']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 py-2 hover:text-blue-600">{label}</Link>
            ))}
            <Link href="/register" onClick={() => setMobileOpen(false)} className="block bg-blue-600 text-white text-sm px-4 py-2.5 rounded-xl text-center font-medium">
              Start free trial
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.3),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.2),_transparent_60%)]" />

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 text-sm px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            30-day free trial — no credit card required
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            The URL shortener<br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              that works for you
            </span>
          </h1>

          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Shorten links, track every click, add retargeting pixels, and manage campaigns.
            No ads. No interstitials. <span className="text-white font-medium">$15/mo.</span>
          </p>

          {/* Live demo shortener */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleDemo} className="flex gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2">
              <input
                value={demoUrl} onChange={e => setDemoUrl(e.target.value)}
                type="url" placeholder="Paste a long URL to shorten it now…"
                className="flex-1 bg-transparent text-white placeholder-blue-200/60 text-sm px-4 py-2.5 focus:outline-none"
              />
              <button type="submit" disabled={demoLoading || !demoUrl}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap">
                {demoLoading ? 'Shortening…' : 'Shorten free'}
              </button>
            </form>
            {demoResult && (
              <div className="mt-3 flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                <span className="text-blue-300 text-sm font-mono">{demoResult}</span>
                <button onClick={copyDemo} className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors">
                  {demoCopied ? '✓ Copied' : 'Copy'}
                </button>
                <Link href="/register" className="text-xs bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded-lg transition-colors">
                  Save it →
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-blue-700 px-8 py-4 rounded-xl text-base font-semibold hover:bg-blue-50 transition-colors shadow-xl">
              Start free — 30 days Pro
            </Link>
            <Link href="/pricing" className="border border-white/30 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/10 transition-colors">
              See pricing
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-blue-200/70 mt-1">{s.label}</div>
                <div className="text-xs text-blue-400/60 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">Features</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything Bitly should have built</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Features that mid-sized teams and creators actually need — at a price that makes sense.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Urli compares</h2>
            <p className="text-gray-500">Full features at half the price of Bitly Growth.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-5 font-semibold text-gray-700 w-1/2">Feature</th>
                  <th className="p-5 font-semibold text-gray-400 text-center">Bitly Free</th>
                  <th className="p-5 font-semibold text-gray-500 text-center">Bitly $29</th>
                  <th className="p-5 font-bold text-blue-700 text-center bg-blue-50">Urli $15</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feat, b0, b1, u], i) => (
                  <tr key={String(feat)} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                    <td className="p-4 text-gray-700 font-medium">{feat}</td>
                    <td className="p-4 text-center">{b0 ? <span className="text-green-500 font-bold">✓</span> : <span className="text-red-400">✗</span>}</td>
                    <td className="p-4 text-center">{b1 ? <span className="text-green-500 font-bold">✓</span> : <span className="text-red-400">✗</span>}</td>
                    <td className="p-4 text-center bg-blue-50/50">{u ? <span className="text-green-600 font-bold text-base">✓</span> : <span className="text-red-400">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by creators & marketers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Start shortening smarter today</h2>
          <p className="text-blue-100 mb-10 text-lg">30-day Pro trial. No credit card. Cancel anytime.</p>
          <Link href="/register" className="bg-white text-blue-700 px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors shadow-xl inline-block">
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-white mb-2">Urli</div>
              <p className="text-sm max-w-xs">The smart URL shortener for creators, marketers, and teams.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-white font-medium mb-3">Product</div>
                {[['/#features', 'Features'], ['/pricing', 'Pricing'], ['/blog', 'Blog']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-1 hover:text-white transition-colors">{label}</Link>
                ))}
              </div>
              <div>
                <div className="text-white font-medium mb-3">Extensions</div>
                {[['/guides/shopify', 'Shopify App'], ['/guides/canva', 'Canva App'], ['/guides/chrome', 'Chrome Extension']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-1 hover:text-white transition-colors">{label}</Link>
                ))}
              </div>
              <div>
                <div className="text-white font-medium mb-3">Legal</div>
                {[['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use'], ['/cookies', 'Cookie Policy'], ['/refund', 'Refund Policy'], ['/account-deletion', 'Account Deletion']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-1 hover:text-white transition-colors">{label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-sm text-center">
            © {new Date().getFullYear()} Urli. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
