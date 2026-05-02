import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '../components/ReduxProvider'
import { Toast } from '../components/Toast'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://urli.ideasprout.in'),
  title: { default: 'Urli — Smart URL Shortener with Analytics', template: '%s | Urli' },
  description: 'Shorten URLs, track clicks, add retargeting pixels, and manage links — all for $15/mo. The Bitly alternative that doesn\'t show ads.',
  keywords: ['url shortener', 'link shortener', 'bitly alternative', 'url shortener with analytics', 'custom url shortener'],
  openGraph: {
    type: 'website',
    siteName: 'Urli',
    title: 'Urli — Smart URL Shortener with Analytics',
    description: 'Shorten URLs, track clicks, add retargeting pixels. No ads. $15/mo.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', site: '@urliapp' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Toast />
        </ReduxProvider>
      </body>
    </html>
  )
}
