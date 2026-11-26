import type { Metadata } from 'next'
import { Inter, Archivo, Newsreader } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

/* Three families, loaded by next/font so they are self-hosted: no runtime
   request to Google, no layout shift. Body, display, and a serif reserved for
   selected display headlines. */
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const displayFont = Archivo({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const serifFont = Newsreader({ subsets: ['latin'], variable: '--font-serif', display: 'swap', adjustFontFallback: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://upahje.my'),
  // app/icon.svg and app/apple-icon.png are picked up by convention, but the
  // explicit entry pins the sizes so a crawler does not have to guess.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  title: {
    // The template adds the brand exactly once. Page-level titles must not
    // include it, or every title reads "… - UpahJe.my - UpahJe.my".
    default: 'Plain tech answers for Malaysian small businesses',
    template: '%s | UpahJe.my',
  },
  description:
    'Short, sourced articles about technology for Malaysian small businesses, in English and Bahasa Melayu.',
  // og:url is per page and per locale (each route sets it); a site-wide value
  // here is what a crawler would quote for every page.
  openGraph: {
    siteName: 'UpahJe.my',
    type: 'website',
    title: 'UpahJe.my - Plain tech answers for Malaysian small businesses',
    description:
      'Short, sourced articles about technology for Malaysian small businesses, in English and Bahasa Melayu.',
  },
  twitter: {
    card: 'summary',
    title: 'UpahJe.my - Plain tech answers for Malaysian small businesses',
    description:
      'Short, sourced articles about technology for Malaysian small businesses, in English and Bahasa Melayu.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Search Console HTML-tag verification. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // in Vercel and the tag appears on every page; nothing is emitted without it.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`ui-canvas ${bodyFont.variable} ${displayFont.variable} ${serifFont.variable}`} suppressHydrationWarning>
      <body className="ui-canvas">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.js='on'}catch(e){}",
          }}
        />
        <main>{children}</main>
        {/* Web Analytics by hand. The @vercel/analytics component is installed and
            renders, but it never injected its script, so no pageview was recorded:
            window.va existed as an empty stub with no queue and no script tag.
            Loading the file Vercel serves is the documented install that does not
            depend on the component, and it is verifiable from the HTML. */}
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
        <Script src="/_vercel/speed-insights/script.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
