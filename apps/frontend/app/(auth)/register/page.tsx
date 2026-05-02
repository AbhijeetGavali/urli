'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../../store/api/authApi'
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
    if (!termsAccepted) { setError('You must accept the Terms of Use and Privacy Policy to continue.'); return }
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Urli</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Start your free trial</h1>
          <p className="text-gray-500 mt-1">30 days Pro — no credit card needed</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
            {[
              { key: 'name', label: 'Full name', type: 'text', placeholder: 'Jane Smith' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { key: 'password', label: 'Password', type: 'password', placeholder: '8+ characters' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input type={type} required value={(form as any)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder} />
              </div>
            ))}

            {/* Consent checkbox — required for Google OAuth, GDPR, IT Act compliance */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                I have read and agree to the{' '}
                <Link href="/terms" target="_blank" className="text-blue-600 hover:underline font-medium">Terms of Use</Link>
                {' '}and{' '}
                <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>
                , including the collection and processing of my personal data as described therein.
              </label>
            </div>

            <button type="submit" disabled={isLoading || !termsAccepted}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
              {isLoading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
