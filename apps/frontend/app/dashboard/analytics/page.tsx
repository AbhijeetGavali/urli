"use client";
import { useGetOverviewQuery } from "../../../store/api/miscApi";
import { useGetLinksQuery } from "../../../store/api/linksApi";
import Link from "next/link";

export default function AnalyticsPage() {
  const { data: overview } = useGetOverviewQuery();
  const { data: linksData } = useGetLinksQuery({ limit: 10 });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Analytics Overview
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total clicks",
            value: overview?.totalClicks ?? "-",
            sub: "All time",
          },
          {
            label: "Clicks (30d)",
            value: overview?.recentClicks ?? "-",
            sub: "Last 30 days",
          },
          {
            label: "Total links",
            value: overview?.totalLinks ?? "-",
            sub: "Active links",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <div className="text-3xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm font-medium text-gray-700 mt-1">
              {s.label}
            </div>
            <div className="text-xs text-gray-400">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Top links by clicks</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {[...(linksData?.links || [])]
            .sort((a: any, b: any) => b.clickCount - a.clickCount)
            .map((link: any) => (
              <div
                key={link.id}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-blue-600">
                    {link.slug}
                  </div>
                  <div className="text-xs text-gray-400 truncate max-w-xs">
                    {link.originalUrl}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {link.clickCount} clicks
                  </span>
                  <Link
                    href={`/dashboard/analytics/${link.id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
