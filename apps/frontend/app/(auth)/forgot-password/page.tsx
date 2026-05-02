'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useForgotPasswordMutation } from '../../store/api/authApi'
import { showToast } from '../../store/slices/uiSlice'

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">Urli</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Reset your password</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <p className="text-gray-700 font-medium mb-2">Check your email</p>
              <p className="text-sm text-gray-500">We sent a password reset link to {email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
                {isLoading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          )}
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link href="/login" className="text-blue-600 hover:underline">Back to sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
