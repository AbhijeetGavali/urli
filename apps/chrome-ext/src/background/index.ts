const API = 'https://api.urli.app' // configurable

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'urli-shorten',
    title: 'Shorten with Urli',
    contexts: ['link', 'page'],
  })
})

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== 'urli-shorten') return
  const url = info.linkUrl || info.pageUrl
  if (!url) return

  const token = await getToken()
  if (!token) {
    chrome.tabs.create({ url: 'https://urli.app/login' })
    return
  }

  try {
    const res = await fetch(`${API}/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ originalUrl: url }),
    })
    const data = await res.json()
    if (data.link) {
      const shortUrl = `https://${data.link.slug}`
      await navigator.clipboard.writeText(shortUrl).catch(() => {})
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Link shortened!',
        message: shortUrl,
      })
    }
  } catch {
    chrome.notifications.create({
      type: 'basic', iconUrl: 'icons/icon48.png',
      title: 'Urli error', message: 'Failed to shorten link. Check your connection.',
    })
  }
})

async function getToken(): Promise<string | null> {
  return new Promise(resolve => {
    chrome.storage.local.get('accessToken', (r) => resolve(r.accessToken || null))
  })
}
