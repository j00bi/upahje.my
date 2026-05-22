'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { NakWordTicker } from './NakWordTicker'

const POPULAR = [
  { label: 'Wedding', href: '/categories/photography' },
  { label: 'Paip', href: '/jobs?category=elektrik' },
  { label: 'Cleaner', href: '/jobs?category=cucian' },
  { label: 'Runner', href: '/jobs?category=angkat' },
  { label: 'Photography', href: '/categories/photography' },
]

export default function HeroNew() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = search.trim()
    if (q) router.push(`/jobs?search=${encodeURIComponent(q)}`)
  }

  return (
    <section className="relative overflow-hidden py-28 md:py-36 px-6" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
      {/* Subtle pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 25% 50%, #0a2a12 0%, transparent 50%)',
      }} />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          <span className="text-neutral-950">Nak </span>
          <span className="text-green-mid">
            <NakWordTicker />
          </span>
        </h1>

        <p className="mt-2 text-2xl sm:text-3xl font-semibold text-neutral-800">
          UpahJe.
        </p>

        {/* Subtitle */}
        <p className="mt-4 max-w-lg mx-auto text-base" style={{ color: 'var(--color-body)' }}>
          Cari local helper, freelancer, dan service provider trusted dekat Malaysia.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari servis… contoh: photographer, plumber, runner"
              className="w-full border-2 border-neutral-200 bg-white rounded-2xl pl-5 pr-14 py-4 text-base focus:outline-none focus:border-green-mid focus:ring-4 focus:ring-green-soft transition"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-mid hover:bg-green-deep text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition"
            >
              Cari
            </button>
          </div>
        </form>

        {/* Popular chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="text-xs text-neutral-400 self-center">Popular:</span>
          {POPULAR.map(p => (
            <button
              key={p.label}
              onClick={() => router.push(p.href)}
              className="text-xs bg-white border border-neutral-200 hover:border-green-mid/40 hover:bg-green-soft text-neutral-600 px-3 py-1.5 rounded-full transition"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={handleSearch}
            className="inline-flex items-center justify-center bg-green-mid hover:bg-green-deep text-white font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Cari Servis
          </button>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center border-2 border-neutral-300 hover:border-neutral-400 text-neutral-800 font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
          >
            Jadi Freelancer
          </Link>
        </div>
      </div>
    </section>
  )
}