"use client";
import { extractError } from '@/lib/extractError'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetApiKeysQuery,
  useCreateApiKeyMutation,
  useDeleteApiKeyMutation,
} from "../../../store/api/miscApi";
import { showToast } from "../../../store/slices/uiSlice";
import type { RootState } from "../../../store";
import Link from "next/link";
import { Key, Plus, Trash2, Copy, Zap } from "lucide-react";

export default function ApiKeysPage() {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const { data, isLoading } = useGetApiKeysQuery();
  const [create, { isLoading: isCreating, data: newKey }] =
    useCreateApiKeyMutation();
  const [del] = useDeleteApiKeyMutation();
  const [name, setName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (user?.plan === "FREE") {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Key size={24} className="text-blue-500" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            API Keys
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Automate link creation via REST API. Available on Pro and Business
            plans.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <Zap size={14} fill="white" /> Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create({ name }).unwrap();
      setName("");
      dispatch(
        showToast({
          message: "API key created! Copy it now - it won't be shown again.",
          type: "success",
        }),
      );
    } catch (err: any) {
      dispatch(
        showToast({ message: extractError(err), type: "error" }),
      );
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Revoke API key "${name}"? Any integrations using it will stop working.`)) return;
    setDeletingId(id);
    try { await del(id).unwrap(); }
    catch (err: any) { dispatch(showToast({ message: extractError(err), type: "error" })); }
    finally { setDeletingId(null); }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    dispatch(showToast({ message: "Copied!", type: "success" }));
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      <p className="text-sm text-gray-500">
        Use API keys to create and manage links programmatically.
      </p>

      {/* New key banner */}
      {newKey?.apiKey && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <p className="text-sm font-semibold text-emerald-800 mb-2">
            ✓ New API key - copy it now, it won't be shown again:
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm bg-white border border-emerald-200 rounded-xl px-3 py-2 break-all font-mono">
              {newKey.apiKey.key}
            </code>
            <button
              onClick={() => handleCopy(newKey.apiKey.key)}
              className="p-2.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 text-emerald-700 transition-colors shrink-0"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Create form */}
      <form onSubmit={handleCreate} className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Key name (e.g. Zapier integration)"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <button
          type="submit"
          disabled={isCreating}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors whitespace-nowrap"
        >
          <Plus size={14} /> {isCreating ? "Creating…" : "Create key"}
        </button>
      </form>

      {/* Keys list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : !data?.apiKeys?.length ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Key size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">
              No API keys yet. Create one above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.apiKeys.map((k: any) => (
              <div
                key={k.id}
                className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/60 transition-colors group"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Key size={14} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">
                    {k.name}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">
                    urli_••••••••••••••••••••••••••••••••
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {k.lastUsedAt
                      ? `Last used ${new Date(k.lastUsedAt).toLocaleDateString()}`
                      : "Never used"}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(k.id, k.name)}
                  title="Revoke key"
                  disabled={deletingId === k.id}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 size={14} className={deletingId === k.id ? "animate-pulse" : ""} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
