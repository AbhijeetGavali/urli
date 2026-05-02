import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "../components/ReduxProvider";
import { Toast } from "../components/Toast";
import { GoogleAnalytics } from "../components/GoogleAnalytics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://urli.ideasprout.in",
  ),
  title: {
    default: "Urli - Smart URL Shortener with Analytics",
    template: "%s | Urli",
  },
  description:
    "Shorten URLs, track every click, add retargeting pixels, and manage links - ₹999/mo. The Bitly alternative without ads. Built by IdeaSprout.",
  keywords: [
    "url shortener",
    "link shortener",
    "bitly alternative",
    "url shortener with analytics",
    "custom url shortener india",
  ],
  openGraph: {
    type: "website",
    siteName: "Urli by IdeaSprout",
    title: "Urli - Smart URL Shortener with Analytics",
    description:
      "Shorten URLs, track clicks, add retargeting pixels. No ads. ₹999/mo.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", site: "@urliapp" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <ReduxProvider>
          {children}
          <Toast />
        </ReduxProvider>
      </body>
    </html>
  );
}
