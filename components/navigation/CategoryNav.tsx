'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { signOut } from '@/lib/supabase/auth'
import { getDashboardPath } from '@/lib/auth-redirect'
import { useAuth } from '@/lib/supabase/auth-context'

const CATEGORY_LINKS = [
  { href: '/jobs', label: 'Cari Kerja' },
  { href: '/talent', label: 'Upah Talent' },
  { href: '/categories', label: 'Kategori' },
  { href: '/jobs/post', label: 'Post Kerja' },
]

export default function CategoryNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const { user, role, loading } = useAuth()
  const dashboardHref = getDashboardPath(role)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(search.trim())}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setMobileOpen(false)
    router.refresh()
    router.push('/')
  }

  return (
    <nav className="nav-bar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0" style={{ color: 'var(--color-ink)' }}>
          <span className="block text-lg font-black leading-none tracking-normal">UpahJe.my</span>
          <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500 sm:block">
            Local work, trusted
          </span>
        </Link>

        {/* Desktop: search bar */}
        <form onSubmit={handleSearch} className="hidden max-w-sm flex-1 items-center lg:flex">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari kerja..."
              className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-9 pr-4 text-sm text-neutral-900 transition placeholder:text-neutral-400 focus:border-blue-300 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          </div>
        </form>

        {/* Desktop: category links */}
        <div className="hidden items-center gap-5 md:flex">
          {CATEGORY_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {loading ? null : user ? (
            <>
              <Link href={dashboardHref} className="nav-link text-sm">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-bold text-neutral-900 transition-all hover:border-neutral-300"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="nav-link text-sm">
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          style={{ color: 'var(--color-ink)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="border-t px-4 pb-4 pt-3 md:hidden"
          style={{
            borderColor: 'rgba(17,17,17,0.08)',
            backgroundColor: 'rgba(255,255,255,0.96)',
          }}
        >
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-3">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari kerja..."
              className="w-full rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-300 focus:outline-none"
            />
          </form>

          {CATEGORY_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link block px-3 py-2.5 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 border-t border-neutral-200 pt-3">
            {loading ? null : user ? (
              <div className="flex gap-3">
                <Link
                  href={dashboardHref}
                  className="flex-1 rounded-md border py-2 text-center text-sm font-bold"
                  style={{ color: 'var(--color-ink)', borderColor: 'rgba(17,17,17,0.12)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex-1 rounded-md border border-neutral-200 py-2 text-center text-sm font-bold text-neutral-900 hover:bg-neutral-50"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/auth/signin"
                  className="flex-1 rounded-md border py-2 text-center text-sm font-bold"
                  style={{ color: 'var(--color-ink)', borderColor: 'rgba(17,17,17,0.12)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex-1 rounded-md bg-blue-600 py-2 text-center text-sm font-bold text-white hover:bg-blue-700"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
