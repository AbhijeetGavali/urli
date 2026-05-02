"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useCreateLinkMutation } from "../store/api/linksApi";
import {
  useGetUTMTemplatesQuery,
  useGetPixelsQuery,
} from "../store/api/miscApi";
import { showToast } from "../store/slices/uiSlice";
import type { RootState } from "../store";

interface Props {
  onClose: () => void;
  onCreated?: () => void;
}

const TABS = ["Basic", "UTM", "Advanced"] as const;

export function CreateLinkModal({ onClose, onCreated }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const [createLink, { isLoading }] = useCreateLinkMutation();
  const { data: utmData } = useGetUTMTemplatesQuery();
  const { data: pixelData } = useGetPixelsQuery();

  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  const [form, setForm] = useState({
    originalUrl: "",
    slug: "",
    title: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    expiresAt: "",
    maxClicks: "",
    pixelIds: [] as string[],
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const applyTemplate = (t: any) => {
    setForm((f) => ({
      ...f,
      utmSource: t.source || "",
      utmMedium: t.medium || "",
      utmCampaign: t.campaign || "",
      utmTerm: t.term || "",
      utmContent: t.content || "",
    }));
    setTab("UTM");
  };

  const togglePixel = (id: string) => {
    setForm((f) => ({
      ...f,
      pixelIds: f.pixelIds.includes(id)
        ? f.pixelIds.filter((p) => p !== id)
        : [...f.pixelIds, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { originalUrl: form.originalUrl };
      if (form.slug) payload.slug = form.slug;
      if (form.title) payload.title = form.title;
      if (form.utmSource) payload.utmSource = form.utmSource;
      if (form.utmMedium) payload.utmMedium = form.utmMedium;
      if (form.utmCampaign) payload.utmCampaign = form.utmCampaign;
      if (form.utmTerm) payload.utmTerm = form.utmTerm;
      if (form.utmContent) payload.utmContent = form.utmContent;
      if (form.expiresAt)
        payload.expiresAt = new Date(form.expiresAt).toISOString();
      if (form.maxClicks) payload.maxClicks = Number(form.maxClicks);
      if (form.pixelIds.length) payload.pixelIds = form.pixelIds;
      await createLink(payload).unwrap();
      dispatch(showToast({ message: "Link created!", type: "success" }));
      onCreated?.();
      onClose();
    } catch (err: any) {
      dispatch(
        showToast({
          message: err?.data?.error || "Failed to create link",
          type: "error",
        }),
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Create short link
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {tab === "Basic" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Destination URL *
                  </label>
                  <input
                    value={form.originalUrl}
                    onChange={(e) => set("originalUrl", e.target.value)}
                    type="url"
                    required
                    placeholder="https://example.com/very-long-url"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Custom slug (optional)
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                    <span className="px-3 py-2.5 bg-gray-50 text-gray-400 text-sm border-r border-gray-200 whitespace-nowrap">
                      {process.env.NEXT_PUBLIC_SHORT_DOMAIN ||
                        "urli.ideasprout.in"}
                      /
                    </span>
                    <input
                      value={form.slug}
                      onChange={(e) => set("slug", e.target.value)}
                      placeholder="my-link"
                      pattern="[a-zA-Z0-9_-]+"
                      className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Leave blank to auto-generate. Letters, numbers, hyphens
                    only.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Title (optional)
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="e.g. Summer sale campaign"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {tab === "UTM" && (
              <>
                {utmData?.templates?.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Apply template
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {utmData.templates.map((t: any) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => applyTemplate(t)}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {[
                  {
                    key: "utmSource",
                    label: "Source",
                    placeholder: "e.g. instagram",
                  },
                  {
                    key: "utmMedium",
                    label: "Medium",
                    placeholder: "e.g. social",
                  },
                  {
                    key: "utmCampaign",
                    label: "Campaign",
                    placeholder: "e.g. summer-sale-2025",
                  },
                  {
                    key: "utmTerm",
                    label: "Term",
                    placeholder: "e.g. url shortener",
                  },
                  {
                    key: "utmContent",
                    label: "Content",
                    placeholder: "e.g. hero-button",
                  },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      {label}
                    </label>
                    <input
                      value={(form as any)[key]}
                      onChange={(e) => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </>
            )}

            {tab === "Advanced" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Expires at
                    </label>
                    <input
                      type="datetime-local"
                      value={form.expiresAt}
                      onChange={(e) => set("expiresAt", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Max clicks
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.maxClicks}
                      onChange={(e) => set("maxClicks", e.target.value)}
                      placeholder="Unlimited"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {user?.plan !== "FREE" && pixelData?.pixels?.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Retargeting pixels
                    </label>
                    <div className="space-y-2">
                      {pixelData.pixels.map((p: any) => (
                        <label
                          key={p.id}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={form.pixelIds.includes(p.id)}
                            onChange={() => togglePixel(p.id)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            {p.name}
                          </span>
                          <span className="text-xs text-gray-400 ml-auto">
                            {p.type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {user?.plan === "FREE" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    <strong>Pro features:</strong> Link expiry and retargeting
                    pixels require a Pro plan.
                    <Link href="/pricing" className="ml-1 underline">
                      Upgrade →
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !form.originalUrl}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isLoading ? "Creating…" : "Create link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
