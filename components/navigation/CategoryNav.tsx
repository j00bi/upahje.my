'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'

const CATEGORY_LINKS = [
  { href: '/jobs', label: 'Jobs' },
  { href: '/talent', label: 'Talent' },
  { href: '/categories', label: 'Categories' },
  { href: '/categories/home-services', label: 'Home Services' },
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-bold"
          style={{ color: 'var(--color-canvas)' }}
        >
          UpahJe.my
        </Link>

        {/* Desktop: search bar */}
        <form onSubmit={handleSearch} className="hidden max-w-sm flex-1 items-center lg:flex">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full rounded-md border border-white/20 bg-white/10 py-2 pl-9 pr-4 text-sm text-white transition placeholder:text-white/50 focus:border-white/30 focus:bg-white/15 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
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
          <Link href="/auth/signin" className="nav-link text-sm">
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          style={{ color: 'var(--color-canvas)' }}
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
              className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:bg-white/15 focus:outline-none"
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

          <div className="flex gap-3 mt-4 pt-3 border-t border-white/10">
            <Link
              href="/auth/signin"
              className="flex-1 rounded-md border border-white/20 py-2 text-center text-sm font-medium"
              style={{ color: 'var(--color-canvas)' }}
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="flex-1 rounded-md border border-white/30 py-2 text-center text-sm font-semibold text-white hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
