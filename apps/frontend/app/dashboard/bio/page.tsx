'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetBioQuery, useUpsertBioMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import type { RootState } from '../../../store'
import Link from 'next/link'

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
      <div className="p-6 max-w-2xl mx-auto text-center py-20">
        <div className="text-5xl mb-4">🌐</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Link-in-Bio Page</h1>
        <p className="text-gray-500 mb-6">Replace Linktree. Build a beautiful bio page on your own domain with click analytics per link.</p>
        <Link href="/pricing" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Upgrade to Pro</Link>
      </div>
    )
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await upsert({ ...form, links }).unwrap()
      dispatch(showToast({ message: 'Bio page saved!', type: 'success' }))
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed', type: 'error' }))
    }
  }

  const addLink = () => setLinks(l => [...l, { label: '', url: '' }])
  const removeLink = (i: number) => setLinks(l => l.filter((_, idx) => idx !== i))
  const updateLink = (i: number, field: string, val: string) =>
    setLinks(l => l.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bio Page</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <h2 className="font-semibold text-gray-900">Page settings</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'slug', label: 'URL slug', placeholder: 'yourname' },
              { key: 'title', label: 'Page title', placeholder: 'Jane Smith' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                <input value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeholder} />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Bio description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="A short bio…" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Links</h2>
            <button type="button" onClick={addLink} className="text-sm text-blue-600 hover:underline">+ Add link</button>
          </div>
          <div className="space-y-3">
            {links.map((link, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input value={link.label} onChange={e => updateLink(i, 'label', e.target.value)} placeholder="Label"
                  className="w-1/3 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input value={link.url} onChange={e => updateLink(i, 'url', e.target.value)} placeholder="https://…" type="url"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => removeLink(i)} className="text-red-400 hover:text-red-600 text-lg">×</button>
              </div>
            ))}
            {links.length === 0 && <p className="text-sm text-gray-400">No links yet. Add your first link.</p>}
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
          {isLoading ? 'Saving…' : 'Save bio page'}
        </button>
      </form>
    </div>
  )
}
