import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Page, Card, Button, TextField, Banner, DataTable } from '@shopify/polaris'
import { useState } from 'react'

const API = process.env.URLI_API_URL || 'https://api.urli.app'
const API_KEY = process.env.URLI_API_KEY || ''

export async function loader({ request }: LoaderFunctionArgs) {
  // Fetch recent links from Urli API
  try {
    const res = await fetch(`${API}/links?limit=10`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    const data = await res.json()
    return json({ links: data.links || [] })
  } catch {
    return json({ links: [] })
  }
}

export default function ShopifyApp() {
  const { links } = useLoaderData<typeof loader>()
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const shorten = async () => {
    if (!url) return
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (data.shortUrl) setShortUrl(data.shortUrl)
      else setError(data.error || 'Failed')
    } catch { setError('Network error') }
    finally { setLoading(false) }
  }

  const rows = links.map((l: any) => [
    l.slug,
    l.originalUrl.slice(0, 50) + (l.originalUrl.length > 50 ? '…' : ''),
    l.clickCount,
    new Date(l.createdAt).toLocaleDateString(),
  ])

  return (
    <Page title="Urli — URL Shortener">
      <Card>
        <div style={{ padding: '16px' }}>
          <TextField label="Product or page URL" value={url} onChange={setUrl} autoComplete="off"
            placeholder="https://yourstore.myshopify.com/products/…" />
          <div style={{ marginTop: '12px' }}>
            <Button variant="primary" onClick={shorten} loading={loading}>Shorten URL</Button>
          </div>
          {error && <Banner tone="critical" title={error} />}
          {shortUrl && (
            <Banner tone="success" title="Link shortened!">
              <p>{shortUrl}</p>
            </Banner>
          )}
        </div>
      </Card>

      {rows.length > 0 && (
        <Card>
          <DataTable
            columnContentTypes={['text', 'text', 'numeric', 'text']}
            headings={['Slug', 'Original URL', 'Clicks', 'Created']}
            rows={rows}
          />
        </Card>
      )}
    </Page>
  )
}
