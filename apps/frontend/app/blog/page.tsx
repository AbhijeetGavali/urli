import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "./utils";
import { Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - URL Shortener Tips, Guides & Marketing Strategies",
  description:
    "Learn how to use URL shorteners for marketing, track link analytics, and grow your business with smart link management.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-[17px] font-bold text-gray-900 tracking-tight">
              Urli
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-[13px] text-gray-500 font-medium">
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
            <Link href="/blog" className="text-gray-900">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden md:block text-[13px] text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Start free <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
            Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            URL shortener tips & guides
          </h1>
          <p className="text-gray-500 text-sm">
            Marketing strategies, link analytics, and growth tactics for
            creators and teams.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto px-5 py-12 w-full">
        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-100 hover:shadow-lg transition-all">
            <div className="relative h-56 md:h-72 bg-gray-100">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-7">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {featured.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mt-3 mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                {featured.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                  {featured.author.avatar}
                </div>
                <span className="text-xs text-gray-500">
                  {featured.author.name}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400">{featured.date}</span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400">
                  {featured.readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-blue-100 hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-44 bg-gray-100 shrink-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h2 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug flex-1">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {post.description}
                </p>
                <div className="text-[11px] text-gray-400">
                  {post.date} · {post.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/5 text-gray-500 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
              <Zap size={10} className="text-white" fill="white" />
            </div>
            <span className="text-white font-semibold">Urli</span>
            <span className="text-gray-600">
              - a product of{" "}
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
          <div className="flex items-center gap-5">
            {[
              ["/privacy", "Privacy"],
              ["/terms", "Terms"],
              ["/pricing", "Pricing"],
            ].map(([h, l]) => (
              <Link
                key={h}
                href={h}
                className="hover:text-white transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
