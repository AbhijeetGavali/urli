'use client'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import { useGetStatusQuery, useCancelSubscriptionMutation } from '../../../store/api/miscApi'
import { useDispatch } from 'react-redux'
import { showToast } from '../../../store/slices/uiSlice'
import Link from 'next/link'

export default function SettingsPage() {
  const user = useSelector((s: RootState) => s.auth.user)
  const dispatch = useDispatch()
  const { data: subData } = useGetStatusQuery()
  const [cancel, { isLoading }] = useCancelSubscriptionMutation()

  const handleCancel = async () => {
    if (!confirm('Cancel your subscription? You\'ll be downgraded to Free at the end of the billing period.')) return
    try {
      await cancel().unwrap()
      dispatch(showToast({ message: 'Subscription cancelled', type: 'success' }))
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed', type: 'error' }))
    }
  }

  const accessToken = useSelector((s: RootState) => s.auth.accessToken)

  const handleExport = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
    if (!accessToken) { dispatch(showToast({ message: 'Not authenticated', type: 'error' })); return }
    fetch(`${apiUrl}/auth/export-data`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = 'urli-data-export.json'; a.click()
        URL.revokeObjectURL(url)
      })
      .catch(() => dispatch(showToast({ message: 'Export failed', type: 'error' })))
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Profile */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Profile</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-gray-900">{user?.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-gray-900">{user?.email}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Email verified</span>
            <span className={user?.emailVerified ? 'text-green-600' : 'text-amber-600'}>{user?.emailVerified ? 'Verified' : 'Not verified'}</span>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
        <h2 className="font-semibold text-gray-900 mb-4">Subscription</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Current plan</span>
            <span className="font-semibold text-gray-900 capitalize">{user?.plan?.toLowerCase()}</span>
          </div>
          {subData?.subscription && (
            <>
              <div className="flex justify-between"><span className="text-gray-500">Status</span>
                <span className="capitalize">{subData.subscription.status?.toLowerCase()}</span>
              </div>
              {subData.subscription.trialEndsAt && (
                <div className="flex justify-between"><span className="text-gray-500">Trial ends</span>
                  <span>{new Date(subData.subscription.trialEndsAt).toLocaleDateString()}</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex gap-3 mt-4">
          <Link href="/pricing" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Upgrade plan</Link>
          {user?.plan !== 'FREE' && (
            <button onClick={handleCancel} disabled={isLoading}
              className="text-sm text-red-500 hover:text-red-700 px-4 py-2 rounded-lg border border-red-100 hover:bg-red-50 disabled:opacity-60">
              {isLoading ? 'Cancelling…' : 'Cancel subscription'}
            </button>
          )}
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
        <h2 className="font-semibold text-gray-900 mb-1">Data & Privacy</h2>
        <p className="text-xs text-gray-400 mb-4">Your rights under GDPR and Indian IT Act</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <div>
              <div className="text-sm font-medium text-gray-800">Export my data</div>
              <div className="text-xs text-gray-400">Download all your data as JSON (GDPR data portability)</div>
            </div>
            <button onClick={handleExport} className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors">
              Export
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-gray-800">Privacy Policy</div>
              <div className="text-xs text-gray-400">How we collect and use your data</div>
            </div>
            <Link href="/privacy" target="_blank" className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              View
            </Link>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl border border-red-100 p-5">
        <h2 className="font-semibold text-red-700 mb-1">Danger Zone</h2>
        <p className="text-xs text-gray-400 mb-4">Irreversible actions — proceed with caution</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-800">Delete account</div>
            <div className="text-xs text-gray-400">Permanently delete your account and all data</div>
          </div>
          <Link href="/account-deletion" className="text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 transition-colors">
            Delete account
          </Link>
        </div>
      </div>
    </div>
  )
}
