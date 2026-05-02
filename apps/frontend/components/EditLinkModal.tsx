'use client'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useUpdateLinkMutation } from '../store/api/linksApi'
import { useGetPixelsQuery } from '../store/api/miscApi'
import { showToast } from '../store/slices/uiSlice'

interface Props { link: any; onClose: () => void }

export function EditLinkModal({ link, onClose }: Props) {
  const dispatch = useDispatch()
  const [update, { isLoading }] = useUpdateLinkMutation()
  const { data: pixelData } = useGetPixelsQuery()

  const [form, setForm] = useState({
    slug: '', title: '', originalUrl: '',
    utmSource: '', utmMedium: '', utmCampaign: '',
    expiresAt: '', maxClicks: '', pixelIds: [] as string[],
    isActive: true,
  })

  useEffect(() => {
    if (!link) return
    setForm({
      slug: link.slug || '',
      title: link.title || '',
      originalUrl: link.originalUrl || '',
      utmSource: link.utmSource || '',
      utmMedium: link.utmMedium || '',
      utmCampaign: link.utmCampaign || '',
      expiresAt: link.expiresAt ? new Date(link.expiresAt).toISOString().slice(0, 16) : '',
      maxClicks: link.maxClicks ? String(link.maxClicks) : '',
      pixelIds: link.pixelIds || [],
      isActive: link.isActive ?? true,
    })
  }, [link])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const togglePixel = (id: string) =>
    setForm(f => ({ ...f, pixelIds: f.pixelIds.includes(id) ? f.pixelIds.filter(p => p !== id) : [...f.pixelIds, id] }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload: any = { slug: form.slug, title: form.title || undefined, isActive: form.isActive, originalUrl: form.originalUrl }
      if (form.utmSource) payload.utmSource = form.utmSource
      if (form.utmMedium) payload.utmMedium = form.utmMedium
      if (form.utmCampaign) payload.utmCampaign = form.utmCampaign
      if (form.expiresAt) payload.expiresAt = new Date(form.expiresAt).toISOString()
      if (form.maxClicks) payload.maxClicks = Number(form.maxClicks)
      payload.pixelIds = form.pixelIds
      await update({ id: link.id, data: payload }).unwrap()
      dispatch(showToast({ message: 'Link updated!', type: 'success' }))
      onClose()
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed to update', type: 'error' }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Edit link</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Destination URL</label>
            <input value={form.originalUrl} onChange={e => set('originalUrl', e.target.value)} type="url" required
              placeholder="https://example.com/…"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Slug</label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3 py-2.5 bg-gray-50 text-gray-400 text-sm border-r border-gray-200">
                {process.env.NEXT_PUBLIC_SHORT_DOMAIN || 'urli.app'}/
              </span>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} required
                className="flex-1 px-3 py-2.5 text-sm focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Title</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Optional title"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[['utmSource', 'UTM Source'], ['utmMedium', 'UTM Medium'], ['utmCampaign', 'UTM Campaign']].map(([k, l]) => (
              <div key={k}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{l}</label>
                <input value={(form as any)[k]} onChange={e => set(k, e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Expires at</label>
              <input type="datetime-local" value={form.expiresAt} onChange={e => set('expiresAt', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Max clicks</label>
              <input type="number" min="1" value={form.maxClicks} onChange={e => set('maxClicks', e.target.value)} placeholder="Unlimited"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {pixelData?.pixels?.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Pixels</label>
              <div className="space-y-2">
                {pixelData.pixels.map((p: any) => (
                  <label key={p.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" checked={form.pixelIds.includes(p.id)} onChange={() => togglePixel(p.id)} className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">{p.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{p.type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
            <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm font-medium text-gray-700">Link is active</span>
          </label>
        </form>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit as any} disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {isLoading ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
