import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'
import IntroAnimation from '@/components/ui/IntroAnimation'
import { AuthProvider } from '@/lib/supabase/auth-context'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

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
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} bg-[var(--color-canvas-soft)]`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of content behind intro overlay — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.setAttribute('data-intro','loading')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-[var(--color-canvas-soft)] text-neutral-900">
        <AuthProvider>
          <IntroAnimation />
          <div id="page-content">
            <CategoryNav />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
