'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useGetPlansQuery, useCreateSubscriptionMutation, useVerifyPaymentMutation } from '../../store/api/miscApi'
import { showToast } from '../../store/slices/uiSlice'
import { setUser } from '../../store/slices/authSlice'
import type { RootState } from '../../store'
import { initiatePayment } from './utils'
import Link from 'next/link'

export default function PricingPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data: plansData } = useGetPlansQuery()
  const [createSub, { isLoading }] = useCreateSubscriptionMutation()
  const [verifyPayment] = useVerifyPaymentMutation()

  const handleSubscribe = async (planId: string) => {
    if (!user) { router.push('/register'); return }
    if (planId === 'FREE') return

    try {
      const { subscriptionId } = await createSub({ plan: planId }).unwrap()
      await initiatePayment({
        subscriptionId,
        plan: planId,
        user,
        onSuccess: async (paymentData: any) => {
          try {
            await verifyPayment(paymentData).unwrap()
            dispatch(setUser({ ...user, plan: planId }))
            dispatch(showToast({ message: 'Subscription activated! 🎉', type: 'success' }))
            router.push('/dashboard')
          } catch {
            dispatch(showToast({ message: 'Payment verification failed. Contact support.', type: 'error' }))
          }
        },
        onError: () => dispatch(showToast({ message: 'Payment failed. Please try again.', type: 'error' })),
      })
    } catch (err: any) {
      dispatch(showToast({ message: err?.data?.error || 'Failed to initiate payment', type: 'error' }))
    }
  }

  const plans = plansData?.plans || []

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold text-blue-600">Urli</Link>
        {user ? <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
          : <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>}
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
          <p className="text-gray-500 text-lg">No tricks. No interstitials. 30-day free trial on all paid plans.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan: any) => {
            const isCurrent = user?.plan === plan.id
            const isPro = plan.id === 'PRO'
            return (
              <div key={plan.id} className={`bg-white rounded-2xl border p-6 relative ${isPro ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-100'}`}>
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most popular
                  </div>
                )}
                <div className="text-sm font-semibold text-gray-500 mb-1">{plan.name}</div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {plan.price === 0 ? 'Free' : `₹${plan.price / 100}`}
                  {plan.price > 0 && <span className="text-base font-normal text-gray-400">/mo</span>}
                </div>
                {plan.price > 0 && <div className="text-xs text-green-600 mb-4">30-day free trial</div>}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrent || isLoading || plan.id === 'FREE'}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    isCurrent ? 'bg-gray-100 text-gray-400 cursor-default'
                    : plan.id === 'FREE' ? 'bg-gray-100 text-gray-600 cursor-default'
                    : isPro ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}>
                  {isCurrent ? 'Current plan' : plan.id === 'FREE' ? 'Get started free' : `Start ${plan.name} trial`}
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">All prices in INR. Cancel anytime. No questions asked.</p>
      </div>
    </div>
  )
}
