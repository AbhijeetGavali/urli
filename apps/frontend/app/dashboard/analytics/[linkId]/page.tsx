'use client'
import { useGetLinkStatsQuery } from '../../../../store/api/miscApi'
import { formatChartData, topN } from '../utils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function LinkAnalyticsPage({ params }: { params: { linkId: string } }) {
  const { data, isLoading } = useGetLinkStatsQuery(params.linkId)

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading analytics…</div>
  if (!data) return <div className="p-8 text-center text-gray-400">No data found</div>

  const chartData = formatChartData(data.daily || [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{data.link?.slug}</h1>
        <p className="text-sm text-gray-400 truncate">{data.link?.originalUrl}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total clicks', value: data.total },
          { label: 'Countries', value: data.byCountry?.length },
          { label: 'Devices', value: data.byDevice?.length },
          { label: 'Referrers', value: data.byReferrer?.length },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-2xl font-bold text-gray-900">{s.value ?? 0}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Clicks over time */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Clicks over time (30 days)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Top countries', data: topN(data.byCountry || []), key: 'country' },
          { title: 'Devices', data: topN(data.byDevice || []), key: 'device' },
          { title: 'Top referrers', data: topN(data.byReferrer || []), key: 'referrer' },
        ].map(({ title, data: rows, key }) => (
          <div key={title} className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
            <div className="space-y-2">
              {rows.map((r: any) => (
                <div key={r[key]} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate">{r[key] || 'Unknown'}</span>
                  <span className="font-medium text-gray-900 ml-2">{r.count}</span>
                </div>
              ))}
              {rows.length === 0 && <div className="text-sm text-gray-400">No data yet</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
