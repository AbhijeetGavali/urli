'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '@/store/api/authApi'
import { handleAuthSuccess, handleAuthError } from '../utils'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const data = await login(form).unwrap()
      handleAuthSuccess(dispatch, data, router)
    } catch (err: any) {
      setError(err?.data?.error || 'Invalid credentials')
      handleAuthError(dispatch, err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl" />
            Urli
          </Link>
          <p className="text-blue-200/70 mt-2 text-sm">Sign in to your account</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm p-3 rounded-xl mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-1.5">Email</label>
              <input type="email" required value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-blue-100">Password</label>
                <Link href="/forgot-password" className="text-xs text-blue-300 hover:text-white transition-colors">Forgot password?</Link>
              </div>
              <input type="password" required value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 shadow-lg">
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="text-center text-sm text-blue-200/70 mt-6">
            No account?{' '}
            <Link href="/register" className="text-white font-medium hover:underline">Start free trial →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
