'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import LanguageToggle from '@/components/navigation/LanguageToggle'
import { useLanguage } from '@/lib/i18n'
import { signOut } from '@/lib/supabase/auth'
import { getDashboardPath } from '@/lib/auth-redirect'
import { useAuth } from '@/lib/supabase/auth-context'

export default function CategoryNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const { user, role, loading } = useAuth()
  const { isEnglish } = useLanguage()
  const dashboardHref = getDashboardPath(role)
  const categoryLinks = [
    { href: '/jobs', label: isEnglish ? 'Find Jobs' : 'Cari Kerja' },
    { href: '/talent', label: isEnglish ? 'Find Talent' : 'Cari Talent' },
    { href: '/categories', label: isEnglish ? 'Services' : 'Servis' },
    { href: '/jobs/post', label: isEnglish ? 'Post a Job' : 'Post Kerja' },
  ]

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      setMobileOpen(false)
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
    <nav className="nav-bar" aria-label="Primary navigation">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0" style={{ color: 'var(--color-canvas)' }}>
          <span className="block text-lg font-bold leading-none tracking-tight">UpahJe.my</span>
          <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 sm:block">
            Local work, verified
          </span>
        </Link>

        {/* Desktop: search bar */}
        <form onSubmit={handleSearch} className="hidden max-w-sm flex-1 items-center xl:flex" role="search">
          <div className="relative w-full">
            <label htmlFor="global-job-search" className="sr-only">
              {isEnglish ? 'Search jobs and services' : 'Cari kerja dan servis'}
            </label>
            <input
              id="global-job-search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isEnglish ? 'Search jobs or services...' : 'Cari kerja atau servis...'}
              className="w-full rounded-md border border-white/20 bg-white/10 py-2 pl-9 pr-4 text-sm text-white transition placeholder:text-white/50 focus:border-white/30 focus:bg-white/15 focus:outline-none"
            />
            <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          </div>
        </form>

        {/* Desktop: category links */}
        <div className="hidden items-center gap-5 lg:flex">
          {categoryLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm ${pathname === link.href ? 'active' : ''}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <LanguageToggle />
          {loading ? (
            <span className="text-sm text-white/45">
              {isEnglish ? 'Checking session...' : 'Semak sesi...'}
            </span>
          ) : user ? (
            <>
              <Link href={dashboardHref} className="nav-link text-sm">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                {isEnglish ? 'Sign out' : 'Log keluar'}
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="nav-link text-sm">
                {isEnglish ? 'Sign in' : 'Log masuk'}
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-green-forest transition-all hover:bg-white/90"
              >
                {isEnglish ? 'Register' : 'Daftar'}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-md lg:hidden"
          style={{ color: 'var(--color-canvas)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={
            mobileOpen
              ? (isEnglish ? 'Close navigation' : 'Tutup navigasi')
              : (isEnglish ? 'Open navigation' : 'Buka navigasi')
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t px-4 pb-4 pt-3 lg:hidden"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: 'var(--color-green-forest)',
          }}
        >
          {/* Mobile search */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
              {isEnglish ? 'Language' : 'Bahasa'}
            </span>
            <LanguageToggle compact />
          </div>
          <form onSubmit={handleSearch} className="mb-3" role="search">
            <label htmlFor="mobile-job-search" className="sr-only">
              {isEnglish ? 'Search jobs and services' : 'Cari kerja dan servis'}
            </label>
            <input
              id="mobile-job-search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isEnglish ? 'Search jobs or services...' : 'Cari kerja atau servis...'}
              className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:bg-white/15 focus:outline-none"
            />
          </form>

          {categoryLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link block px-3 py-2.5 text-sm ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 border-t border-white/10 pt-3">
            {loading ? (
              <span className="block py-2 text-sm text-white/45">
                {isEnglish ? 'Checking session...' : 'Semak sesi...'}
              </span>
            ) : user ? (
              <div className="flex gap-3">
                <Link
                  href={dashboardHref}
                  className="flex-1 rounded-md border border-white/20 py-2 text-center text-sm font-medium"
                  style={{ color: 'var(--color-canvas)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex-1 rounded-md border border-white/30 py-2 text-center text-sm font-semibold text-white hover:bg-white/10"
                >
                  {isEnglish ? 'Sign out' : 'Log keluar'}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/auth/signin"
                  className="flex-1 rounded-md border border-white/20 py-2 text-center text-sm font-medium"
                  style={{ color: 'var(--color-canvas)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {isEnglish ? 'Sign in' : 'Log masuk'}
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex-1 rounded-md bg-white py-2 text-center text-sm font-semibold text-green-forest hover:bg-white/90"
                  onClick={() => setMobileOpen(false)}
                >
                  {isEnglish ? 'Register' : 'Daftar'}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
