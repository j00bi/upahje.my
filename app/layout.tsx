import type { Metadata } from 'next'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'

export const metadata: Metadata = {
  title: 'UpahJe.my — Malaysia\'s Creative Marketplace',
  description: 'Find photographers, videographers, designers, and creative talent. Post jobs, browse portfolios, hire with confidence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <CategoryNav />
        <main>{children}</main>
      </body>
    </html>
  )
}