import type { Metadata } from 'next'
import { Inter, Archivo, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/* Three families, loaded by next/font so they are self-hosted: no runtime
   request to Google, no layout shift. Body, display, and a serif reserved for
   selected display headlines. */
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const displayFont = Archivo({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const serifFont = Newsreader({ subsets: ['latin'], variable: '--font-serif', display: 'swap', adjustFontFallback: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://upahje.my'),
  title: {
    default: 'UpahJe.my - Plain tech answers for Malaysian small businesses',
    template: '%s - UpahJe.my',
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
        <Analytics />
      </body>
    </html>
  )
}
