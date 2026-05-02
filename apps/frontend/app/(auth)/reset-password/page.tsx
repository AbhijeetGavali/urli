'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useResetPasswordMutation } from '../../store/api/authApi'
import { showToast } from '../../store/slices/uiSlice'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [password, setPassword] = useState('')
  const token = searchParams.get('token') || ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await resetPassword({ token, password }).unwrap()
      dispatch(showToast({ message: 'Password reset! Please sign in.', type: 'success' }))
      router.push('/login')
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Reset failed', type: 'error' }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">Urli</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Set new password</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
              <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8+ characters" />
            </div>
            <button type="submit" disabled={isLoading || !token}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
              {isLoading ? 'Resetting…' : 'Reset password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
