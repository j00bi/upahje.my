import type { Metadata } from 'next'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'
import HeroLogo from '@/components/ui/HeroLogo'

export const metadata: Metadata = {
  title: 'UpahJe.my — Malaysia\'s Freelance & Labour Marketplace',
  description: 'Hire verified freelancers and workers across every category — from web dev to photography, electrical work to admin support. Upah sesiapa. Untuk apa sahaja.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
        <HeroLogo />
        <CategoryNav />
        <main>{children}</main>
      </body>
    </html>
  )
}