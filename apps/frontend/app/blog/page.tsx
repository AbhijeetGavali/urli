import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from './utils'

export const metadata: Metadata = {
  title: 'Blog — URL Shortener Tips, Guides & Marketing Strategies',
  description: 'Learn how to use URL shorteners for marketing, track link analytics, and grow your business with smart link management.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-4 h-16 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="text-xl font-bold text-blue-600">Urli</Link>
        <Link href="/register" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Start free</Link>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500 mb-10">URL shortener tips, marketing guides, and link management strategies.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="text-xs text-blue-600 font-medium mb-2">{post.category}</div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
              <div className="text-xs text-gray-400 mt-4">{post.date} · {post.readTime}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
