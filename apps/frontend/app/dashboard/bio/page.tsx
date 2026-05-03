'use client'
import { extractError } from '@/lib/extractError'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetBioQuery, useUpsertBioMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import type { RootState } from '../../../store'
import Link from 'next/link'
import { Globe, Plus, X, ExternalLink, Zap } from 'lucide-react'

export default function BioPage() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data } = useGetBioQuery()
  const [upsert, { isLoading }] = useUpsertBioMutation()
  const [form, setForm] = useState({ slug: '', title: '', description: '', theme: 'default' })
  const [links, setLinks] = useState<{ label: string; url: string }[]>([])

  useEffect(() => {
    if (data?.bio) {
      setForm({ slug: data.bio.slug, title: data.bio.title, description: data.bio.description || '', theme: data.bio.theme })
      setLinks(data.bio.links || [])
    }
  }, [data])

  if (user?.plan === 'FREE') {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe size={24} className="text-blue-500" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Link-in-Bio Page</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Replace Linktree. Build a beautiful bio page on your own domain with click analytics per link.
          </p>
          <Link href="/pricing"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
            <Zap size={14} fill="white" /> Upgrade to Pro
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await upsert({ ...form, links }).unwrap()
      dispatch(showToast({ message: 'Bio page saved!', type: 'success' }))
    } catch (err: any) {
      dispatch(showToast({ message: extractError(err), type: 'error' }))
    }
  }

  const addLink = () => setLinks(l => [...l, { label: '', url: '' }])
  const removeLink = (i: number) => setLinks(l => l.filter((_, idx) => idx !== i))
  const updateLink = (i: number, field: string, val: string) =>
    setLinks(l => l.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  const previewUrl = form.slug
    ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://urli.ideasprout.in'}/b/${form.slug}`
    : null

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Your link-in-bio page, hosted on Urli.</p>
        {previewUrl && (
          <a href={previewUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors">
            Preview <ExternalLink size={11} />
          </a>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Page settings */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Page settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">URL slug</label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 bg-white">
                <span className="px-3 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 py-2.5 shrink-0">/b/</span>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required
                  className="flex-1 px-3 py-2.5 text-sm focus:outline-none bg-white" placeholder="yourname" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Page title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                className="input" placeholder="Jane Smith" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Bio description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2}
              className="input resize-none" placeholder="A short bio…" />
          </div>
        </section>

        {/* Links */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Links</h2>
            <button type="button" onClick={addLink}
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={13} /> Add link
            </button>
          </div>
          <div className="space-y-2">
            {links.map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={link.label} onChange={e => updateLink(i, 'label', e.target.value)}
                  placeholder="Label" className="input w-1/3" />
                <input value={link.url} onChange={e => updateLink(i, 'url', e.target.value)}
                  placeholder="https://…" type="url" className="input flex-1" />
                <button type="button" onClick={() => removeLink(i)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0">
                  <X size={14} />
                </button>
              </div>
            ))}
            {!links.length && <p className="text-sm text-gray-400">No links yet.</p>}
          </div>
        </section>

        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? 'Saving…' : 'Save bio page'}
        </button>
      </form>
    </div>
  )
}
