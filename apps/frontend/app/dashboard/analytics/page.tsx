"use client";
import { useGetOverviewQuery } from "../../../store/api/miscApi";
import { useGetLinksQuery } from "../../../store/api/linksApi";
import Link from "next/link";
import {
  MousePointerClick,
  TrendingUp,
  Link2,
  ArrowRight,
  BarChart2,
} from "lucide-react";

export default function AnalyticsPage() {
  const { data: overview } = useGetOverviewQuery();
  const { data: linksData } = useGetLinksQuery({ limit: 10 });

  const topLinks = [...(linksData?.links || [])].sort(
    (a: any, b: any) => b.clickCount - a.clickCount,
  );

  const maxClicks = topLinks[0]?.clickCount || 1;

  const stats = [
    {
      label: "Total clicks",
      value: overview?.totalClicks ?? "-",
      sub: "All time",
      icon: MousePointerClick,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Last 30 days",
      value: overview?.recentClicks ?? "-",
      sub: "Recent activity",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total links",
      value: overview?.totalLinks ?? "-",
      sub: "Active links",
      icon: Link2,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5"
          >
            <div
              className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}
            >
              <Icon size={18} className={color} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm font-medium text-gray-700 mt-0.5">
              {label}
            </div>
            <div className="text-xs text-gray-400">{sub}</div>
          </div>
        ))}
      </div>

      {/* Top links */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900 text-sm">
              Top links by clicks
            </h2>
          </div>
          <Link
            href="/dashboard"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            All links <ArrowRight size={11} />
          </Link>
        </div>

        {topLinks.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BarChart2 size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">
              No links yet. Create some links to see analytics.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {topLinks.map((link: any, i: number) => (
              <div
                key={link.id}
                className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50/60 transition-colors"
              >
                <span className="text-xs font-bold text-gray-300 w-5 shrink-0 text-right">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-blue-600 truncate">
                      {link.slug}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 truncate max-w-xs">
                    {link.originalUrl}
                  </div>
                  {/* Click bar */}
                  <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden w-full max-w-xs">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{
                        width: `${Math.max(4, (link.clickCount / maxClicks) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold text-gray-900">
                    {link.clickCount}
                  </span>
                  <span className="text-xs text-gray-400 hidden sm:block">
                    clicks
                  </span>
                  <Link
                    href={`/dashboard/analytics/${link.id}`}
                    className="text-xs text-blue-600 hover:text-blue-700 px-2.5 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors whitespace-nowrap"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
