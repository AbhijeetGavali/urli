"use client";
import { useState } from "react";
import { useGetLinksQuery, useGetQRQuery } from "../../../store/api/linksApi";
import { Download, QrCode, ExternalLink, Sparkles } from "lucide-react";
import { shortUrl } from "../utils";

function QRCard({ link }: { link: any }) {
  const [format, setFormat] = useState<"png" | "svg">("png");
  const { data } = useGetQRQuery({ linkId: link.id, format });
  const fullUrl = `https://${shortUrl(link.slug)}`;
  const designerUrl = `https://qr.ideasprout.in?url=${encodeURIComponent(fullUrl)}`;

  const download = () => {
    if (!data?.qr) return;
    const a = document.createElement("a");
    if (format === "svg") {
      const blob = new Blob([data.qr], { type: "image/svg+xml" });
      a.href = URL.createObjectURL(blob);
      a.download = `qr-${link.slug}.svg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } else {
      a.href = data.qr;
      a.download = `qr-${link.slug}.png`;
      a.click();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-3 hover:border-blue-100 hover:shadow-sm transition-all group">
      {/* QR preview */}
      <div className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
        {data?.qr ? (
          <img src={data.qr} alt={`QR for ${link.slug}`} className="w-full h-full object-contain p-1.5" />
        ) : (
          <QrCode size={28} className="text-gray-200" />
        )}
      </div>

      {/* Info */}
      <div className="text-center w-full min-w-0">
        <div className="font-semibold text-gray-900 text-sm truncate">{link.slug}</div>
        <div className="text-[11px] text-gray-400 truncate mt-0.5">{link.originalUrl}</div>
      </div>

      {/* Format + download */}
      <div className="flex gap-1.5 w-full">
        {(["png", "svg"] as const).map((f) => (
          <button key={f} onClick={() => setFormat(f)}
            className={`flex-1 text-xs py-1.5 rounded-lg border font-medium transition-colors ${
              format === f ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}>
            {f.toUpperCase()}
          </button>
        ))}
        <button onClick={download} title="Download"
          className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <Download size={13} />
        </button>
      </div>

      {/* Designer link */}
      <a href={designerUrl} target="_blank" rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-1.5 text-[11px] font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg py-1.5 transition-colors">
        <Sparkles size={11} />
        Design with QR Studio
        <ExternalLink size={10} />
      </a>
    </div>
  );
}

export default function QRPage() {
  const { data, isLoading } = useGetLinksQuery({ limit: 50 });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* QR Studio banner */}
      <div className="mb-5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">QR Studio by IdeaSprout</div>
            <div className="text-violet-200 text-xs mt-0.5">Design beautiful, branded QR codes with custom colors, logos & shapes</div>
          </div>
        </div>
        <a href="https://qr.ideasprout.in" target="_blank" rel="noopener noreferrer"
          className="shrink-0 bg-white text-violet-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors whitespace-nowrap flex items-center gap-1.5">
          Open QR Studio <ExternalLink size={11} />
        </a>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !data?.links?.length ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <QrCode size={22} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No links yet. Create links to generate QR codes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {data.links.map((link: any) => <QRCard key={link.id} link={link} />)}
        </div>
      )}
    </div>
  );
}
