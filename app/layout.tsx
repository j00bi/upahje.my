import type { Metadata } from 'next'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'
import IntroAnimation from '@/components/ui/IntroAnimation'

export const metadata: Metadata = {
  metadataBase: new URL('https://upahje.my'),
  title: {
    default: 'UpahJe.my — Plain tech answers for Malaysian small businesses',
    template: '%s — UpahJe.my',
  },
  description:
    'Short, sourced articles about technology for Malaysian small businesses — in English and Bahasa Melayu.',
  // og:url is per page and per locale (each route sets it); a site-wide value
  // here is what a crawler would quote for every page.
  openGraph: {
    siteName: 'UpahJe.my',
    type: 'website',
    title: 'UpahJe.my — Plain tech answers for Malaysian small businesses',
    description:
      'Short, sourced articles about technology for Malaysian small businesses — in English and Bahasa Melayu.',
  },
  twitter: {
    card: 'summary',
    title: 'UpahJe.my — Plain tech answers for Malaysian small businesses',
    description:
      'Short, sourced articles about technology for Malaysian small businesses — in English and Bahasa Melayu.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-[var(--color-canvas-soft)]">
      <body className="bg-[var(--color-canvas-soft)] text-neutral-900">
        <IntroAnimation />
        <CategoryNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
