'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../store/slices/authSlice'
import { useLogoutMutation } from '../../store/api/authApi'
import { useAuthGuard } from '../../hooks/useAuthGuard'
import {
  Link2, BarChart2, QrCode, Tag, Target, Globe, Users, Key, Settings, LogOut, Menu, X, Zap,
} from 'lucide-react'

const NAV = [
  { href: '/dashboard',            label: 'Links',        icon: Link2 },
  { href: '/dashboard/analytics',  label: 'Analytics',    icon: BarChart2 },
  { href: '/dashboard/qr',         label: 'QR Codes',     icon: QrCode },
  { href: '/dashboard/utm',        label: 'UTM Builder',  icon: Tag },
  { href: '/dashboard/pixels',     label: 'Pixels',       icon: Target },
  { href: '/dashboard/bio',        label: 'Bio Page',     icon: Globe },
  { href: '/dashboard/workspaces', label: 'Workspaces',   icon: Users },
  { href: '/dashboard/api-keys',   label: 'API Keys',     icon: Key },
  { href: '/dashboard/settings',   label: 'Settings',     icon: Settings },
]

const PLAN_BADGE: Record<string, string> = {
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
      <div className="px-4 h-[60px] flex items-center justify-between border-b border-gray-100 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <span className="text-[17px] font-bold text-gray-900 tracking-tight">Urli</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}>
              <Icon size={16} className="shrink-0" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Upgrade nudge for free users */}
      {user?.plan === 'FREE' && (
        <div className="mx-3 mb-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-3.5">
          <div className="text-white text-xs font-semibold mb-0.5">Unlock Pro features</div>
          <div className="text-blue-100 text-[11px] mb-2.5">Unlimited links, deep analytics & more</div>
          <Link href="/pricing"
            className="block text-center bg-white text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
            Upgrade now →
          </Link>
        </div>
      )}

      {/* User */}
      <div className="p-3 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate leading-tight">{user?.name || '…'}</div>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-medium ${PLAN_BADGE[user?.plan || 'FREE']}`}>
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

  const currentNav = NAV.find(n => n.href === pathname)
  const pageTitle = currentNav?.label || 'Dashboard'
  const PageIcon = currentNav?.icon

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[220px] flex-col shrink-0 border-r border-gray-100 bg-white shadow-[1px_0_0_0_#f3f4f6]">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-[220px] h-full shadow-2xl">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-6 h-[60px] flex items-center gap-3 shrink-0 shadow-[0_1px_0_0_#f3f4f6]">
          <button onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            {PageIcon && <PageIcon size={16} className="text-gray-400 shrink-0" />}
            <h1 className="text-sm font-semibold text-gray-900">{pageTitle}</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
