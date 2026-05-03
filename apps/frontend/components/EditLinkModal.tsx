"use client";
import { extractError } from "@/lib/extractError";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUpdateLinkMutation } from "../store/api/linksApi";
import { useGetPixelsQuery } from "../store/api/miscApi";
import { showToast } from "../store/slices/uiSlice";
import {
  X,
  Pencil,
  ChevronDown,
  ChevronUp,
  Tag,
  Settings2,
} from "lucide-react";

interface Props {
  link: any;
  onClose: () => void;
}

export function EditLinkModal({ link, onClose }: Props) {
  const dispatch = useDispatch();
  const [update, { isLoading }] = useUpdateLinkMutation();
  const { data: pixelData } = useGetPixelsQuery();
  const [showUTM, setShowUTM] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    originalUrl: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    expiresAt: "",
    maxClicks: "",
    pixelIds: [] as string[],
    isActive: true,
  });

  useEffect(() => {
    if (!link) return;
    const hasUTM = link.utmSource || link.utmMedium || link.utmCampaign;
    const hasAdv = link.expiresAt || link.maxClicks || link.pixelIds?.length;
    setShowUTM(!!hasUTM);
    setShowAdvanced(!!hasAdv);
    setForm({
      slug: link.slug || "",
      title: link.title || "",
      originalUrl: link.originalUrl || "",
      utmSource: link.utmSource || "",
      utmMedium: link.utmMedium || "",
      utmCampaign: link.utmCampaign || "",
      expiresAt: link.expiresAt
        ? new Date(link.expiresAt).toISOString().slice(0, 16)
        : "",
      maxClicks: link.maxClicks ? String(link.maxClicks) : "",
      pixelIds: link.pixelIds || [],
      isActive: link.isActive ?? true,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link?.id]);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
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
      const payload: any = {
        slug: form.slug,
        originalUrl: form.originalUrl,
        isActive: form.isActive,
        title: form.title || null,
        utmSource: form.utmSource || null,
        utmMedium: form.utmMedium || null,
        utmCampaign: form.utmCampaign || null,
        // explicitly null when cleared so backend removes the value
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
        maxClicks: form.maxClicks ? Number(form.maxClicks) : null,
        pixelIds: form.pixelIds,
      };
      await update({ id: link.id, data: payload }).unwrap();
      dispatch(showToast({ message: "Link updated!", type: "success" }));
      onClose();
    } catch (err: any) {
      dispatch(showToast({ message: extractError(err), type: "error" }));
    }
  };

  const hasUTM = !!(form.utmSource || form.utmMedium || form.utmCampaign);
  const hasAdvanced = !!(form.expiresAt || form.maxClicks || form.pixelIds.length);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <Pencil size={13} className="text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Edit link</h2>
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
            {/* Core fields */}
            <div className="space-y-3">
              <div>
                <label className="label">
                  Destination URL <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.originalUrl}
                  onChange={(e) => set("originalUrl", e.target.value)}
                  type="url"
                  required
                  className="input"
                  placeholder="https://example.com/…"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    Slug <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 bg-white">
                    <span className="px-2.5 py-2.5 bg-gray-50 text-gray-400 text-xs border-r border-gray-200 shrink-0">
                      {process.env.NEXT_PUBLIC_SHORT_DOMAIN || "urli.in"}/
                    </span>
                    <input
                      value={form.slug}
                      onChange={(e) => set("slug", e.target.value)}
                      required
                      className="flex-1 px-2.5 py-2.5 text-sm focus:outline-none min-w-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Optional"
                    className="input"
                  />
                </div>
              </div>
              {/* Active toggle */}
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div
                  className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${form.isActive ? "bg-blue-600" : "bg-gray-200"}`}
                  onClick={() => set("isActive", !form.isActive)}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isActive ? "translate-x-4" : "translate-x-0.5"}`}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Link is {form.isActive ? "active" : "paused"}
                </span>
              </label>
            </div>

            <div className="border-t border-gray-100" />

            {/* UTM */}
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
                  <span className="text-sm font-medium text-gray-800">
                    UTM tracking
                  </span>
                  {hasUTM && !showUTM && (
                    <span className="text-[11px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                      configured
                    </span>
                  )}
                </div>
                {showUTM ? (
                  <ChevronUp size={15} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={15} className="text-gray-400 shrink-0" />
                )}
              </button>
              {showUTM && (
                <div className="mt-3 grid grid-cols-2 gap-2.5 pl-8">
                  {[
                    ["utmSource", "Source", "instagram"],
                    ["utmMedium", "Medium", "social"],
                    ["utmCampaign", "Campaign", "summer-sale"],
                  ].map(([k, l, p]) => (
                    <div key={k}>
                      <label className="label">{l}</label>
                      <input
                        value={(form as any)[k]}
                        onChange={(e) => set(k, e.target.value)}
                        placeholder={p}
                        className="input text-xs py-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced */}
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
                  <span className="text-sm font-medium text-gray-800">
                    Advanced options
                  </span>
                  {hasAdvanced && !showAdvanced && (
                    <span className="text-[11px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                      configured
                    </span>
                  )}
                </div>
                {showAdvanced ? (
                  <ChevronUp size={15} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={15} className="text-gray-400 shrink-0" />
                )}
              </button>
              {showAdvanced && (
                <div className="mt-3 space-y-3 pl-8">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="label">Expires at</label>
                      <div className="flex gap-1.5">
                        <input
                          type="datetime-local"
                          value={form.expiresAt}
                          onChange={(e) => set("expiresAt", e.target.value)}
                          className="input text-xs py-2 flex-1"
                        />
                        {form.expiresAt && (
                          <button type="button" onClick={() => set("expiresAt", "")}
                            className="px-2 rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors text-xs">
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="label">Max clicks</label>
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
                      <label className="label">Retargeting pixels</label>
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
                </div>
              )}
            </div>
          </div>

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
              disabled={isLoading}
              className="btn-primary flex-1"
            >
              {isLoading ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
