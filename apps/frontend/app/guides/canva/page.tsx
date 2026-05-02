import type { Metadata } from "next";
import Link from "next/link"
import { SiteNav, SiteFooter } from "../../../components/SiteLayout";

export const metadata: Metadata = {
  title: "How to Submit Urli to the Canva App Marketplace",
  description:
    "Step-by-step guide to submitting the Urli Canva app for public listing on the Canva Apps Marketplace.",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    step: 1,
    title: "Create a Canva Developer Account",
    desc: "Go to canva.com/developers and sign up for a developer account. You'll need a regular Canva account first.",
    link: {
      href: "https://www.canva.com/developers",
      label: "canva.com/developers",
    },
  },
  {
    step: 2,
    title: "Create a New App",
    desc: 'In the Canva Developer Portal, click "Create an app". Give it a name (e.g., "Urli URL Shortener") and select "App" as the type. Note your App ID - you\'ll need it in your app configuration.',
  },
  {
    step: 3,
    title: "Configure App Settings",
    desc: 'Set your app\'s origin URL to your deployed Canva app URL (e.g., https://canva.urli.ideasprout.in). Enable the "network:fetch" permission so your app can call the Urli API.',
  },
  {
    step: 4,
    title: "Deploy the Canva App",
    desc: "Deploy apps/canva-ext to a static hosting provider (Vercel, Netlify, or Cloudflare Pages). The app is a static React app - no server required. Set VITE_URLI_API_URL in your build environment.",
  },
  {
    step: 5,
    title: "Test in Development Mode",
    desc: 'In the Canva Developer Portal, click "Preview" to test your app in Canva. Verify that URL shortening works correctly. Test with both valid and invalid URLs.',
  },
  {
    step: 6,
    title: "Prepare Submission Assets",
    desc: "Required assets: App icon (96×96px PNG), banner image (1920×600px), screenshots (minimum 3, 1280×800px), app description (max 500 chars for short, 2000 for long), and a demo video (recommended).",
  },
  {
    step: 7,
    title: "Complete the App Profile",
    desc: 'Fill in all required fields in the Developer Portal: app name, description, category (select "Productivity"), tags (url-shortener, link-management, analytics), and support URL.',
  },
  {
    step: 8,
    title: "Submit for Review",
    desc: "Click \"Submit for review\" in the Developer Portal. Canva's review process typically takes 2-4 weeks. You'll receive email updates on your submission status.",
  },
  {
    step: 9,
    title: "Address Review Feedback",
    desc: "Canva reviewers test your app thoroughly. Common feedback: improve error handling, add loading states, ensure the app works on all Canva plan types. Address all feedback and resubmit.",
  },
  {
    step: 10,
    title: "Go Live",
    desc: 'Once approved, your app is live on the Canva Apps Marketplace. Users can find it by searching "URL shortener" or "Urli" in the Canva Apps panel.',
  },
];

export default function CanvaGuidePage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <SiteNav />
        <div className="bg-gray-50 border-b border-gray-100 py-10">
          <div className="max-w-6xl mx-auto px-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Urli for Canva
            </h1>
            <p className="text-gray-500 text-sm">
              Shorten and track links directly inside your Canva designs.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="mb-10">
            <div className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block mb-4">
              Developer Guide
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Canva App Marketplace Submission Guide
            </h1>
            <p className="text-gray-500 text-lg">
              Step-by-step instructions to submit the Urli Canva app for public
              listing.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">
            <div className="font-semibold text-blue-900 mb-1">
              Before you start
            </div>
            <p className="text-sm text-blue-800">
              You'll need a deployed instance of{" "}
              <code className="bg-blue-100 px-1 rounded">apps/canva-ext</code>{" "}
              with a public HTTPS URL. The app must be accessible from Canva's
              servers.
            </p>
          </div>

          <div className="space-y-6">
            {STEPS.map((s) => (
              <div key={s.step} className="flex gap-5">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {s.desc}
                  </p>
                  {s.link && (
                    <a
                      href={s.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 hover:underline mt-1 inline-block"
                    >
                      → {s.link.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">
              app.json configuration
            </h3>
            <pre className="text-xs bg-gray-900 text-green-400 rounded-xl p-4 overflow-x-auto">{`{
  "id": "urli-url-shortener",
  "name": "Urli - URL Shortener",
  "version": "1.0.0",
  "permissions": ["network:fetch"],
  "domains": {
    "appOrigin": "https://canva.urli.ideasprout.in"
  }
}`}</pre>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
