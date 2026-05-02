'use client'
import { useState } from 'react'
import { useGetLinksQuery, useGetQRQuery } from '../../../store/api/linksApi'

function QRCard({ link }: { link: any }) {
  const [format, setFormat] = useState<'png' | 'svg'>('png')
  const { data } = useGetQRQuery({ linkId: link.id, format })

  const download = () => {
    if (!data?.qr) return
    const a = document.createElement('a')
    if (format === 'svg') {
      // SVG is a string, not a data URL — create a Blob URL
      const blob = new Blob([data.qr], { type: 'image/svg+xml' })
      a.href = URL.createObjectURL(blob)
      a.download = `qr-${link.slug}.svg`
      a.click()
      URL.revokeObjectURL(a.href)
    } else {
      // PNG is already a data URL
      a.href = data.qr
      a.download = `qr-${link.slug}.png`
      a.click()
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col items-center gap-4">
      {data?.qr && (
        <img src={data.qr} alt={`QR for ${link.slug}`} className="w-40 h-40 object-contain" />
      )}
      <div className="text-center">
        <div className="font-medium text-gray-900 text-sm">{link.slug}</div>
        <div className="text-xs text-gray-400 truncate max-w-[160px]">{link.originalUrl}</div>
      </div>
      <div className="flex gap-2">
        {(['png', 'svg'] as const).map(f => (
          <button key={f} onClick={() => setFormat(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${format === f ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {f.toUpperCase()}
          </button>
        ))}
        <button onClick={download} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
          Download
        </button>
      </div>
    </div>
  )
}

export default function QRPage() {
  const { data, isLoading } = useGetLinksQuery({ limit: 50 })

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">QR Codes</h1>
      <p className="text-gray-500 text-sm mb-6">Download QR codes for any of your links. Dynamic QR codes update automatically when you change the destination.</p>

      {isLoading ? (
        <div className="text-center text-gray-400 py-12">Loading…</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.links?.map((link: any) => <QRCard key={link.id} link={link} />)}
        </div>
      )}
    </div>
  )
}
