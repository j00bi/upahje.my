'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SignOutButton } from '@/components/auth/SignOutButton'

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-white/60 bg-white/70 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-900">
            UpahJe.my
          </div>
          <div className="text-xs text-slate-600 hidden sm:block">Dashboard</div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3" aria-label="Main navigation">
          <Link
            href="/"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 min-h-[44px] flex items-center"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 min-h-[44px] flex items-center"
          >
            Jobs
          </Link>
          <Link
            href="/ai"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 min-h-[44px] flex items-center"
          >
            AI
          </Link>
          <Link
            href="/dashboard/employer"
            className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 min-h-[44px] flex items-center"
          >
            Employer Dashboard
          </Link>
          <SignOutButton />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur px-4 py-4 space-y-3" aria-label="Mobile navigation">
          <Link
            href="/"
            className="block rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 min-h-[44px] flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/jobs"
            className="block rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 min-h-[44px] flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            href="/ai"
            className="block rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 min-h-[44px] flex items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            AI
          </Link>
          <Link
            href="/dashboard/employer"
            className="block rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 text-center min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Employer Dashboard
          </Link>
          <div className="pt-2 border-t border-slate-200">
            <SignOutButton />
          </div>
        </nav>
      )}
    </header>
  )
}