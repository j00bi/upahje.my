import type { Metadata } from 'next'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'
import IntroAnimation from '@/components/ui/IntroAnimation'

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
    <html lang="en" className="bg-[#f8f8f8]">
      <body className="bg-[#f8f8f8] text-neutral-900">
        <IntroAnimation />
        <CategoryNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
