import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const API = 'https://api.urli.app'
const PLATFORMS = ['Pinterest', 'Instagram', 'TikTok', 'Facebook', 'Twitter', 'Email']

function EtsyPopup() {
  const [url, setUrl] = useState('')
  const [platform, setPlatform] = useState('Pinterest')
  const [links, setLinks] = useState<{ platform: string; shortUrl: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    chrome.storage.local.get(['accessToken', 'etsyLinks'], (r) => {
      setToken(r.accessToken || null)
      setLinks(r.etsyLinks || [])
    })
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url?.includes('etsy.com')) setUrl(tabs[0].url)
    })
  }, [])

  const createTrackedLink = async () => {
    if (!url || !token) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          originalUrl: url,
          utmSource: platform.toLowerCase(),
          utmMedium: 'social',
          title: `Etsy — ${platform}`,
        }),
      })
      const data = await res.json()
      if (data.link) {
        const shortUrl = `https://urli.app/${data.link.slug}`
        const newLinks = [{ platform, shortUrl }, ...links].slice(0, 10)
        setLinks(newLinks)
        chrome.storage.local.set({ etsyLinks: newLinks })
        await navigator.clipboard.writeText(shortUrl)
      }
    } catch { /* no-op */ }
    finally { setLoading(false) }
  }

  if (!token) {
    return (
      <div style={{ padding: 16, width: 280, fontFamily: 'system-ui' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#2563eb', marginBottom: 8 }}>Urli for Etsy</div>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>Sign in to track which platform drives your Etsy sales.</p>
        <a href="https://urli.app/login" target="_blank" rel="noreferrer"
          style={{ display: 'block', background: '#2563eb', color: 'white', padding: '8px 0', borderRadius: 8, textAlign: 'center', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
          Sign in to Urli
        </a>
      </div>
    )
  }

  return (
    <div style={{ padding: 16, width: 300, fontFamily: 'system-ui' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#2563eb', marginBottom: 12 }}>Urli for Etsy</div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ fontSize: 11, color: '#6b7280', display: 'block', marginBottom: 4 }}>Platform</label>
        <select value={platform} onChange={e => setPlatform(e.target.value)}
          style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '6px 8px', fontSize: 13 }}>
          {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <button onClick={createTrackedLink} disabled={loading || !url}
        style={{ width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '8px 0', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1, marginBottom: 12 }}>
        {loading ? 'Creating…' : `Create ${platform} link`}
      </button>

      {links.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6 }}>Recent tracked links:</div>
          {links.slice(0, 5).map((l, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ color: '#374151' }}>{l.platform}</span>
              <span style={{ color: '#2563eb' }}>{l.shortUrl.replace('https://', '')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<EtsyPopup />)
