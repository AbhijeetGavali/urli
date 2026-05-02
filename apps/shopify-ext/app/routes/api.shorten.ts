import { json, type ActionFunctionArgs } from '@remix-run/node'

const API = process.env.URLI_API_URL || 'https://api.urli.app'
const API_KEY = process.env.URLI_API_KEY || ''

export async function action({ request }: ActionFunctionArgs) {
  const { url } = await request.json()
  if (!url) return json({ error: 'URL required' }, { status: 400 })

  const res = await fetch(`${API}/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ originalUrl: url }),
  })
  const data = await res.json()
  if (!data.link) return json({ error: data.error || 'Failed' }, { status: 400 })

  return json({ shortUrl: `https://urli.app/${data.link.slug}` })
}
