'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useForgotPasswordMutation } from '@/store/api/authApi'
import { showToast } from '@/store/slices/uiSlice'

export default function ForgotPasswordPage() {
  const dispatch = useDispatch()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await forgotPassword({ email }).unwrap()
      setSent(true)
    } catch {
      dispatch(showToast({ message: 'Failed to send reset email', type: 'error' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl" />
            Urli
          </Link>
          <p className="text-blue-200/70 mt-2 text-sm">Reset your password</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">📧</div>
              <p className="text-white font-semibold mb-2">Check your inbox</p>
              <p className="text-sm text-blue-200/70">We sent a reset link to <span className="text-white">{email}</span></p>
              <Link href="/login" className="inline-block mt-6 text-sm text-blue-300 hover:text-white transition-colors">← Back to sign in</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-1.5">Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg">
                {isLoading ? 'Sending…' : 'Send reset link'}
              </button>
              <p className="text-center text-sm text-blue-200/70 pt-1">
                <Link href="/login" className="text-blue-300 hover:text-white transition-colors">← Back to sign in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
