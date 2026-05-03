"use client";
import { extractError } from '@/lib/extractError'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  useCreateSubscriptionMutation,
  useVerifyPaymentMutation,
} from "../../store/api/miscApi";
import { showToast } from "../../store/slices/uiSlice";
import { setUser } from "../../store/slices/authSlice";
import type { RootState } from "../../store";
import { initiatePayment } from "./utils";
import Link from "next/link";
import { Check, Shield, ChevronDown, ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "../../components/SiteLayout";

const PENDING_PLAN_KEY = "urli_pending_plan";

const PLANS = [
  {
    id: "FREE",
    name: "Starter",
    price: 0,
    badge: null,
    description: "Get started with no commitment",
    features: [
      "50 short links / month",
      "Basic click tracking",
      "QR code generation",
      "30-day analytics history",
    ],
    notIncluded: [
      "Retargeting pixels",
      "Link expiry",
      "UTM templates",
      "Link-in-bio page",
      "API access",
    ],
    cta: "Get started free",
    ctaStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  },
  {
    id: "PRO",
    name: "Pro",
    price: 999,
    badge: "Most popular",
    description: "Everything a creator or marketer needs",
    features: [
      "Unlimited short links",
      "Deep analytics - forever",
      "Retargeting pixels (FB + Google)",
      "Link expiry by date or clicks",
      "UTM template builder",
      "Link-in-bio page",
      "Custom slug",
      "REST API access",
      "Priority support",
    ],
    notIncluded: [],
    cta: "Start 30-day free trial",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  },
  {
    id: "BUSINESS",
    name: "Business",
    price: 2999,
    badge: null,
    description: "For teams, agencies, and power users",
    features: [
      "Everything in Pro",
      "Team workspaces (5 seats)",
      "Custom branded domain",
      "Geo & device smart redirects",
      "White-label QR codes",
      "Analytics CSV export",
      "Zapier integration",
      "Dedicated support",
    ],
    notIncluded: [],
    cta: "Start 30-day free trial",
    ctaStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  },
];

const FAQ = [
  {
    q: "Is the 30-day trial really free?",
    a: "Yes. You get full Pro features for 30 days at no cost. After that, ₹999/mo kicks in automatically. Cancel before day 30 and you won't be charged anything.",
  },
  {
    q: "What happens to my links if I cancel?",
    a: "Your short links keep working forever. You lose access to Pro features (analytics beyond 30 days, pixels, etc.) but nothing breaks for your visitors.",
  },
  {
    q: "Is Founder's Pricing really permanent?",
    a: "Yes. Subscribe at ₹999/mo or ₹2,999/mo today and that rate is yours forever - even when we raise prices for new customers.",
  },
  {
    q: "Can I upgrade or downgrade later?",
    a: "Yes, anytime. Upgrades take effect immediately. Downgrades apply at the end of your current billing period.",
  },
  {
    q: "Do you offer refunds?",
    a: "7-day no-questions-asked refund on your first payment. Email support@ideasprout.in and we'll process it same day.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-sm pr-4">{q}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((s: RootState) => s.auth.user);
  const [createSub, { isLoading }] = useCreateSubscriptionMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const autoTriggered = useRef(false);

  // After auth redirect back: auto-trigger payment for the pending plan
  useEffect(() => {
    if (!user || autoTriggered.current) return;
    const pendingPlan = sessionStorage.getItem(PENDING_PLAN_KEY);
    if (!pendingPlan) return;
    autoTriggered.current = true;
    sessionStorage.removeItem(PENDING_PLAN_KEY);
    handleSubscribe(pendingPlan);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubscribe = async (planId: string) => {
    if (planId === "FREE") { router.push("/dashboard"); return; }

    if (!user) {
      // Store the plan and redirect to register with returnTo
      sessionStorage.setItem(PENDING_PLAN_KEY, planId);
      router.push(`/register?returnTo=/pricing`);
      return;
    }

    try {
      const { subscriptionId } = await createSub({ plan: planId }).unwrap();
      await initiatePayment({
        subscriptionId,
        plan: planId,
        user,
        onSuccess: async (paymentData: any) => {
          try {
            const result = await verifyPayment(paymentData).unwrap();
            dispatch(setUser({ ...user, plan: result.plan ?? planId }));
            dispatch(showToast({ message: "Trial started! Enjoy 30 days free. 🎉", type: "success" }));
            router.push("/dashboard");
          } catch {
            dispatch(showToast({ message: "Payment verification failed. Contact support.", type: "error" }));
          }
        },
        onError: () => dispatch(showToast({ message: "Payment failed. Please try again.", type: "error" })),
      });
    } catch (err: any) {
      dispatch(showToast({ message: extractError(err), type: "error" }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteNav activePath="/pricing" />

      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-100 py-14 text-center">
        <div className="max-w-2xl mx-auto px-5">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            Founder's Pricing - Subscribe now, locked in forever
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Simple, honest pricing
          </h1>
          <p className="text-gray-500">
            No tricks. No ads on your links. 30-day free trial on all paid
            plans.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan) => {
            const isCurrent = user?.plan === plan.id;
            const isPro = plan.id === "PRO";
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border ${isPro ? "border-blue-500 ring-1 ring-blue-500/20 shadow-xl shadow-blue-100/50" : "border-gray-200"} bg-white overflow-hidden`}
              >
                {/* Top accent for Pro */}
                {isPro && (
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {plan.name}
                      </div>
                      <div className="flex items-baseline gap-1">
                        {plan.price === 0 ? (
                          <span className="text-3xl font-bold text-gray-900">
                            Free
                          </span>
                        ) : (
                          <>
                            <span className="text-lg font-semibold text-gray-500">
                              ₹
                            </span>
                            <span className="text-3xl font-bold text-gray-900">
                              {plan.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-gray-400">/mo</span>
                          </>
                        )}
                      </div>
                    </div>
                    {plan.badge && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mb-1">
                    {plan.description}
                  </p>

                  {plan.price > 0 && (
                    <div className="mb-4 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5">
                      <div className="text-xs font-semibold text-emerald-700">Free for 30 days</div>
                      <div className="text-[11px] text-emerald-600 mt-0.5">then ₹{plan.price.toLocaleString("en-IN")}/mo · cancel anytime</div>
                    </div>
                  )}

                  <div className="h-px bg-gray-100 mb-4" />

                  {/* Features */}
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check
                          size={14}
                          className={`shrink-0 mt-0.5 ${isPro ? "text-blue-500" : "text-green-500"}`}
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-400"
                      >
                        <span className="shrink-0 mt-0.5 w-3.5 h-3.5 flex items-center justify-center text-gray-300 text-xs">
                          -
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isCurrent || (isLoading && plan.id !== "FREE")}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] disabled:opacity-50 ${
                      isCurrent
                        ? "bg-gray-100 text-gray-400 cursor-default"
                        : plan.ctaStyle
                    }`}
                  >
                    {isCurrent ? "✓ Current plan" : plan.cta}
                  </button>

                  {plan.price > 0 && !isCurrent && (
                    <p className="text-center text-[11px] text-gray-400 mt-2">
                      No charge for 30 days · cancel anytime
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          {[
            { icon: "🔒", text: "Founder's rate locked forever" },
            { icon: "↩", text: "7-day refund guarantee" },
            { icon: "⚡", text: "Instant activation" },
            { icon: "🚫", text: "No ads on your links - ever" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="bg-gray-50 border-y border-gray-100 py-14">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Full feature comparison
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 w-1/2">
                    Feature
                  </th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-gray-400 text-center">
                    Starter
                  </th>
                  <th className="px-4 py-3.5 text-xs font-bold text-blue-700 text-center bg-blue-50/50">
                    Pro
                  </th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 text-center">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Short links / month", "50", "Unlimited", "Unlimited"],
                  ["Analytics history", "30 days", "Forever", "Forever"],
                  ["Retargeting pixels", false, true, true],
                  ["Link expiry", false, true, true],
                  ["UTM templates", false, true, true],
                  ["Link-in-bio page", false, true, true],
                  ["REST API", false, true, true],
                  ["Custom domain", false, false, true],
                  ["Team workspaces", false, false, true],
                  ["Smart redirects", false, false, true],
                  ["Analytics CSV export", false, false, true],
                ].map(([feat, free, pro, biz], i) => (
                  <tr
                    key={String(feat)}
                    className={i % 2 ? "bg-gray-50/30" : ""}
                  >
                    <td className="px-5 py-3 text-gray-700 text-xs font-medium">
                      {feat}
                    </td>
                    {[free, pro, biz].map((val, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 text-center ${j === 1 ? "bg-blue-50/20" : ""}`}
                      >
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check
                              size={14}
                              className="text-green-500 mx-auto"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <span className="text-gray-300 text-xs">-</span>
                          )
                        ) : (
                          <span className="text-xs font-medium text-gray-700">
                            {val}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-14">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {FAQ.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            More questions?{" "}
            <a
              href="mailto:support@ideasprout.in"
              className="text-blue-600 hover:underline"
            >
              Email us
            </a>{" "}
            - we reply within 24 hours.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-gray-100 bg-gray-50 py-14 text-center">
        <div className="max-w-lg mx-auto px-5">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Shield size={13} className="text-green-500" />
            30-day free trial · No credit card · Cancel anytime
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Start your free trial today
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Founder's pricing - ₹999/mo locked in forever when you subscribe
            now.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors shadow-sm"
          >
            Get started free <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
