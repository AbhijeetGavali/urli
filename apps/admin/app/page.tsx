'use client'
import { useState } from 'react'
import { useGetStatsQuery, useGetUsersQuery, useUpdateUserMutation, useSuspendUserMutation } from '../store/adminApi'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { adminApi } from '../store/adminApi'
import { Users, Link2, MousePointerClick, Activity, LogIn, Eye, EyeOff } from 'lucide-react'

const store = configureStore({
  reducer: { [adminApi.reducerPath]: adminApi.reducer },
  middleware: (gDM) => gDM().concat(adminApi.middleware),
})

const PLAN_BADGE: Record<string, string> = {
  FREE: 'bg-gray-100 text-gray-600',
  PRO: 'bg-blue-100 text-blue-700',
  BUSINESS: 'bg-violet-100 text-violet-700',
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [token, setToken] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) { setError('Token is required'); return }
    localStorage.setItem('adminToken', token.trim())
    onLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Urli Admin</h1>
          <p className="text-blue-200/70 mt-1 text-sm">Enter your admin token to continue</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm p-3 rounded-xl mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-1.5">Admin Token</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={token}
                  onChange={e => { setToken(e.target.value); setError('') }}
                  placeholder="Bearer token…"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-blue-200 transition-colors">
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg">
              <LogIn size={16} /> Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { data: stats } = useGetStatsQuery()
  const { data: usersData, isLoading } = useGetUsersQuery({ page, limit: 20, search: search || undefined })
  const [updateUser] = useUpdateUserMutation()
  const [suspendUser] = useSuspendUserMutation()

  const users = usersData?.users ?? []
  const total = usersData?.total ?? 0

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg" />
            <span className="font-bold text-gray-900">Urli Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">Internal</span>
            <button onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors border border-gray-200 hover:border-red-100">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users',   value: stats?.users   ?? '—', icon: Users,            color: 'text-blue-600',    bg: 'bg-blue-50' },
            { label: 'Total Links',   value: stats?.links   ?? '—', icon: Link2,             color: 'text-indigo-600',  bg: 'bg-indigo-50' },
            { label: 'Total Clicks',  value: stats?.clicks  ?? '—', icon: MousePointerClick, color: 'text-violet-600',  bg: 'bg-violet-50' },
            { label: 'Active Today',  value: stats?.activeToday ?? '—', icon: Activity,      color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
            <h2 className="font-semibold text-gray-900">Users</h2>
            <div className="flex items-center gap-3 flex-1 max-w-sm ml-auto">
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                placeholder="Search name or email…"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-16 text-center">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <span className="text-sm text-gray-400">Loading users…</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['User', 'Plan', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u: any) => (
                    <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 leading-tight">{u.name}</div>
                            <div className="text-xs text-gray-400">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={u.plan}
                          onChange={e => updateUser({ id: u.id, data: { plan: e.target.value } })}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${PLAN_BADGE[u.plan]}`}
                        >
                          {['FREE', 'PRO', 'BUSINESS'].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={u.role}
                          onChange={e => updateUser({ id: u.id, data: { role: e.target.value } })}
                          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          {['USER', 'ADMIN'].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                          u.suspended ? 'bg-red-50 text-red-700' :
                          u.emailVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            u.suspended ? 'bg-red-500' :
                            u.emailVerified ? 'bg-emerald-500' : 'bg-amber-500'
                          }`} />
                          {u.suspended ? 'Suspended' : u.emailVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => suspendUser({ id: u.id, suspended: !u.suspended })}
                          className={`text-xs px-3 py-1.5 rounded-lg transition-colors border ${
                            u.suspended
                              ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-transparent hover:border-emerald-100'
                              : 'text-red-500 hover:text-red-700 hover:bg-red-50 border-transparent hover:border-red-100'
                          }`}>
                          {u.suspended ? 'Unsuspend' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">No users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {total > 20 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                ← Previous
              </button>
              <span className="text-sm text-gray-400">Page {page} of {Math.ceil(total / 20)} · {total} users</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 20)}
                className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AdminApp() {
  const [authed, setAuthed] = useState(() =>
    typeof window !== 'undefined' && !!localStorage.getItem('adminToken')
  )

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />
  return <AdminDashboard />
}

export default function AdminPage() {
  return <Provider store={store}><AdminApp /></Provider>
}
