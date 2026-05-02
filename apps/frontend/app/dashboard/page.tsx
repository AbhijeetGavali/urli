"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetLinksQuery,
  useDeleteLinkMutation,
} from "../../store/api/linksApi";
import { useGetOverviewQuery } from "../../store/api/miscApi";
import { showToast } from "../../store/slices/uiSlice";
import {
  formatDate,
  shortUrl,
  copyToClipboard,
  getLinkStatus,
  STATUS_COLORS,
} from "./utils";
import { CreateLinkModal } from "../../components/CreateLinkModal";
import { EditLinkModal } from "../../components/EditLinkModal";
import Link from "next/link";
import { Link2, MousePointerClick, TrendingUp, Plus, Zap } from "lucide-react";
import type { RootState } from "../../store";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editLink, setEditLink] = useState<any>(null);

  const { data: overview } = useGetOverviewQuery();
  const { data, isLoading } = useGetLinksQuery({
    page,
    limit: 20,
    search: search || undefined,
  });
  const [deleteLink] = useDeleteLinkMutation();

  const handleCopy = async (slug: string) => {
    await copyToClipboard(`https://${shortUrl(slug)}`);
    dispatch(showToast({ message: "Copied!", type: "success" }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link? This cannot be undone.")) return;
    await deleteLink(id);
    dispatch(showToast({ message: "Link deleted", type: "success" }));
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Upgrade nudge for free users */}
      {user?.plan === "FREE" && (
        <div className="mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">
                Unlock unlimited links & deep analytics
              </div>
              <div className="text-blue-100 text-xs mt-0.5">
                Founder's pricing - ₹999/mo locked in forever
              </div>
            </div>
          </div>
          <Link
            href="/pricing"
            className="shrink-0 bg-white text-blue-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Upgrade now →
          </Link>
        </div>
      )}
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
        {[
          {
            label: "Total links",
            value: overview?.totalLinks ?? "-",
            icon: Link2,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total clicks",
            value: overview?.totalClicks ?? "-",
            icon: MousePointerClick,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Last 30 days",
            value: overview?.recentClicks ?? "-",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}
            >
              <Icon size={18} className={color} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search links…"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <button
          onClick={() => setShowCreate(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shadow-sm"
        >
          <Plus size={14} /> New link
        </button>
      </div>

      {/* Links list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <span className="text-sm text-gray-400">Loading links…</span>
          </div>
        ) : data?.links?.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Link2 size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No links yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Create your first short link to start tracking clicks.
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"
            >
              Create your first link
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-50">
              {data?.links?.map((link: any) => {
                const status = getLinkStatus(link);
                return (
                  <div
                    key={link.id}
                    className="p-4 flex items-start gap-4 hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <a
                          href={`https://${shortUrl(link.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 text-sm hover:underline"
                        >
                          {shortUrl(link.slug)}
                        </a>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[status]}`}
                        >
                          {status}
                        </span>
                        {link.title && (
                          <span className="text-xs text-gray-400 truncate max-w-[200px]">
                            {link.title}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-sm">
                        {link.originalUrl}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span>{formatDate(link.createdAt)}</span>
                        <span>·</span>
                        <span className="font-medium text-gray-600">
                          {link.clickCount} clicks
                        </span>
                        {link.expiresAt && (
                          <span>· Expires {formatDate(link.expiresAt)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(link.slug)}
                        className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white bg-white/80"
                      >
                        Copy
                      </button>
                      <Link
                        href={`/dashboard/analytics/${link.id}`}
                        className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-white bg-white/80"
                      >
                        Stats
                      </Link>
                      <button
                        onClick={() => setEditLink(link)}
                        className="text-xs text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-blue-50 bg-white/80"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="text-xs text-red-400 hover:text-red-600 px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 bg-white/80"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {data?.total > 20 && (
              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-gray-100"
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-400">
                  Page {page} · {data.total} total
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={data?.links?.length < 20}
                  className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-gray-100"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showCreate && <CreateLinkModal onClose={() => setShowCreate(false)} />}
      {editLink && (
        <EditLinkModal link={editLink} onClose={() => setEditLink(null)} />
      )}
    </div>
  );
}
