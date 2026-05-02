import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, getAllPosts, POSTS } from "../utils";
import { getPostContent } from "./content";
import { Zap, ArrowRight, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const content = getPostContent(params.slug);
  const related = getAllPosts()
    .filter((p) => p.slug !== params.slug && p.category === post.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Urli",
      url: process.env.NEXT_PUBLIC_APP_URL,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white flex flex-col">
        {/* ── NAV ── */}
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
              <Link
                href="/blog"
                className="hover:text-gray-900 transition-colors"
              >
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

        {/* ── COVER IMAGE HERO ── */}
        <div className="relative w-full h-64 md:h-80 bg-gray-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-5 pb-7">
            <span className="inline-block text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full mb-3">
              {post.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 max-w-6xl mx-auto px-5 py-10 w-full">
          <div className="flex gap-12">
            {/* Article */}
            <article className="flex-1 min-w-0">
              {/* Back + meta */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={14} /> All posts
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {post.author.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      {post.author.name}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {post.date} · {post.readTime}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base text-gray-500 leading-relaxed mb-8">
                {post.description}
              </p>

              {/* Body */}
              <div
                className="prose prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
                prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-[15px]
                prose-li:text-gray-600 prose-li:text-[15px]
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:not-italic prose-blockquote:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* In-article CTA */}
              <div className="mt-12 rounded-2xl overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white text-center">
                <div className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-2">
                  Try it free
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Start your 30-day Pro trial
                </h3>
                <p className="text-blue-100 text-sm mb-5">
                  No credit card. Full features. Cancel anytime.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-7 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Get started free <ArrowRight size={14} />
                </Link>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Related articles
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group flex gap-4 border border-gray-100 rounded-xl p-4 hover:border-blue-100 hover:shadow-sm transition-all"
                      >
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={r.coverImage}
                            alt={r.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mb-1">
                            {r.category}
                          </div>
                          <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                            {r.title}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-1">
                            {r.readTime}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* TOC */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Contents
                  </div>
                  <nav className="space-y-1.5">
                    {post.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-xs text-gray-600 hover:text-blue-600 transition-colors leading-snug py-0.5"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Sidebar CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white text-center">
                  <div className="text-xs font-bold mb-1">Try Urli free</div>
                  <div className="text-[11px] text-blue-200 mb-3">
                    30 days Pro · No card needed
                  </div>
                  <Link
                    href="/register"
                    className="block bg-white text-blue-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Get started →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="bg-gray-950 border-t border-white/5 text-gray-500 py-10 mt-8">
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
                ["/blog", "Blog"],
                ["/pricing", "Pricing"],
                ["/privacy", "Privacy"],
                ["/terms", "Terms"],
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
    </>
  );
}
