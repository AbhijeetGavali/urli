import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";

const API = "https://api.urli.ideasprout.in";

function Popup() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("accessToken", (r) =>
      setToken(r.accessToken || null),
    );
    // Pre-fill with current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) setUrl(tabs[0].url);
    });
  }, []);

  const shorten = async () => {
    if (!url || !token) return;
    setLoading(true);
    setError("");
    setShortUrl("");
    try {
      const res = await fetch(`${API}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await res.json();
      if (data.link)
        setShortUrl(`https://urli.ideasprout.in/${data.link.slug}`);
      else setError(data.error || "Failed to shorten");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!token) {
    return (
      <div className="p-4 w-72 text-center">
        <div className="text-xl font-bold text-blue-600 mb-3">Urli</div>
        <p className="text-sm text-gray-500 mb-4">Sign in to shorten links</p>
        <a
          href="https://urli.ideasprout.in/login"
          target="_blank"
          rel="noreferrer"
          className="block bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          Sign in
        </a>
      </div>
    );
  }

  return (
    <div className="p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold text-blue-600">Urli</span>
        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          Connected
        </span>
      </div>

      <div className="space-y-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL to shorten…"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={shorten}
          disabled={loading || !url}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Shortening…" : "Shorten"}
        </button>

        {error && (
          <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Short link:</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-600 flex-1 truncate">
                {shortUrl}
              </span>
              <button
                onClick={copy}
                className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-50"
              >
                {copied ? "✓" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<Popup />);
