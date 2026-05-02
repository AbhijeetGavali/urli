'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useGetPlansQuery, useCreateSubscriptionMutation, useVerifyPaymentMutation } from '../../store/api/miscApi'
import { showToast } from '../../store/slices/uiSlice'
import { setUser } from '../../store/slices/authSlice'
import type { RootState } from '../../store'
import { initiatePayment } from './utils'
import Link from 'next/link'

// Founder's Pricing — locked in for all users who subscribe at these rates.
// Future pricing changes will NOT affect existing subscribers.
const STATIC_PLANS = [
  {
    id: 'FREE',
    name: 'Free',
    price: 0,
    features: [
      '5 short links',
      'Basic click tracking',
      'QR code generation',
      '30-day analytics history',
    ],
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 99900, // ₹999 in paise
    features: [
      'Unlimited short links',
      'Deep analytics (forever)',
      'Retargeting pixels',
      'Link expiry & click limits',
      'UTM template builder',
      'Link-in-bio page',
      'Custom slug',
      'API access',
    ],
  },
  {
    id: 'BUSINESS',
    name: 'Business',
    price: 299900, // ₹2999 in paise
    features: [
      'Everything in Pro',
      'Team workspaces',
      'Custom domain',
      'Smart redirects',
      'Priority support',
      'White-label QR codes',
      'Advanced analytics export',
      'SSO / SAML (coming soon)',
    ],
  },
]

export default function PricingPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((s: RootState) => s.auth.user)
  const { data: plansData } = useGetPlansQuery()
  const [createSub, { isLoading }] = useCreateSubscriptionMutation()
  const [verifyPayment] = useVerifyPaymentMutation()

  // Use backend plans if available, fall back to static
  const plans = plansData?.plans?.length ? plansData.plans : STATIC_PLANS

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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold text-blue-600">Urli</Link>
        {user ? <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
          : <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign in</Link>}
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Founder's Pricing — Lock in this rate forever
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
          <p className="text-gray-500 text-lg">Subscribe now and keep this price for life — even when we raise rates.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {plans.map((plan: any) => {
            const isCurrent = user?.plan === plan.id
            const isPro = plan.id === 'PRO'
            const priceInr = plan.price > 0 ? Math.round(plan.price / 100) : 0
            return (
              <div key={plan.id} className={`bg-white rounded-2xl border p-6 relative ${isPro ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-100'}`}>
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </div>
                )}
                <div className="text-sm font-semibold text-gray-500 mb-1">{plan.name}</div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {priceInr === 0 ? 'Free' : `₹${priceInr.toLocaleString('en-IN')}`}
                  {priceInr > 0 && <span className="text-base font-normal text-gray-400">/mo</span>}
                </div>
                {priceInr > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-green-600 font-medium">30-day free trial</span>
                    <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">Founder's rate</span>
                  </div>
                )}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>{f}
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

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center max-w-2xl mx-auto">
          <p className="text-sm text-amber-800 font-medium">
            🔒 Founder's Pricing Guarantee — Subscribe today and your rate is locked in forever.
            We may increase prices in the future, but your subscription will never change.
          </p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">All prices in INR. Cancel anytime. No questions asked.</p>
      </div>
    </div>
  )
}
