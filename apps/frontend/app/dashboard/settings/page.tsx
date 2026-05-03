"use client";
import { extractError } from '@/lib/extractError'
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useGetStatusQuery, useCancelSubscriptionMutation } from "../../../store/api/miscApi";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/uiSlice";
import Link from "next/link";
import { User, CreditCard, Shield, AlertTriangle, Download, ExternalLink, CheckCircle, XCircle } from "lucide-react";

const PLAN_BADGE: Record<string, string> = {
  FREE: "bg-gray-100 text-gray-600",
  PRO: "bg-blue-100 text-blue-700",
  BUSINESS: "bg-violet-100 text-violet-700",
};

export default function SettingsPage() {
  const user = useSelector((s: RootState) => s.auth.user);
  const accessToken = useSelector((s: RootState) => s.auth.accessToken);
  const dispatch = useDispatch();
  const { data: subData } = useGetStatusQuery();
  const [cancel, { isLoading }] = useCancelSubscriptionMutation();

  const handleCancel = async () => {
    if (!confirm("Cancel your subscription? You'll be downgraded to Free at the end of the billing period.")) return;
    try {
      await cancel().unwrap();
      dispatch(showToast({ message: "Subscription cancelled", type: "success" }));
    } catch (err: any) {
      dispatch(showToast({ message: extractError(err), type: "error" }));
    }
  };

  const handleExport = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (!accessToken) { dispatch(showToast({ message: "Not authenticated", type: "error" })); return; }
    fetch(`${apiUrl}/auth/export-data`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((r) => r.blob())
      .then((blob) => {
        const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "urli-data-export.json" });
        a.click(); URL.revokeObjectURL(a.href);
      })
      .catch(() => dispatch(showToast({ message: "Export failed", type: "error" })));
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-4">
      {/* Profile */}
      <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
          <User size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
        </div>
        <div className="px-5 py-4 divide-y divide-gray-50">
          {[{ label: "Name", value: user?.name }, { label: "Email", value: user?.email }].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-medium text-gray-900">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-gray-500">Email verified</span>
            <div className="flex items-center gap-1.5">
              {user?.emailVerified
                ? <><CheckCircle size={14} className="text-emerald-500" /><span className="text-sm font-medium text-emerald-600">Verified</span></>
                : <><XCircle size={14} className="text-amber-500" /><span className="text-sm font-medium text-amber-600">Not verified</span></>}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
          <CreditCard size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Subscription</h2>
        </div>
        <div className="px-5 py-4 divide-y divide-gray-50">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-gray-500">Current plan</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${PLAN_BADGE[user?.plan || "FREE"]}`}>
              {user?.plan || "FREE"}
            </span>
          </div>
          {subData?.subscription?.status && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`text-sm font-medium capitalize ${subData.subscription.status === 'TRIALING' ? 'text-emerald-600' : 'text-gray-900'}`}>
                {subData.subscription.status === 'TRIALING' ? 'Free trial' : subData.subscription.status.toLowerCase()}
              </span>
            </div>
          )}
          {subData?.subscription?.trialEndsAt && subData.subscription.status === 'TRIALING' && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-gray-500">Trial ends</span>
              <span className="text-sm font-semibold text-amber-600">
                {new Date(subData.subscription.trialEndsAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>
        <div className="px-5 pb-4 flex gap-2.5">
          <Link href="/pricing" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            {user?.plan === "FREE" ? "Upgrade plan" : "Change plan"}
          </Link>
          {user?.plan !== "FREE" && (
            <button onClick={handleCancel} disabled={isLoading}
              className="text-sm text-red-500 hover:text-red-700 px-4 py-2 rounded-xl border border-red-100 hover:bg-red-50 disabled:opacity-60 transition-colors">
              {isLoading ? "Cancelling…" : "Cancel subscription"}
            </button>
          )}
        </div>
      </section>

      {/* Data & Privacy */}
      <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
          <Shield size={15} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Data & Privacy</h2>
        </div>
        <div className="divide-y divide-gray-50">
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-gray-800">Export my data</div>
              <div className="text-xs text-gray-400 mt-0.5">Download all your data as JSON (GDPR)</div>
            </div>
            <button onClick={handleExport}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors shrink-0">
              <Download size={13} /> Export
            </button>
          </div>
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-gray-800">Privacy Policy</div>
              <div className="text-xs text-gray-400 mt-0.5">How we collect and use your data</div>
            </div>
            <Link href="/privacy" target="_blank"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors shrink-0">
              View <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="bg-white rounded-2xl border border-red-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-red-50 flex items-center gap-2.5">
          <AlertTriangle size={15} className="text-red-400" />
          <h2 className="text-sm font-semibold text-red-700">Danger Zone</h2>
        </div>
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-gray-800">Delete account</div>
            <div className="text-xs text-gray-400 mt-0.5">Permanently delete your account and all data</div>
          </div>
          <Link href="/account-deletion"
            className="text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors shrink-0">
            Delete account
          </Link>
        </div>
      </section>
    </div>
  );
}
