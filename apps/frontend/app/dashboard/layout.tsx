'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../store/slices/authSlice'
import { useLogoutMutation } from '../../store/api/authApi'
import { useAuthGuard } from '../../hooks/useAuthGuard'

const NAV = [
  { href: '/dashboard', label: 'Links', icon: '🔗' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📊' },
  { href: '/dashboard/qr', label: 'QR Codes', icon: '📱' },
  { href: '/dashboard/utm', label: 'UTM Templates', icon: '🏷️' },
  { href: '/dashboard/pixels', label: 'Pixels', icon: '🎯' },
  { href: '/dashboard/bio', label: 'Bio Page', icon: '🌐' },
  { href: '/dashboard/workspaces', label: 'Workspaces', icon: '👥' },
  { href: '/dashboard/api-keys', label: 'API Keys', icon: '🔑' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useAuthGuard()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    await logout().catch(() => {})
    dispatch(clearAuth())
    router.push('/')
  }

  const planColors: Record<string, string> = {
    FREE: 'bg-gray-100 text-gray-600',
    PRO: 'bg-blue-100 text-blue-700',
    BUSINESS: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Urli
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">✕</button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold border border-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              <span className="text-base">{icon}</span>
              <span>{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{user?.name}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${planColors[user?.plan || 'FREE']}`}>
              {user?.plan || 'FREE'}
            </span>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full text-left text-sm text-gray-500 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2">
          <span>↩</span> Sign out
        </button>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuthGuard()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Loading…</span>
        </div>
      </div>
    )
  }

  const pageTitle = NAV.find(n => n.href === pathname)?.label || 'Dashboard'

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-6 h-14 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
          <h1 className="text-base font-semibold text-gray-900">{pageTitle}</h1>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
