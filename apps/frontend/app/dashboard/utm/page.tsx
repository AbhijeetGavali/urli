'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetUTMTemplatesQuery, useCreateUTMTemplateMutation, useDeleteUTMTemplateMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'

const EMPTY = { name: '', source: '', medium: '', campaign: '', term: '', content: '' }

export default function UTMPage() {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetUTMTemplatesQuery()
  const [create, { isLoading: isCreating }] = useCreateUTMTemplateMutation()
  const [del] = useDeleteUTMTemplateMutation()
  const [form, setForm] = useState(EMPTY)
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await create(form).unwrap()
      setForm(EMPTY); setShowForm(false)
      dispatch(showToast({ message: 'Template created!', type: 'success' }))
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed', type: 'error' }))
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">UTM Templates</h1>
          <p className="text-sm text-gray-500 mt-1">Enforce UTM standards across your team. Pick from presets when shortening links.</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          + New template
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-100 p-5 mb-6 grid grid-cols-2 gap-4">
          {Object.keys(EMPTY).map(k => (
            <div key={k}>
              <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">{k}</label>
              <input value={(form as any)[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                required={k === 'name'}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={k === 'name' ? 'e.g. Instagram Story' : `utm_${k}`} />
            </div>
          ))}
          <div className="col-span-2 flex gap-3">
            <button type="submit" disabled={isCreating} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
              {isCreating ? 'Saving…' : 'Save template'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {isLoading ? <div className="p-8 text-center text-gray-400">Loading…</div>
          : data?.templates?.length === 0 ? <div className="p-12 text-center text-gray-400">No templates yet. Create one to enforce UTM standards.</div>
          : data?.templates?.map((t: any) => (
            <div key={t.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {[t.source && `source: ${t.source}`, t.medium && `medium: ${t.medium}`, t.campaign && `campaign: ${t.campaign}`].filter(Boolean).join(' · ')}
                </div>
              </div>
              <button onClick={() => del(t.id)} className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50">Delete</button>
            </div>
          ))}
      </div>
    </div>
  )
}
