'use client'
import { useState } from 'react'
import { X, Lightbulb, Loader2, Check } from 'lucide-react'
import { useSubmitFeatureRequestMutation } from '../../../store/api/miscApi'

const CATEGORIES = [
  { id: 'NEW_SECTION_TYPE',     label: 'New section type' },
  { id: 'NEW_VARIANT',          label: 'New section variant' },
  { id: 'NEW_PROFESSION',       label: 'New profession template' },
  { id: 'CUSTOMIZATION_OPTION', label: 'Customization option' },
  { id: 'BUG',                  label: 'Bug report' },
  { id: 'OTHER',                label: 'Other' },
] as const

export function FeatureRequestModal({ bioPageId, context, onClose }: {
  bioPageId?: string; context?: string; onClose: () => void
}) {
  const [category, setCategory] = useState('OTHER')
  const [description, setDescription] = useState('')
  const [isBlocking, setIsBlocking] = useState(false)
  const [done, setDone] = useState(false)
  const [submit, { isLoading, isError }] = useSubmitFeatureRequestMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submit({ category, description, isBlocking, bioPageId, context }).unwrap()
      setDone(true)
    } catch {}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pb-4 sm:pb-0 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
          <X size={16} />
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Check size={22} className="text-green-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Request submitted!</h3>
            <p className="text-sm text-gray-500 mb-4">We'll review it and update you when the status changes.</p>
            <button type="button" onClick={onClose} className="btn-primary w-full">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Lightbulb size={16} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Request a feature</h3>
                <p className="text-xs text-gray-500">Tell us what's missing</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="label">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="input text-sm">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Description <span className="text-gray-400">({description.length}/1000)</span></label>
                <textarea value={description} onChange={e => setDescription(e.target.value.slice(0, 1000))}
                  rows={4} required minLength={10}
                  placeholder="Describe what you need and why it would help you…"
                  className="input resize-none text-sm" />
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={isBlocking} onChange={e => setIsBlocking(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700">This is blocking me from using the product</span>
              </label>
              {isError && <p className="text-xs text-red-500">Something went wrong. Please try again.</p>}
            </div>
            <div className="mt-5 flex gap-2">
              <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" disabled={isLoading || description.trim().length < 10} className="btn-primary flex-1 gap-2">
                {isLoading ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : 'Submit request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
