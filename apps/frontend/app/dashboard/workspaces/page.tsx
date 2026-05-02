'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetWorkspacesQuery, useCreateWorkspaceMutation, useRemoveMemberMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import type { RootState } from '../../../store'
import Link from 'next/link'

export default function WorkspacesPage() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data, isLoading } = useGetWorkspacesQuery()
  const [create, { isLoading: isCreating }] = useCreateWorkspaceMutation()
  const [removeMember] = useRemoveMemberMutation()
  const [name, setName] = useState('')

  if (user?.plan !== 'BUSINESS') {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center py-20">
        <div className="text-5xl mb-4">👥</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Workspaces</h1>
        <p className="text-gray-500 mb-6">Separate client accounts, assign roles, and audit who created which link. Available on Business plan.</p>
        <Link href="/pricing" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Upgrade to Business</Link>
      </div>
    )
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await create({ name }).unwrap()
      setName('')
      dispatch(showToast({ message: 'Workspace created!', type: 'success' }))
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed', type: 'error' }))
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Workspaces</h1>

      <form onSubmit={handleCreate} className="flex gap-3 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} required placeholder="New workspace name…"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" disabled={isCreating} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
          {isCreating ? 'Creating…' : 'Create workspace'}
        </button>
      </form>

      {isLoading ? <div className="text-center text-gray-400 py-12">Loading…</div> : (
        <div className="space-y-4">
          {data?.workspaces?.map((ws: any) => (
            <div key={ws.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">{ws.name}</h2>
              <div className="space-y-2">
                {ws.members?.map((m: any) => (
                  <div key={m.userId} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-900">{m.user?.name || m.userId}</span>
                      <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{m.role}</span>
                    </div>
                    {m.role !== 'OWNER' && (
                      <button onClick={() => removeMember({ workspaceId: ws.id, userId: m.userId })}
                        className="text-xs text-red-500 hover:text-red-700">Remove</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {data?.workspaces?.length === 0 && <div className="text-center text-gray-400 py-12">No workspaces yet.</div>}
        </div>
      )}
    </div>
  )
}
