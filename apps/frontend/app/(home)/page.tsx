'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FEATURES, TESTIMONIALS, STATS, COMPARISON, jsonLd } from './utils'
import { ArrowRight, Check, X, Zap, Menu } from 'lucide-react'

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
      if (data.link) setDemoResult(`${process.env.NEXT_PUBLIC_SHORT_DOMAIN || 'urli.app'}/${data.link.slug}`)
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
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Urli</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors">Log in</Link>
            <Link href="/register" className="btn-primary text-sm px-4 py-2">
              Start free <ArrowRight size={14} />
            </Link>
          </div>
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <Menu size={20} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {[['/#features', 'Features'], ['/pricing', 'Pricing'], ['/blog', 'Blog'], ['/login', 'Log in']].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 py-2.5 px-3 rounded-lg hover:bg-gray-50">{label}</Link>
            ))}
            <Link href="/register" onClick={() => setMobileOpen(false)} className="block bg-blue-600 text-white text-sm px-4 py-2.5 rounded-xl text-center font-semibold mt-2">
              Start free trial →
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a0f1e]">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.25),transparent)]" />

        <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Founder's Pricing — ₹999/mo locked in forever
          </div>

          <h1 className="text-5xl md:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-white mb-6 animate-fade-up text-balance" style={{ animationDelay: '0.05s' }}>
            The URL shortener that<br />
            <span className="text-blue-400">actually tracks results</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Shorten links, track every click, add retargeting pixels, and manage campaigns — without Bitly's ads or $29/mo price tag.
          </p>

          {/* Live demo */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <form onSubmit={handleDemo} className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-2">
              <input
                value={demoUrl} onChange={e => setDemoUrl(e.target.value)}
                type="url" placeholder="Paste any long URL to try it free…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm px-4 py-2.5 focus:outline-none"
              />
              <button type="submit" disabled={demoLoading || !demoUrl}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors whitespace-nowrap">
                {demoLoading ? 'Shortening…' : 'Shorten free'}
              </button>
            </form>
            {demoResult && (
              <div className="mt-2 flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-blue-300 text-sm font-mono truncate">{demoResult}</span>
                <div className="flex gap-2 shrink-0">
                  <button onClick={copyDemo} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors">
                    {demoCopied ? '✓ Copied' : 'Copy'}
                  </button>
                  <Link href="/register" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
                    Save it →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/register" className="bg-white text-gray-900 px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2">
              Start 30-day free trial <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="border border-white/15 text-gray-300 px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors inline-flex items-center justify-center">
              See pricing
            </Link>
          </div>

          <p className="text-xs text-gray-600 mt-4">No credit card required · Cancel anytime · 30-day Pro trial</p>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-widest">Features</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">Everything Bitly should have built</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Features that creators and marketers actually need — at a price that makes sense.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50/50 transition-all bg-white">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-blue-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Why switch to Urli?</h2>
            <p className="text-gray-500">Full features. Half the price. No ads on your links.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-4 font-medium text-gray-500 w-1/2">Feature</th>
                  <th className="px-4 py-4 font-medium text-gray-400 text-center text-xs">Bitly Free</th>
                  <th className="px-4 py-4 font-medium text-gray-500 text-center text-xs">Bitly $29</th>
                  <th className="px-4 py-4 font-bold text-blue-700 text-center text-xs bg-blue-50/50">Urli ₹999</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feat, b0, b1, u], i) => (
                  <tr key={String(feat)} className={`border-b border-gray-50 last:border-0 ${i % 2 ? 'bg-gray-50/30' : ''}`}>
                    <td className="px-5 py-3.5 text-gray-700 text-sm">{feat}</td>
                    <td className="px-4 py-3.5 text-center">{b0 ? <Check size={14} className="text-green-500 mx-auto" /> : <X size={14} className="text-gray-300 mx-auto" />}</td>
                    <td className="px-4 py-3.5 text-center">{b1 ? <Check size={14} className="text-green-500 mx-auto" /> : <X size={14} className="text-gray-300 mx-auto" />}</td>
                    <td className="px-4 py-3.5 text-center bg-blue-50/30">{u ? <Check size={15} className="text-blue-600 mx-auto" strokeWidth={2.5} /> : <X size={14} className="text-gray-300 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Link href="/register" className="btn-primary px-8 py-3">
              Get Urli for ₹999/mo <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Trusted by creators & marketers</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400">★</span>)}
              <span className="text-sm text-gray-500 ml-2">4.9 / 5 from early users</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
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

      {/* Final CTA */}
      <section className="py-24 bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(59,130,246,0.15),transparent)]" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Founder's Pricing — Lock in ₹999/mo forever
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">Start tracking smarter today</h2>
          <p className="text-gray-400 mb-8">30-day Pro trial. No credit card. Cancel anytime.</p>
          <Link href="/register" className="bg-white text-gray-900 px-10 py-4 rounded-xl text-base font-bold hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center gap-2">
            Get started free <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-gray-600 mt-4">Trusted by creators & marketers · Built by IdeaSprout</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                  <Zap size={12} className="text-white" fill="white" />
                </div>
                <span className="text-white font-bold">Urli</span>
              </div>
              <p className="text-sm leading-relaxed">Smart URL shortener with analytics, pixels, and link-in-bio. Built by <a href="https://ideasprout.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">IdeaSprout</a>.</p>
              <p className="text-xs mt-3">
                <a href="mailto:support@ideasprout.in" className="hover:text-white transition-colors">support@ideasprout.in</a>
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Product</div>
                {[['/#features', 'Features'], ['/pricing', 'Pricing'], ['/blog', 'Blog']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-1.5 hover:text-white transition-colors text-sm">{label}</Link>
                ))}
              </div>
              <div>
                <div className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Integrations</div>
                {[['/guides/shopify', 'Shopify App'], ['/guides/canva', 'Canva App'], ['/guides/chrome', 'Chrome Extension']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-1.5 hover:text-white transition-colors text-sm">{label}</Link>
                ))}
              </div>
              <div>
                <div className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Legal</div>
                {[['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use'], ['/cookies', 'Cookie Policy'], ['/refund', 'Refund Policy']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-1.5 hover:text-white transition-colors text-sm">{label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <span>© {new Date().getFullYear()} IdeaSprout Technologies. All rights reserved.</span>
            <span>Urli is a product of <a href="https://ideasprout.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IdeaSprout</a></span>
          </div>
        </div>
      </footer>
    </>
  )
}
