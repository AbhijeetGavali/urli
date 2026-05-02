'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetApiKeysQuery, useCreateApiKeyMutation, useDeleteApiKeyMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import type { RootState } from '../../../store'
import Link from 'next/link'

export default function ApiKeysPage() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data, isLoading } = useGetApiKeysQuery()
  const [create, { isLoading: isCreating, data: newKey }] = useCreateApiKeyMutation()
  const [del] = useDeleteApiKeyMutation()
  const [name, setName] = useState('')

  if (user?.plan === 'FREE') {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center py-20">
        <div className="text-5xl mb-4">🔑</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h1>
        <p className="text-gray-500 mb-6">Automate link creation via REST API. Available on Pro and Business plans.</p>
        <Link href="/pricing" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Upgrade to Pro</Link>
      </div>
    )
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await create({ name }).unwrap()
      setName('')
      dispatch(showToast({ message: 'API key created! Copy it now — it won\'t be shown again.', type: 'success' }))
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed', type: 'error' }))
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h1>
      <p className="text-sm text-gray-500 mb-6">Use API keys to create and manage links programmatically.</p>

      {newKey?.apiKey && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-green-800 mb-2">New API key — copy it now, it won't be shown again:</p>
          <code className="text-sm bg-white border border-green-200 rounded px-3 py-2 block break-all">{newKey.apiKey.key}</code>
        </div>
      )}

      <form onSubmit={handleCreate} className="flex gap-3 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} required placeholder="Key name (e.g. Zapier integration)"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" disabled={isCreating} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
          {isCreating ? 'Creating…' : 'Create key'}
        </button>
      </form>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {isLoading ? <div className="p-8 text-center text-gray-400">Loading…</div>
          : data?.apiKeys?.length === 0 ? <div className="p-12 text-center text-gray-400">No API keys yet.</div>
          : data?.apiKeys?.map((k: any) => (
            <div key={k.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 text-sm">{k.name}</div>
                <div className="text-xs text-gray-400">urli_••••••••••••••••••••••••••••••••</div>
                <div className="text-xs text-gray-400">{k.lastUsedAt ? `Last used: ${new Date(k.lastUsedAt).toLocaleDateString()}` : 'Never used'}</div>
              </div>
              <button onClick={() => del(k.id)} className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50">Revoke</button>
            </div>
          ))}
      </div>
    </div>
  )
}
