"use client";
import { extractError } from "@/lib/extractError";
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
import { X, ChevronDown, ChevronUp, Tag, Settings2, Link2 } from "lucide-react";

interface Props {
  onClose: () => void;
  onCreated?: () => void;
}

export function CreateLinkModal({ onClose, onCreated }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const [createLink, { isLoading }] = useCreateLinkMutation();
  const { data: utmData } = useGetUTMTemplatesQuery();
  const { data: pixelData } = useGetPixelsQuery();

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
  const [showUTM, setShowUTM] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
  };

  const togglePixel = (id: string) =>
    setForm((f) => ({
      ...f,
      pixelIds: f.pixelIds.includes(id)
        ? f.pixelIds.filter((p) => p !== id)
        : [...f.pixelIds, id],
    }));

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
      dispatch(showToast({ message: extractError(err), type: "error" }));
    }
  };

  const hasUTM = !!(form.utmSource || form.utmMedium || form.utmCampaign);
  const hasAdvanced = !!(
    form.expiresAt ||
    form.maxClicks ||
    form.pixelIds.length
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <Link2 size={14} className="text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              New short link
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-4">
            {/* Step 1 - always visible */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Destination URL <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.originalUrl}
                  onChange={(e) => set("originalUrl", e.target.value)}
                  type="url"
                  required
                  autoFocus
                  placeholder="https://example.com/your-long-url"
                  className="input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Custom slug <span className="text-gray-300">optional</span>
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 bg-white">
                    <span className="px-2.5 py-2.5 bg-gray-50 text-gray-400 text-xs border-r border-gray-200 shrink-0">
                      {process.env.NEXT_PUBLIC_SHORT_DOMAIN || "urli.in"}/
                    </span>
                    <input
                      value={form.slug}
                      onChange={(e) => set("slug", e.target.value)}
                      placeholder="my-link"
                      pattern="[a-zA-Z0-9_-]*"
                      className="flex-1 px-2.5 py-2.5 text-sm focus:outline-none min-w-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Title <span className="text-gray-300">optional</span>
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="e.g. Summer campaign"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Step 2 - UTM */}
            <div>
              <button
                type="button"
                onClick={() => setShowUTM((s) => !s)}
                className="w-full flex items-center justify-between py-1 group"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${showUTM || hasUTM ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"}`}
                  >
                    <Tag
                      size={12}
                      className={
                        showUTM || hasUTM ? "text-blue-600" : "text-gray-500"
                      }
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-gray-800">
                      UTM tracking
                    </span>
                    {hasUTM && !showUTM && (
                      <span className="ml-2 text-[11px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                        configured
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:block">
                    - track campaign traffic in analytics
                  </span>
                </div>
                {showUTM ? (
                  <ChevronUp size={15} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={15} className="text-gray-400 shrink-0" />
                )}
              </button>

              {showUTM && (
                <div className="mt-3 space-y-3 pl-8">
                  {/* Templates */}
                  {(utmData?.templates?.length ?? 0) > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1.5">
                        Apply a saved template:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {utmData!.templates.map((t: any) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => applyTemplate(t)}
                            className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      {
                        key: "utmSource",
                        label: "Source",
                        placeholder: "instagram",
                      },
                      {
                        key: "utmMedium",
                        label: "Medium",
                        placeholder: "social",
                      },
                      {
                        key: "utmCampaign",
                        label: "Campaign",
                        placeholder: "summer-sale",
                      },
                      {
                        key: "utmTerm",
                        label: "Term",
                        placeholder: "url shortener",
                      },
                      {
                        key: "utmContent",
                        label: "Content",
                        placeholder: "hero-button",
                      },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs text-gray-500 mb-1">
                          {label}
                        </label>
                        <input
                          value={(form as any)[key]}
                          onChange={(e) => set(key, e.target.value)}
                          placeholder={placeholder}
                          className="input text-xs py-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3 - Advanced */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced((s) => !s)}
                className="w-full flex items-center justify-between py-1 group"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${showAdvanced || hasAdvanced ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"}`}
                  >
                    <Settings2
                      size={12}
                      className={
                        showAdvanced || hasAdvanced
                          ? "text-blue-600"
                          : "text-gray-500"
                      }
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-gray-800">
                      Advanced options
                    </span>
                    {hasAdvanced && !showAdvanced && (
                      <span className="ml-2 text-[11px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                        configured
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:block">
                    - expiry, click limits, pixels
                  </span>
                </div>
                {showAdvanced ? (
                  <ChevronUp size={15} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={15} className="text-gray-400 shrink-0" />
                )}
              </button>

              {showAdvanced && (
                <div className="mt-3 space-y-3 pl-8">
                  {user?.plan === "FREE" ? (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
                      Link expiry, click limits and retargeting pixels require a
                      Pro plan.{" "}
                      <Link href="/pricing" className="font-semibold underline">
                        Upgrade →
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Expires at
                          </label>
                          <input
                            type="datetime-local"
                            value={form.expiresAt}
                            onChange={(e) => set("expiresAt", e.target.value)}
                            className="input text-xs py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Max clicks
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={form.maxClicks}
                            onChange={(e) => set("maxClicks", e.target.value)}
                            placeholder="Unlimited"
                            className="input text-xs py-2"
                          />
                        </div>
                      </div>
                      {(pixelData?.pixels?.length ?? 0) > 0 && (
                        <div>
                          <label className="block text-xs text-gray-500 mb-1.5">
                            Retargeting pixels
                          </label>
                          <div className="space-y-1.5">
                            {pixelData!.pixels.map((p: any) => (
                              <label
                                key={p.id}
                                className="flex items-center gap-2.5 p-2.5 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={form.pixelIds.includes(p.id)}
                                  onChange={() => togglePixel(p.id)}
                                  className="w-3.5 h-3.5 text-blue-600 rounded"
                                />
                                <span className="text-sm text-gray-700 flex-1">
                                  {p.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {p.type}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-gray-100 flex gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !form.originalUrl}
              className="btn-primary flex-1"
            >
              {isLoading ? "Creating…" : "Create link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
