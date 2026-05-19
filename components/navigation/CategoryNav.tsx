'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MARKETPLACE_CATEGORIES } from '@/lib/categories'

export function CategoryNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-[11px] font-black text-black">
            U
          </span>
          <span className="hidden sm:inline">UpahJe.my</span>
        </Link>

        {/* Desktop Categories */}
        <nav className="hidden md:flex items-center gap-1">
          {MARKETPLACE_CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/jobs/post"
            className="hidden sm:inline-flex h-8 items-center rounded-full bg-zinc-800 px-4 text-xs font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Post a Job
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex h-8 items-center rounded-full bg-white px-4 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Sign Up
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white md:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Category Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-900 md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <div className="grid grid-cols-2 gap-2">
              {MARKETPLACE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span className="text-lg">{cat.emoji}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{cat.name}</div>
                    <div className="text-[10px] text-zinc-500">{cat.nameMs}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href="/jobs/post"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-center text-xs font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Post a Job
              </Link>
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 rounded-xl bg-white py-2.5 text-center text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
