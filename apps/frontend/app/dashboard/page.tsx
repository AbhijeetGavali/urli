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
import {
  Link2,
  MousePointerClick,
  TrendingUp,
  Plus,
  Copy,
  BarChart2,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
import type { RootState } from "../../store";

export default function DashboardPage() {
  const dispatch = useDispatch();
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
    dispatch(showToast({ message: "Copied to clipboard!", type: "success" }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link? This cannot be undone.")) return;
    await deleteLink(id);
    dispatch(showToast({ message: "Link deleted", type: "success" }));
  };

  const stats = [
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
  ];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5 flex items-center gap-3 md:gap-4"
          >
            <div
              className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center shrink-0`}
            >
              <Icon size={18} className={color} />
            </div>
            <div className="min-w-0">
              <div className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                {value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 truncate">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search links…"
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
        >
          <Plus size={15} /> New link
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
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">
              {search ? "No links found" : "No links yet"}
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              {search
                ? "Try a different search term."
                : "Create your first short link to start tracking clicks."}
            </p>
            {!search && (
              <button
                onClick={() => setShowCreate(true)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Create your first link
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-50">
              {data?.links?.map((link: any) => {
                const status = getLinkStatus(link);
                return (
                  <div
                    key={link.id}
                    className="px-4 py-3.5 flex items-center gap-4 hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <Link2 size={14} className="text-blue-500" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <a
                          href={`https://${shortUrl(link.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 text-sm hover:underline"
                        >
                          {shortUrl(link.slug)}
                        </a>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[status]}`}
                        >
                          {status}
                        </span>
                        {link.expiresAt && status === 'active' && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-amber-50 text-amber-600 border border-amber-100">
                            expires {formatDate(link.expiresAt)}
                          </span>
                        )}
                        {link.title && (
                          <span className="text-xs text-gray-400 truncate max-w-[180px] hidden sm:block">
                            {link.title}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-sm">
                        {link.originalUrl}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                        <span>{formatDate(link.createdAt)}</span>
                        <span>·</span>
                        <span className="font-medium text-gray-600">
                          {link.clickCount} clicks
                        </span>
                        {link.maxClicks && (
                          <>
                            <span>·</span>
                            <span>{link.clickCount}/{link.maxClicks} clicks</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(link.slug)}
                        title="Copy link"
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                      <Link
                        href={`/dashboard/analytics/${link.id}`}
                        title="View stats"
                        className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <BarChart2 size={14} />
                      </Link>
                      <button
                        onClick={() => setEditLink(link)}
                        title="Edit link"
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        title="Delete link"
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {data?.total > 20 && (
              <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-xs text-gray-400">
                  Page {page} · {data.total} links
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={data?.links?.length < 20}
                  className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-40 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
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
