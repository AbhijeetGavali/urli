"use client";
import { useState } from "react";
import Link from "next/link";
import { FEATURES, TESTIMONIALS, COMPARISON, jsonLd } from "./utils";
import {
  ArrowRight,
  Check,
  X,
  Zap,
  Menu,
  Link2,
  BarChart2,
  Target,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoUrl, setDemoUrl] = useState("");
  const [demoResult, setDemoResult] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoCopied, setDemoCopied] = useState(false);

  const handleDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoUrl) return;
    setDemoLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: demoUrl }),
      });
      const data = await res.json();
      if (data.link)
        setDemoResult(
          `${process.env.NEXT_PUBLIC_SHORT_DOMAIN || "urli.ideasprout.in"}/${data.link.slug}`,
        );
    } catch {
      setDemoResult("urli.ideasprout.in/demo-abc123");
    } finally {
      setDemoLoading(false);
    }
  };

  const copyDemo = async () => {
    await navigator.clipboard.writeText(`https://${demoResult}`);
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 2000);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-[17px] font-bold text-gray-900 tracking-tight">
              Urli
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[13px] text-gray-500 font-medium">
            <Link
              href="/#features"
              className="hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-[13px] text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              Start free <ArrowRight size={13} />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu size={20} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-0.5">
            {[
              ["/#features", "Features"],
              ["/pricing", "Pricing"],
              ["/blog", "Blog"],
              ["/login", "Log in"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-gray-700 py-2.5 px-3 rounded-lg hover:bg-gray-50"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="block bg-blue-600 text-white text-sm px-4 py-2.5 rounded-lg text-center font-semibold mt-2"
            >
              Start free trial →
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0d1117 0%, #0f172a 50%, #0d1117 100%)",
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Blue glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-gray-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Founder's Pricing - ₹999/mo, locked in forever
          </div>

          {/* Headline */}
          <h1 className="text-[2.75rem] md:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-white mb-5">
            Shorten links.
            <br />
            <span className="text-blue-400">Track every click.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            The URL shortener with deep analytics, retargeting pixels, and
            link-in-bio - without Bitly's ads or ₹2,499/mo price tag.
          </p>

          {/* Demo shortener */}
          <div className="max-w-xl mx-auto mb-8">
            <form
              onSubmit={handleDemo}
              className="flex gap-2 p-1.5 bg-white/8 border border-white/10 rounded-xl backdrop-blur-sm"
            >
              <input
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                type="url"
                placeholder="Paste a URL to try it free…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm px-3 py-2 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                disabled={demoLoading || !demoUrl}
                className="shrink-0 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                {demoLoading ? "Shortening…" : "Shorten"}
              </button>
            </form>

            {demoResult && (
              <div className="mt-2 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <Link2 size={14} className="text-blue-400 shrink-0" />
                <span className="text-blue-300 text-sm font-mono flex-1 truncate text-left">
                  {demoResult}
                </span>
                <button
                  onClick={copyDemo}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  {demoCopied ? "✓ Copied" : "Copy"}
                </button>
                <Link
                  href="/register"
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium shrink-0"
                >
                  Save →
                </Link>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold text-sm px-7 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start 30-day free trial <ArrowRight size={15} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center border border-white/10 text-gray-400 text-sm font-medium px-7 py-3 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
            >
              View pricing
            </Link>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            No credit card · Cancel anytime · Full Pro for 30 days
          </p>
        </div>

        {/* Social proof bar */}
        <div className="relative border-t border-white/5">
          <div className="max-w-4xl mx-auto px-5 py-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-center">
            {[
              ["10,000+", "links shortened"],
              ["₹999/mo", "Pro plan"],
              ["30 days", "free trial"],
              ["No ads", "on your links"],
            ].map(([val, label]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">{val}</span>
                <span className="text-gray-500 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
              How it works
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              From long URL to tracked link in seconds
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Link2,
                step: "01",
                title: "Paste your URL",
                desc: "Drop any long link into Urli. Add a custom slug if you want.",
              },
              {
                icon: Target,
                step: "02",
                title: "Add pixels & UTMs",
                desc: "Attach retargeting pixels and UTM parameters in one click.",
              },
              {
                icon: Zap,
                step: "03",
                title: "Share your link",
                desc: "Use the short link anywhere - email, social, QR code, bio page.",
              },
              {
                icon: BarChart2,
                step: "04",
                title: "Track every click",
                desc: "See country, device, referrer, and time-series analytics forever.",
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-xs font-bold text-blue-200 mb-3">
                  {step}
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
              Features
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything you need to manage links
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Built for creators, marketers, and teams who need more than a
              basic shortener.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-100 hover:shadow-md hover:shadow-blue-50/50 transition-all group"
              >
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-lg mb-3 group-hover:bg-blue-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
              Comparison
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Why teams switch to Urli
            </h2>
            <p className="text-gray-500 text-sm">
              Full features. No ads. Half the price.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 w-[45%]">
                    Feature
                  </th>
                  <th className="px-3 py-3.5 text-xs font-medium text-gray-400 text-center">
                    Bitly Free
                  </th>
                  <th className="px-3 py-3.5 text-xs font-medium text-gray-500 text-center">
                    Bitly ₹2,499
                  </th>
                  <th className="px-3 py-3.5 text-xs font-bold text-blue-700 text-center bg-blue-50">
                    Urli ₹999
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON.map(([feat, b0, b1, u], i) => (
                  <tr
                    key={String(feat)}
                    className={i % 2 ? "bg-gray-50/40" : ""}
                  >
                    <td className="px-5 py-3 text-gray-700 text-xs font-medium">
                      {feat}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {b0 ? (
                        <Check size={13} className="text-green-500 mx-auto" />
                      ) : (
                        <X
                          size={13}
                          className="text-red-500 mx-auto"
                          strokeWidth={2.5}
                        />
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {b1 ? (
                        <Check size={13} className="text-green-500 mx-auto" />
                      ) : (
                        <X
                          size={13}
                          className="text-red-500 mx-auto"
                          strokeWidth={2.5}
                        />
                      )}
                    </td>
                    <td className="px-3 py-3 text-center bg-blue-50/40">
                      {u ? (
                        <Check
                          size={14}
                          className="text-blue-600 mx-auto"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <X
                          size={13}
                          className="text-red-500 mx-auto"
                          strokeWidth={2.5}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-7">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-7 py-3 rounded-lg transition-colors shadow-sm"
            >
              Get Urli for ₹999/mo <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Loved by creators & marketers
            </h2>
            <div className="flex items-center justify-center gap-1 mt-1">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-amber-400 text-sm">
                  {s}
                </span>
              ))}
              <span className="text-xs text-gray-400 ml-2">4.9 / 5</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="flex gap-0.5 mb-3">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-amber-400 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-xs">
                      {t.name}
                    </div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Simple, honest pricing
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            No tricks. No interstitials on your links. Founder's pricing locked
            in forever.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              {
                name: "Starter",
                price: "Free",
                desc: "50 links/mo, basic analytics",
                highlight: false,
              },
              {
                name: "Pro",
                price: "₹999/mo",
                desc: "Unlimited links, deep analytics, pixels, QR, bio page",
                highlight: true,
              },
              {
                name: "Business",
                price: "₹2,999/mo",
                desc: "Everything in Pro + team workspaces, custom domain",
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-5 ${p.highlight ? "border-blue-500 bg-blue-50/30 shadow-md shadow-blue-100" : "border-gray-200"}`}
              >
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {p.name}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {p.price}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {p.desc}
                </p>
                {p.highlight && (
                  <div className="text-xs text-amber-600 font-medium mt-2 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                    Founder's rate
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 mt-8 text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            See full pricing & features <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(160deg, #0d1117 0%, #0f172a 100%)",
        }}
      >
        <div className="relative max-w-xl mx-auto px-5 text-center">
          <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-gray-400 text-xs px-4 py-1.5 rounded-full mb-6">
              <Clock size={11} /> 30-day free trial · No credit card
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-balance">
              Start tracking smarter today
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Founder's pricing - ₹999/mo locked in forever when you subscribe
              now.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get started free <ArrowRight size={15} />
            </Link>
            <p className="text-xs text-gray-600 mt-4">
              Built by{" "}
              <a
                href="https://ideasprout.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                IdeaSprout
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 border-t border-white/5 text-gray-500 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div className="max-w-[220px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                  <Zap size={12} className="text-white" fill="white" />
                </div>
                <span className="text-white font-bold text-sm">Urli</span>
              </div>
              <p className="text-xs leading-relaxed mb-3">
                Smart URL shortener with analytics, pixels, and link-in-bio. A
                product of{" "}
                <a
                  href="https://ideasprout.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  IdeaSprout
                </a>
                .
              </p>
              <a
                href="mailto:support@ideasprout.in"
                className="text-xs hover:text-white transition-colors"
              >
                support@ideasprout.in
              </a>
            </div>
            <div className="grid grid-cols-3 gap-8 text-xs">
              <div>
                <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[10px]">
                  Product
                </div>
                {[
                  ["/#features", "Features"],
                  ["/pricing", "Pricing"],
                  ["/blog", "Blog"],
                ].map(([h, l]) => (
                  <Link
                    key={h}
                    href={h}
                    className="block py-1.5 hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                ))}
              </div>
              <div>
                <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[10px]">
                  Integrations
                </div>
                {[
                  ["/guides/shopify", "Shopify"],
                  ["/guides/canva", "Canva"],
                  ["/guides/chrome", "Chrome"],
                ].map(([h, l]) => (
                  <Link
                    key={h}
                    href={h}
                    className="block py-1.5 hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                ))}
              </div>
              <div>
                <div className="text-white font-semibold mb-3 uppercase tracking-wider text-[10px]">
                  Legal
                </div>
                {[
                  ["/privacy", "Privacy"],
                  ["/terms", "Terms"],
                  ["/cookies", "Cookies"],
                  ["/refund", "Refund"],
                ].map(([h, l]) => (
                  <Link
                    key={h}
                    href={h}
                    className="block py-1.5 hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px]">
            <span>
              © {new Date().getFullYear()} IdeaSprout Technologies. All rights
              reserved.
            </span>
            <span>
              Urli is a product of{" "}
              <a
                href="https://ideasprout.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                IdeaSprout
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
