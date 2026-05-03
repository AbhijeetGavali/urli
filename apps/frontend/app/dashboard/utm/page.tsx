'use client'
import { extractError } from '@/lib/extractError'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetUTMTemplatesQuery, useCreateUTMTemplateMutation, useDeleteUTMTemplateMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import { Plus, Trash2, Tag, X } from 'lucide-react'

const EMPTY = { name: '', source: '', medium: '', campaign: '', term: '', content: '' }
const FIELDS = [
  { key: 'name', label: 'Template name', placeholder: 'e.g. Instagram Story', required: true },
  { key: 'source', label: 'utm_source', placeholder: 'instagram' },
  { key: 'medium', label: 'utm_medium', placeholder: 'story' },
  { key: 'campaign', label: 'utm_campaign', placeholder: 'summer_sale' },
  { key: 'term', label: 'utm_term', placeholder: 'keyword' },
  { key: 'content', label: 'utm_content', placeholder: 'banner_a' },
]

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
      dispatch(showToast({ message: extractError(err), type: 'error' }))
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Save UTM presets to apply consistently when shortening links.</p>
        <button onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? 'Cancel' : 'New template'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FIELDS.map(({ key, label, placeholder, required }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                <input value={(form as any)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  required={required}
                  className="input"
                  placeholder={placeholder} />
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={isCreating} className="btn-primary">
              {isCreating ? 'Saving…' : 'Save template'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : !data?.templates?.length ? (
          <div className="p-14 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Tag size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No templates yet. Create one to enforce UTM standards.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.templates.map((t: any) => (
              <div key={t.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/60 transition-colors group">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Tag size={14} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 flex flex-wrap gap-x-3">
                    {[['source', t.source], ['medium', t.medium], ['campaign', t.campaign]]
                      .filter(([, v]) => v)
                      .map(([k, v]) => <span key={k}>{k}: <span className="text-gray-600">{v}</span></span>)}
                  </div>
                </div>
                <button onClick={() => del(t.id)} title="Delete"
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
