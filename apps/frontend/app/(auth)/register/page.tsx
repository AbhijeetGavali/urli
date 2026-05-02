'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '@/store/api/authApi'
import { handleAuthSuccess, handleAuthError } from '../utils'
import { Zap, Check } from 'lucide-react'

const PERKS = [
  '30-day Pro trial — no credit card',
  'Unlimited links after trial at ₹999/mo',
  'Deep analytics, pixels, QR codes',
  'Founder\'s pricing locked in forever',
]

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [register, { isLoading }] = useRegisterMutation()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) { setError('Please accept the Terms of Use and Privacy Policy.'); return }
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0f1e] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(59,130,246,0.15),transparent)]" />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="text-white font-bold text-lg">Urli</span>
          </Link>
        </div>
        <div className="relative space-y-4">
          <h2 className="text-white text-2xl font-bold">Everything you need to track links that convert</h2>
          <ul className="space-y-3">
            {PERKS.map(p => (
              <li key={p} className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="w-5 h-5 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                  <Check size={11} className="text-blue-400" strokeWidth={2.5} />
                </div>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative text-xs text-gray-600">
          A product of <a href="https://ideasprout.in" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">IdeaSprout</a>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-gray-900">Urli</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-8">30-day Pro trial · No credit card needed</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl mb-5">
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input type={type} required value={(form as any)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="input" placeholder={placeholder}
                  minLength={key === 'password' ? 8 : undefined} />
              </div>
            ))}

            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0" />
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">Terms of Use</Link>
                {' '}and{' '}
                <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={isLoading || !termsAccepted}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 shadow-sm shadow-blue-200">
              {isLoading ? 'Creating account…' : 'Start free trial'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
