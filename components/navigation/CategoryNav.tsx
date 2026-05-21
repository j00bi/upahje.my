'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORY_LINKS = [
  { href: '/jobs?track=LABOUR', label: 'Labour', emoji: '🛠️' },
  { href: '/jobs?track=TECHNICAL', label: 'Technical', emoji: '💻' },
  { href: '/categories/photography', label: 'Photography', emoji: '📸' },
  { href: '/categories/home-services', label: 'Home Services', emoji: '🏠' },
]

export default function CategoryNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <nav className="nav-bar">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight shrink-0"
          style={{ color: 'var(--color-canvas)' }}
        >
          UpahJe.my
        </Link>

        {/* Desktop: search bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm items-center">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-white/15 focus:border-white/30 transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        {/* Desktop: category links */}
        <div className="hidden md:flex items-center gap-1">
          {CATEGORY_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-sm"
            >
              <span>{link.emoji}</span>
              <span className="ml-1">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/auth/signin" className="nav-link text-sm">
            Sign In
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg"
          style={{ color: 'var(--color-canvas)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t pb-4 pt-3 px-4"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: 'var(--color-green-forest)',
          }}
        >
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-3">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-white/15"
            />
          </form>

          {CATEGORY_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 nav-link text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <span>{link.emoji}</span>
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}

          <div className="flex gap-3 mt-4 pt-3 border-t border-white/10">
            <Link
              href="/auth/signin"
              className="flex-1 text-center py-2 rounded-lg text-sm font-medium border border-white/20"
              style={{ color: 'var(--color-canvas)' }}
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              className="flex-1 text-center py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-ink-deep)' }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}