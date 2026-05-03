'use client'
import { extractError } from '@/lib/extractError'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetWorkspacesQuery, useCreateWorkspaceMutation, useRemoveMemberMutation } from '../../../store/api/miscApi'
import { showToast } from '../../../store/slices/uiSlice'
import type { RootState } from '../../../store'
import Link from 'next/link'
import { Plus, Users, X, Zap } from 'lucide-react'

const ROLE_COLORS: Record<string, string> = {
  OWNER: 'bg-violet-100 text-violet-700',
  ADMIN: 'bg-blue-100 text-blue-700',
  MEMBER: 'bg-gray-100 text-gray-600',
}

export default function WorkspacesPage() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data, isLoading } = useGetWorkspacesQuery()
  const [create, { isLoading: isCreating }] = useCreateWorkspaceMutation()
  const [removeMember] = useRemoveMemberMutation()
  const [name, setName] = useState('')

  if (user?.plan !== 'BUSINESS') {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-blue-500" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Team Workspaces</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Separate client accounts, assign roles, and audit who created which link.
          </p>
          <Link href="/pricing"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
            <Zap size={14} fill="white" /> Upgrade to Business
          </Link>
        </div>
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
      dispatch(showToast({ message: extractError(err), type: 'error' }))
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleCreate} className="flex gap-3">
        <input value={name} onChange={e => setName(e.target.value)} required
          placeholder="New workspace name…" className="input flex-1" />
        <button type="submit" disabled={isCreating} className="btn-primary whitespace-nowrap">
          <Plus size={14} /> {isCreating ? 'Creating…' : 'Create'}
        </button>
      </form>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !data?.workspaces?.length ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users size={20} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No workspaces yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.workspaces.map((ws: any) => (
            <div key={ws.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-50 flex items-center gap-2.5">
                <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Users size={13} className="text-blue-500" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">{ws.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{ws.members?.length || 0} members</span>
              </div>
              <div className="divide-y divide-gray-50">
                {ws.members?.map((m: any) => (
                  <div key={m.userId} className="px-5 py-3 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {(m.user?.name || m.userId)?.[0]?.toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-800">{m.user?.name || m.userId}</span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${ROLE_COLORS[m.role] || 'bg-gray-100 text-gray-600'}`}>
                        {m.role}
                      </span>
                    </div>
                    {m.role !== 'OWNER' && (
                      <button onClick={() => removeMember({ workspaceId: ws.id, userId: m.userId })}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                        <X size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
