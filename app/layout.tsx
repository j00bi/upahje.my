import type { Metadata } from 'next'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'
import HeroLogo from '@/components/ui/HeroLogo'

export const metadata: Metadata = {
  title: 'UpahJe.my — Malaysia\'s Local Hiring Platform',
  description: 'Hire trusted local help in Malaysia. Post a job, compare verified workers, and pay safely after the work is done.',
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