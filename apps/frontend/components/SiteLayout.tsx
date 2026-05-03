import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export function SiteNav({ activePath }: { activePath?: string }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <span className="text-[17px] font-bold text-gray-900 tracking-tight">
            Urli
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-gray-500 font-medium">
          {[
            ["/#features", "Features"],
            ["/pricing", "Pricing"],
            ["/blog", "Blog"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-gray-900 transition-colors ${activePath === href ? "text-gray-900" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden md:block text-[13px] text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Start free <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-950 border-t border-white/5 text-gray-500 py-10">
      <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
            <Zap size={10} className="text-white" fill="white" />
          </div>
          <span className="text-white font-semibold">Urli</span>
          <span className="text-gray-600">
            - a product of{" "}
            <a
              href="https://ideasprout.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              IdeaSprout
            </a>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {[
            ["/privacy", "Privacy"],
            ["/terms", "Terms"],
            ["/cookies", "Cookies"],
            ["/refund", "Refund"],
            ["/account-deletion", "Account Deletion"],
          ].map(([h, l]) => (
            <Link
              key={h}
              href={h}
              className="hover:text-white transition-colors"
            >
              {l}
            </Link>
          ))}
          <a
            href="mailto:support@ideasprout.in"
            className="hover:text-white transition-colors"
          >
            support@ideasprout.in
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 mt-4 pt-4 border-t border-white/5 text-center text-[11px] text-gray-700">
        © {new Date().getFullYear()} IdeaSprout Technologies. All rights
        reserved.
      </div>
    </footer>
  );
}
