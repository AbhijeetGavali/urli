"use client";
import { extractError } from "@/lib/extractError";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/authApi";
import { handleAuthSuccess, handleAuthError } from "../utils";
import { Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get("returnTo") || undefined;
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(form).unwrap();
      handleAuthSuccess(dispatch, data, router, returnTo);
    } catch (err: any) {
      setError(extractError(err));
      handleAuthError(dispatch, err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0f1e] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(59,130,246,0.15),transparent)]" />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="text-white font-bold text-lg">Urli</span>
          </Link>
        </div>
        <div className="relative">
          <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">
            "Switched from Bitly after they started showing ads on my links.
            Urli is cleaner and cheaper."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              JT
            </div>
            <div>
              <div className="text-white text-sm font-medium">James T.</div>
              <div className="text-gray-500 text-xs">Newsletter Creator</div>
            </div>
          </div>
        </div>
        <div className="relative text-xs text-gray-600">
          A product of{" "}
          <a
            href="https://ideasprout.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            IdeaSprout
          </a>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-gray-900">Urli</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="input"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="input"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 shadow-sm shadow-blue-200 mt-2"
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            No account?{" "}
            <Link
              href={`/register${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Start free trial →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
