'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetPixelsQuery, useCreatePixelMutation, useDeletePixelMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import type { RootState } from '../../../store'
import Link from 'next/link'

export default function PixelsPage() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data, isLoading } = useGetPixelsQuery()
  const [create, { isLoading: isCreating }] = useCreatePixelMutation()
  const [del] = useDeletePixelMutation()
  const [form, setForm] = useState({ name: '', type: 'FACEBOOK', pixelId: '' })
  const [showForm, setShowForm] = useState(false)

  if (user?.plan === 'FREE') {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center py-20">
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Retargeting Pixels</h1>
        <p className="text-gray-500 mb-6">Attach Facebook or Google pixels to any link. Build retargeting audiences from every click — even on third-party domains.</p>
        <Link href="/pricing" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Upgrade to Pro</Link>
      </div>
    )
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await create(form).unwrap()
      setForm({ name: '', type: 'FACEBOOK', pixelId: '' }); setShowForm(false)
      dispatch(showToast({ message: 'Pixel added!', type: 'success' }))
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed', type: 'error' }))
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Retargeting Pixels</h1>
          <p className="text-sm text-gray-500 mt-1">Add pixels to links to build retargeting audiences from every click.</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          + Add pixel
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-100 p-5 mb-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="My Facebook Pixel" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="FACEBOOK">Facebook</option>
                <option value="GOOGLE">Google Ads</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Pixel ID</label>
              <input value={form.pixelId} onChange={e => setForm(f => ({ ...f, pixelId: e.target.value }))} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="123456789" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={isCreating} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
              {isCreating ? 'Saving…' : 'Save pixel'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {isLoading ? <div className="p-8 text-center text-gray-400">Loading…</div>
          : data?.pixels?.length === 0 ? <div className="p-12 text-center text-gray-400">No pixels yet.</div>
          : data?.pixels?.map((p: any) => (
            <div key={p.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 text-sm">{p.name}</div>
                <div className="text-xs text-gray-400">{p.type} · ID: {p.pixelId}</div>
              </div>
              <button onClick={() => del(p.id)} className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50">Remove</button>
            </div>
          ))}
      </div>
    </div>
  )
}
