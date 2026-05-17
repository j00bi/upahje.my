import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900">
              UpahJe.my
            </div>
            <div className="text-sm text-slate-600">
              Signed in as {session.user?.email ?? session.user?.name ?? 'member'}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/dashboard/employer"
              className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Employer Dashboard
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
