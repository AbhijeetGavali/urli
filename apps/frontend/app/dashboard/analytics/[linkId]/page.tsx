'use client'
import { useGetLinkStatsQuery } from '../../../../store/api/miscApi'
import { formatChartData, topN } from '../utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MousePointerClick, Globe, Monitor, Link2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LinkAnalyticsPage({ params }: { params: { linkId: string } }) {
  const { data, isLoading } = useGetLinkStatsQuery(params.linkId)

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!data) return (
    <div className="p-6 text-center text-gray-400 text-sm">No data found.</div>
  )

  const chartData = formatChartData(data.daily || [])

  const statCards = [
    { label: 'Total clicks', value: data.total ?? 0, icon: MousePointerClick, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Countries', value: data.byCountry?.length ?? 0, icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Devices', value: data.byDevice?.length ?? 0, icon: Monitor, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Referrers', value: data.byReferrer?.length ?? 0, icon: Link2, color: 'text-violet-600', bg: 'bg-violet-50' },
  ]

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      {/* Back + title */}
      <div>
        <Link href="/dashboard/analytics"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mb-3 transition-colors">
          <ArrowLeft size={13} /> Analytics
        </Link>
        <div className="font-bold text-gray-900 text-lg">{data.link?.slug}</div>
        <div className="text-xs text-gray-400 truncate mt-0.5">{data.link?.originalUrl}</div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-2.5`}>
              <Icon size={16} className={color} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Clicks over time (30 days)</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} barSize={14}>
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={28} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #f3f4f6', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'Top countries', rows: topN(data.byCountry || []), key: 'country' },
          { title: 'Devices', rows: topN(data.byDevice || []), key: 'device' },
          { title: 'Top referrers', rows: topN(data.byReferrer || []), key: 'referrer' },
        ].map(({ title, rows, key }) => {
          const max = rows[0]?.count || 1
          return (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
              {rows.length === 0 ? (
                <p className="text-xs text-gray-400">No data yet</p>
              ) : (
                <div className="space-y-2.5">
                  {rows.map((r: any) => (
                    <div key={r[key]}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 truncate">{r[key] || 'Unknown'}</span>
                        <span className="font-semibold text-gray-900 ml-2">{r.count}</span>
                      </div>
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(r.count / max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
