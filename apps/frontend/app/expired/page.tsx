import Link from 'next/link'

export default function ExpiredPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⏰</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">This link has expired</h1>
        <p className="text-gray-500 mb-8">The link you followed has either expired or reached its click limit. Contact the person who shared it for an updated link.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 inline-block">
          Create your own short links
        </Link>
      </div>
    </div>
  )
}
