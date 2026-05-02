import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

async function getBio(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${apiUrl}/bio/public/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const data = await res.json()
    return data.bio
  } catch { return null }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const bio = await getBio(params.slug)
  if (!bio) return {}
  return { title: bio.title, description: bio.description, openGraph: { title: bio.title, description: bio.description } }
}

export default async function PublicBioPage({ params }: { params: { slug: string } }) {
  const bio = await getBio(params.slug)
  if (!bio) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {bio.avatar && <img src={bio.avatar} alt={bio.title} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />}
          <h1 className="text-2xl font-bold text-gray-900">{bio.title}</h1>
          {bio.description && <p className="text-gray-500 mt-2 text-sm">{bio.description}</p>}
        </div>
        <div className="space-y-3">
          {(bio.links || []).map((link: any, i: number) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="block w-full bg-white text-center py-3.5 px-6 rounded-2xl font-medium text-gray-900 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="https://urli.app" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600">
            Made with Urli
          </a>
        </div>
      </div>
    </div>
  )
}
