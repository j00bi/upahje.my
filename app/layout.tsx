import type { Metadata } from 'next'
import { Sora, DM_Sans } from 'next/font/google'
import './globals.css'
import CategoryNav from '@/components/navigation/CategoryNav'
import { AuthProvider } from '@/lib/supabase/auth-context'
import { LanguageProvider } from '@/lib/i18n'

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
  title: 'UpahJe.my — Cari kerja & talent tempatan',
  description: 'Post kerja, semak profil talent tempatan, dan buat pilihan dengan lebih yakin di UpahJe.my.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ms"
      className={`${sora.variable} ${dmSans.variable} bg-[var(--color-canvas-soft)]`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-canvas-soft)] text-neutral-900">
        <LanguageProvider>
          <AuthProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <div id="page-content">
              <CategoryNav />
              <main id="main-content" tabIndex={-1}>{children}</main>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
