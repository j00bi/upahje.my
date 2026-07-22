import type { Metadata } from 'next'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'
import IntroAnimation from '@/components/ui/IntroAnimation'

export const metadata: Metadata = {
  title: 'UpahJe.my — Malaysia\'s Local Hiring Platform',
  description: 'Hire trusted local help in Malaysia. Post a job, compare verified workers, and pay safely after the work is done.',
  metadataBase: new URL('https://upahje.my'),
  openGraph: {
    title: 'UpahJe.my — Malaysia\'s Local Hiring Platform',
    description: 'Hire trusted local help in Malaysia. Post a job, compare verified workers, and pay safely after the work is done.',
    url: 'https://upahje.my',
    siteName: 'UpahJe.my',
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UpahJe.my — Malaysia\'s Local Hiring Platform',
    description: 'Hire trusted local help in Malaysia. Post a job, compare verified workers, and pay safely after the work is done.',
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
