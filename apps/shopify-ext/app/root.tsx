import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { AppProvider } from '@shopify/polaris'
import en from '@shopify/polaris/locales/en.json'

export function links() {
  return [{ rel: 'stylesheet', href: 'https://unpkg.com/@shopify/polaris@13.3.0/build/esm/styles.css' }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider i18n={en}>
          <Outlet />
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
