'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/talent', label: 'Browse' },
  { href: '/categories', label: 'Categories' },
  { href: '/#how-it-works', label: 'How It Works' },
]

export default function CategoryNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="nav-bar">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          style={{ color: 'var(--color-canvas)' }}
        >
          UpahJe.my
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/signin" className="nav-link">
            Sign In
          </Link>
          <Link href="/auth/signup" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-all">
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
          className="md:hidden border-t pb-4 pt-2"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: 'var(--color-green-forest)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 nav-link text-base"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 px-4 pt-3">
            <Link
              href="/auth/signin"
              className="flex-1 text-center py-2 rounded-lg text-sm font-medium"
              style={{
                color: 'var(--color-canvas)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="flex-1 text-center py-2 rounded-lg text-sm font-semibold"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-ink-deep)',
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
