import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getAllPosts, POSTS } from '../utils'
import { getPostContent } from './content'

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title, description: post.description,
      type: 'article', publishedTime: post.date,
      authors: [post.author.name],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const content = getPostContent(params.slug)
  const related = getAllPosts().filter(p => p.slug !== params.slug && p.category === post.category).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
    publisher: { '@type': 'Organization', name: 'Urli', url: process.env.NEXT_PUBLIC_APP_URL },
    keywords: post.keywords.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Urli</Link>
            <div className="flex items-center gap-3">
              <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700">← Blog</Link>
              <Link href="/register" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Start free</Link>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex gap-12">
            {/* Main content */}
            <article className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
                <p className="text-lg text-gray-500 leading-relaxed mb-6">{post.description}</p>

                {/* Author + meta */}
                <div className="flex items-center gap-4 py-4 border-y border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {post.author.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{post.author.name}</div>
                    <div className="text-xs text-gray-400">{post.author.role}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm text-gray-500">{post.date}</div>
                    <div className="text-xs text-gray-400">{post.readTime}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-gray prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-li:text-gray-600 prose-li:leading-relaxed
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:not-italic"
                dangerouslySetInnerHTML={{ __html: content }} />

              {/* CTA */}
              <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Try Urli free for 30 days</h3>
                <p className="text-blue-100 mb-6">No credit card required. Full Pro features. Cancel anytime.</p>
                <Link href="/register" className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-block">
                  Start free trial →
                </Link>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {related.map(r => (
                      <Link key={r.slug} href={`/blog/${r.slug}`}
                        className="group border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all">
                        <div className="text-xs text-blue-600 font-medium mb-2">{r.category}</div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{r.title}</div>
                        <div className="text-xs text-gray-400">{r.readTime}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Table of contents</div>
                  <nav className="space-y-2">
                    {post.toc.map(item => (
                      <a key={item.id} href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-0.5 leading-snug">
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Sticky CTA */}
                <div className="mt-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white text-center">
                  <div className="text-sm font-bold mb-1">Try Urli free</div>
                  <div className="text-xs text-blue-200 mb-3">30 days Pro, no card</div>
                  <Link href="/register" className="block bg-white text-blue-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-50">
                    Get started →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
