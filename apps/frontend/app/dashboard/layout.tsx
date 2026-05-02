'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../store/slices/authSlice'
import { useLogoutMutation } from '../../store/api/authApi'
import { useAuthGuard } from '../../hooks/useAuthGuard'
import {
  Link2, BarChart2, QrCode, Tag, Target, Globe, Users, Key, Settings, LogOut, Menu, X,
} from 'lucide-react'

const NAV = [
  { href: '/dashboard',            label: 'Links',        icon: Link2 },
  { href: '/dashboard/analytics',  label: 'Analytics',    icon: BarChart2 },
  { href: '/dashboard/qr',         label: 'QR Codes',     icon: QrCode },
  { href: '/dashboard/utm',        label: 'UTM',          icon: Tag },
  { href: '/dashboard/pixels',     label: 'Pixels',       icon: Target },
  { href: '/dashboard/bio',        label: 'Bio Page',     icon: Globe },
  { href: '/dashboard/workspaces', label: 'Workspaces',   icon: Users },
  { href: '/dashboard/api-keys',   label: 'API Keys',     icon: Key },
  { href: '/dashboard/settings',   label: 'Settings',     icon: Settings },
]

const PLAN_STYLE: Record<string, string> = {
  FREE:     'bg-gray-100 text-gray-500',
  PRO:      'bg-blue-100 text-blue-700',
  BUSINESS: 'bg-violet-100 text-violet-700',
}

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

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="px-5 h-14 flex items-center justify-between border-b border-gray-100 shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shrink-0" />
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Urli</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
              <Icon size={16} className="shrink-0" />
              <span>{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate leading-tight">{user?.name || '…'}</div>
            <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${PLAN_STYLE[user?.plan || 'FREE']}`}>
              {user?.plan || 'FREE'}
            </span>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full text-left text-sm text-gray-500 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2">
          <LogOut size={14} /> Sign out
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
      <aside className="hidden md:flex w-60 flex-col shrink-0 border-r border-gray-100">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full shadow-2xl">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-4 md:px-6 h-14 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <Menu size={18} />
          </button>
          <h1 className="text-sm font-semibold text-gray-900">{pageTitle}</h1>
        </header>
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  )
}
