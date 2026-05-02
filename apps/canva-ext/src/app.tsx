import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Button, FormField, TextInput, Rows, Text, Title, Box, Alert } from '@canva/app-ui-kit'

const API = 'https://api.urli.app'

function CanvaApp() {
  const [url, setUrl] = useState('')
  const [apiKey, setApiKey] = useState(localStorage.getItem('urliApiKey') || '')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const saveApiKey = () => {
    localStorage.setItem('urliApiKey', apiKey)
  }

  const shorten = async () => {
    if (!url || !apiKey) { setError('Enter a URL and your Urli API key'); return }
    setLoading(true); setError(''); setShortUrl('')
    try {
      const res = await fetch(`${API}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ originalUrl: url }),
      })
      const data = await res.json()
      if (data.link) setShortUrl(`https://urli.app/${data.link.slug}`)
      else setError(data.error || 'Failed to shorten')
    } catch { setError('Network error') }
    finally { setLoading(false) }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box padding="2u">
      <Rows spacing="2u">
        <Title size="small">Urli URL Shortener</Title>
        <Text size="small" tone="tertiary">Shorten links to use in your Canva designs</Text>

        <FormField label="Urli API Key" value={apiKey}
          control={(props) => (
            <TextInput {...props} type="password" placeholder="urli_…" onChange={(v) => setApiKey(v)} onBlur={saveApiKey} />
          )} />

        <FormField label="URL to shorten" value={url}
          control={(props) => (
            <TextInput {...props} placeholder="https://…" onChange={(v) => setUrl(v)} />
          )} />

        <Button variant="primary" onClick={shorten} loading={loading} stretch>
          Shorten URL
        </Button>

        {error && <Alert tone="critical">{error}</Alert>}

        {shortUrl && (
          <Box background="neutralLow" padding="1u" borderRadius="standard">
            <Rows spacing="1u">
              <Text size="small" weight="bold">{shortUrl}</Text>
              <Button variant="secondary" onClick={copy} stretch>
                {copied ? '✓ Copied!' : 'Copy to clipboard'}
              </Button>
            </Rows>
          </Box>
        )}

        <Text size="xsmall" tone="tertiary">
          Get your API key at urli.app/dashboard/api-keys
        </Text>
      </Rows>
    </Box>
  )
}

createRoot(document.getElementById('root')!).render(<CanvaApp />)
