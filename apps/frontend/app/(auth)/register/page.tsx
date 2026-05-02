'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '@/store/api/authApi'
import { handleAuthSuccess, handleAuthError } from '../utils'

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [register, { isLoading }] = useRegisterMutation()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) { setError('You must accept the Terms of Use and Privacy Policy.'); return }
    setError('')
    try {
      const data = await register({ ...form, termsAccepted: true }).unwrap()
      handleAuthSuccess(dispatch, data, router)
    } catch (err: any) {
      setError(err?.data?.error || 'Registration failed')
      handleAuthError(dispatch, err)
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
          <p className="text-blue-200/70 mt-2 text-sm">30-day Pro trial — no credit card needed</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm p-3 rounded-xl mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full name', type: 'text', placeholder: 'Jane Smith' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { key: 'password', label: 'Password', type: 'password', placeholder: '8+ characters' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-blue-100 mb-1.5">{label}</label>
                <input type={type} required value={(form as any)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder={placeholder} />
              </div>
            ))}

            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-400 shrink-0" />
              <span className="text-xs text-blue-200/80 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" target="_blank" className="text-white hover:underline font-medium">Terms of Use</Link>
                {' '}and{' '}
                <Link href="/privacy" target="_blank" className="text-white hover:underline font-medium">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={isLoading || !termsAccepted}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg">
              {isLoading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p className="text-center text-sm text-blue-200/70 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-white font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
