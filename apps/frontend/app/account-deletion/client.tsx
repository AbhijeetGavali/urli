'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteAccountMutation } from '../../store/api/authApi'
import { clearAuth } from '../../store/slices/authSlice'
import type { RootState } from '../../store'
import Link from 'next/link'

export default function AccountDeletionClient() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.auth.user)
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation()

  const [step, setStep] = useState<'confirm' | 'password' | 'done'>('confirm')
  const [password, setPassword] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [error, setError] = useState('')

  if (!user) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
        <p className="text-gray-600 mb-4">You must be signed in to delete your account.</p>
        <Link href="/login" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700">
          Sign in
        </Link>
      </div>
    )
  }

  if (step === 'done') {
    return (
      <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="font-semibold text-gray-900 mb-2">Account deleted</h3>
        <p className="text-sm text-gray-500">Your account and personal data have been permanently deleted. Redirecting…</p>
      </div>
    )
  }

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') { setError('Type DELETE to confirm'); return }
    setError('')
    try {
      await deleteAccount({ password: password || undefined }).unwrap()
      dispatch(clearAuth())
      setStep('done')
      setTimeout(() => router.push('/'), 2000)
    } catch (err: any) {
      setError(err?.data?.error || 'Deletion failed. Please try again or contact privacy@urli.app.')
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-red-100 p-6">
      <h2 className="font-semibold text-gray-900 mb-1">Confirm account deletion</h2>
      <p className="text-sm text-gray-500 mb-5">Signed in as <strong>{user.email}</strong></p>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}

      {/* Password confirmation for password-based accounts */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-gray-400 font-normal">(leave blank if you signed in with Google)</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Your current password"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type <strong>DELETE</strong> to confirm
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={e => setConfirmText(e.target.value)}
          placeholder="DELETE"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 font-mono"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading || confirmText !== 'DELETE'}
          className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Deleting…' : 'Permanently delete account'}
        </button>
      </div>
    </div>
  )
}
