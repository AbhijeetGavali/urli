import { PassThrough } from 'node:stream'
import { createReadableStreamFromReadable } from '@remix-run/node'
import { renderToPipeableStream } from 'react-dom/server'
import { RemixServer } from '@remix-run/react'
import type { EntryContext } from '@remix-run/node'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough()
          responseHeaders.set('Content-Type', 'text/html')
          resolve(new Response(createReadableStreamFromReadable(body), {
            status: responseStatusCode,
            headers: responseHeaders,
          }))
          pipe(body)
        },
        onShellError: reject,
      },
    )
  })
}
