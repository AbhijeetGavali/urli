import Razorpay from 'razorpay'
import crypto from 'crypto'
import { subscriptionRepo } from '../repos/subscription.repo.js'
import { userRepo } from '../repos/user.repo.js'
import { AppError } from '../lib/errors.js'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const PLAN_IDS: Record<string, string> = {
  PRO: process.env.RAZORPAY_PRO_PLAN_ID!,
  BUSINESS: process.env.RAZORPAY_BUSINESS_PLAN_ID!,
}

export const subscriptionService = {
  getPlans: () => ({
    plans: [
      { id: 'FREE', name: 'Starter', price: 0, features: ['50 links/month', 'Basic analytics (30 days)', 'Static QR codes', 'No ads ever'] },
      { id: 'PRO', name: 'Pro', price: 1500, currency: 'INR', features: ['Unlimited links', '1 custom domain', 'Forever analytics', 'Link expiry', 'UTM presets', 'Retargeting pixels', 'Dynamic QR', 'Chrome extension', 'Link-in-bio', 'API access'] },
      { id: 'BUSINESS', name: 'Business', price: 4900, currency: 'INR', features: ['Everything in Pro', '5 team seats', '3 custom domains', 'Smart redirects', 'Team workspaces', 'White-label QR', 'Priority support'] },
    ],
  }),

  createSubscription: async (userId: string, plan: 'PRO' | 'BUSINESS') => {
    const planId = PLAN_IDS[plan]
    if (!planId) throw new AppError('Invalid plan', 400)

    // Reuse existing active/trialing Razorpay subscription if it exists
    const existing = await subscriptionRepo.findByUser(userId)
    if (existing?.razorpaySubId && ['TRIALING', 'ACTIVE'].includes(existing.status)) {
      return { subscriptionId: existing.razorpaySubId, plan }
    }

    const sub = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12,
      quantity: 1,
    } as any)

    await subscriptionRepo.upsertByUser(userId, {
      razorpaySubId: sub.id,
      plan,
      status: 'TRIALING',
      trialEndsAt: new Date(Date.now() + 30 * 86400_000),
    })

    return { subscriptionId: sub.id, plan }
  },

  verifyPayment: async (userId: string, data: { razorpay_subscription_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${data.razorpay_payment_id}|${data.razorpay_subscription_id}`)
      .digest('hex')

    if (expected !== data.razorpay_signature) throw new AppError('Invalid payment signature', 400)

    const sub = await subscriptionRepo.findByRazorpayId(data.razorpay_subscription_id)
    if (!sub) throw new AppError('Subscription not found', 404)

    await subscriptionRepo.update(sub.id, { status: 'ACTIVE' })
    await userRepo.update(userId, { plan: sub.plan })
    return { ok: true }
  },

  handleWebhook: async (body: string, signature: string) => {
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')
    if (expected !== signature) throw new AppError('Invalid webhook signature', 400)

    const event = JSON.parse(body)
    const subId = event.payload?.subscription?.entity?.id
    if (!subId) return

    const sub = await subscriptionRepo.findByRazorpayId(subId)
    if (!sub) return

    if (event.event === 'subscription.cancelled' || event.event === 'subscription.expired') {
      await subscriptionRepo.update(sub.id, { status: event.event === 'subscription.cancelled' ? 'CANCELLED' : 'EXPIRED' })
      await userRepo.update(sub.userId, { plan: 'FREE' })
    }
    if (event.event === 'subscription.activated') {
      await subscriptionRepo.update(sub.id, { status: 'ACTIVE' })
      await userRepo.update(sub.userId, { plan: sub.plan })
    }
  },

  cancel: async (userId: string) => {
    const sub = await subscriptionRepo.findByUser(userId)
    if (!sub?.razorpaySubId) throw new AppError('No active subscription', 404)
    await razorpay.subscriptions.cancel(sub.razorpaySubId, false)
    await subscriptionRepo.update(sub.id, { status: 'CANCELLED' })
    await userRepo.update(userId, { plan: 'FREE' })
  },

  getStatus: async (userId: string) => {
    return subscriptionRepo.findByUser(userId)
  },
}
