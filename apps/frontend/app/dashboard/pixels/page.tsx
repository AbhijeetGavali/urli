"use client";
import { extractError } from '@/lib/extractError'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPixelsQuery, useCreatePixelMutation, useDeletePixelMutation, useLazyVerifyPixelQuery } from "../../../store/api/miscApi";
import { showToast } from "../../../store/slices/uiSlice";
import type { RootState } from "../../../store";
import Link from "next/link";
import { Plus, Trash2, Target, X, Zap, CheckCircle } from "lucide-react";

const PIXEL_ICONS: Record<string, string> = { FACEBOOK: "f", GOOGLE: "G" };
const PIXEL_COLORS: Record<string, string> = {
  FACEBOOK: "bg-blue-100 text-blue-700",
  GOOGLE: "bg-red-100 text-red-600",
};

export default function PixelsPage() {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const { data, isLoading } = useGetPixelsQuery();
  const [create, { isLoading: isCreating }] = useCreatePixelMutation();
  const [del] = useDeletePixelMutation();
  const [verifyPixel, { isFetching: isVerifying }] = useLazyVerifyPixelQuery();
  const [verifiedId, setVerifiedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", type: "FACEBOOK", pixelId: "" });
  const [showForm, setShowForm] = useState(false);

  const handleVerify = async (id: string) => {
    try {
      await verifyPixel(id).unwrap();
      setVerifiedId(id);
      dispatch(showToast({ message: "Pixel verified!", type: "success" }));
      setTimeout(() => setVerifiedId(null), 3000);
    } catch (err: any) {
      dispatch(showToast({ message: extractError(err), type: "error" }));
    }
  };

  if (user?.plan === "FREE") {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target size={24} className="text-blue-500" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Retargeting Pixels</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Attach Facebook or Google pixels to any link. Build retargeting audiences from every click.
          </p>
          <Link href="/pricing"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
            <Zap size={14} fill="white" /> Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await create(form).unwrap();
      setForm({ name: "", type: "FACEBOOK", pixelId: "" });
      setShowForm(false);
      dispatch(showToast({ message: "Pixel added!", type: "success" }));
    } catch (err: any) {
      dispatch(showToast({ message: extractError(err), type: "error" }));
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Add pixels to links to build retargeting audiences from every click.</p>
        <button onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add pixel"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required className="input" placeholder="My Facebook Pixel" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Platform</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="input">
                <option value="FACEBOOK">Facebook</option>
                <option value="GOOGLE">Google Ads</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Pixel ID</label>
              <input value={form.pixelId} onChange={e => setForm(f => ({ ...f, pixelId: e.target.value }))}
                required className="input" placeholder="123456789" />
            </div>
          </div>
          <button type="submit" disabled={isCreating} className="btn-primary">
            {isCreating ? "Saving…" : "Save pixel"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : !data?.pixels?.length ? (
          <div className="p-14 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No pixels yet. Add one to start retargeting.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.pixels.map((p: any) => (
              <div key={p.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/60 transition-colors group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${PIXEL_COLORS[p.type] || "bg-gray-100 text-gray-600"}`}>
                  {PIXEL_ICONS[p.type] || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.type} · ID: {p.pixelId}</div>
                </div>
                <button onClick={() => handleVerify(p.id)} title="Test pixel" disabled={isVerifying}
                  className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors opacity-0 group-hover:opacity-100">
                  <CheckCircle size={14} className={verifiedId === p.id ? "text-green-500" : ""} />
                </button>
                <button onClick={() => del(p.id)} title="Remove"
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
