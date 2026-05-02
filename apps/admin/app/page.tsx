'use client'
import { useState } from 'react'
import { useGetStatsQuery, useGetUsersQuery, useUpdateUserMutation } from '../store/adminApi'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { adminApi } from '../store/adminApi'

const store = configureStore({
  reducer: { [adminApi.reducerPath]: adminApi.reducer },
  middleware: (gDM) => gDM().concat(adminApi.middleware),
})

function AdminDashboard() {
  const [page, setPage] = useState(1)
  const { data: stats } = useGetStatsQuery()
  const { data: usersData, isLoading } = useGetUsersQuery({ page, limit: 20 })
  const [updateUser] = useUpdateUserMutation()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center">
        <h1 className="text-lg font-bold text-gray-900">Urli Admin</h1>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total users', value: stats?.users ?? '—' },
            { label: 'Total links', value: stats?.links ?? '—' },
            { label: 'Pro users', value: '—' },
            { label: 'MRR', value: '—' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Users</h2>
          </div>
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Loading…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Email', 'Plan', 'Role', 'Verified', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {usersData?.users?.map((u: any) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                      <td className="px-4 py-3 text-gray-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <select value={u.plan} onChange={e => updateUser({ id: u.id, data: { plan: e.target.value } })}
                          className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          {['FREE', 'PRO', 'BUSINESS'].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select value={u.role} onChange={e => updateUser({ id: u.id, data: { role: e.target.value } })}
                          className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
                          {['USER', 'ADMIN'].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${u.emailVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {u.emailVerified ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-red-500 hover:text-red-700">Suspend</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {usersData?.total > 20 && (
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="text-sm text-gray-500 disabled:opacity-40">← Prev</button>
              <span className="text-sm text-gray-400">Page {page} of {Math.ceil(usersData.total / 20)}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={usersData?.users?.length < 20} className="text-sm text-gray-500 disabled:opacity-40">Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return <Provider store={store}><AdminDashboard /></Provider>
}
