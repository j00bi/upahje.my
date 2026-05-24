'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = search.trim()
    if (q) router.push(`/jobs?search=${encodeURIComponent(q)}`)
  }

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 px-6"
      style={{ backgroundColor: 'var(--color-canvas-soft)' }}
    >
      {/* Gradient mesh — richer gradient */}
      <div
        className="gradient-mesh"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
        }}
      />
      <div className="gradient-mesh-center" />

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Entrance animation */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* Section label */}
          <p
            className="section-label mb-5 inline-flex items-center gap-2"
            style={{ color: 'var(--color-teal-mid)' }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--color-teal-mid)' }}
            />
            UpahJe.my — 100% Malaysia
          </p>

          {/* Heading — TYPESET: proper font-display-mega, bolder size */}
          <h1
            className="font-display-mega mb-4"
            style={{
              color: 'var(--color-ink)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            <span>Nak </span>
            <span
              style={{
                color: '#d97706',
                textShadow: '0 0 40px rgba(217, 119, 6, 0.15)',
              }}
            >
              <NakWordTicker />
            </span>
          </h1>

          {/* Subheading — TYPESET: font-display-lg */}
          <p
            className="font-display-lg mb-4"
            style={{
              color: 'var(--color-body)',
              letterSpacing: '-0.01em',
            }}
          >
            Cari orang local yang boleh settle.
          </p>

          {/* Body copy */}
          <p
            className="max-w-xl mx-auto mb-8 text-base leading-relaxed"
            style={{ color: 'var(--color-mute)' }}
          >
            Post kerja, banding profile verified, dan bayar dengan lebih selamat
            bila kerja siap.
          </p>
        </div>

        {/* Search bar — BOLDER: larger, stronger focus, glow effect */}
        <form
          onSubmit={handleSearch}
          className="mt-2 max-w-2xl mx-auto"
        >
          <div
            className="relative rounded-2xl transition-all duration-300"
            style={{
              boxShadow: '0 0 0 4px rgba(20, 184, 166, 0.08), 0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari servis… contoh: photographer, videographer, cleaner, web dev"
              className="w-full bg-white rounded-2xl pl-6 pr-24 py-5 text-lg border-2 border-neutral-200 focus:border-teal-mid focus:outline-none focus:ring-0 transition-all duration-300 placeholder:text-neutral-400"
              style={{ fontSize: '1.125rem' }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--color-teal-mid)',
                fontSize: '0.95rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-teal-deep)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-teal-mid)'
              }}
            >
              Cari
            </button>
          </div>
        </form>

        {/* Popular chips — COLORIZE: teal soft bg */}
        <div
          className="mt-5 flex flex-wrap justify-center gap-2"
          style={{ animationDelay: '200ms' }}
        >
          <span
            className="text-xs self-center font-medium"
            style={{ color: 'var(--color-mute)' }}
          >
            Popular:
          </span>
          {POPULAR.map((p, i) => (
            <button
              key={p.label}
              onClick={() => router.push(p.href)}
              className="text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--color-teal-soft)',
                borderColor: 'transparent',
                color: 'var(--color-teal-deep)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-teal-mid)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-teal-soft)'
                e.currentTarget.style.color = 'var(--color-teal-deep)'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Audience labels — BOLDER: more prominent */}
        <div
          className="mt-10 flex items-center justify-center gap-3"
          style={{
            animationDelay: '300ms',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <span
            className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(20, 184, 166, 0.1)',
              color: 'var(--color-teal-deep)',
              letterSpacing: '0.06em',
            }}
          >
            Nak Upah Orang
          </span>
          <span
            className="text-neutral-300 text-sm font-medium"
          >
            /
          </span>
          <span
            className="text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#92400e',
              letterSpacing: '0.06em',
            }}
          >
            Nak Cari Upah
          </span>
        </div>

        {/* CTA row — BOLDER: stronger buttons */}
        <div
          className="mt-6 flex items-center justify-center gap-4 flex-wrap"
          style={{
            animationDelay: '400ms',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <button
            onClick={handleSearch}
            className="inline-flex items-center justify-center font-semibold text-base px-12 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
              backgroundColor: 'var(--color-teal-mid)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-teal-deep)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-teal-mid)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Cari Servis
          </button>
          <Link
            href="/auth/signup?role=talent"
            className="inline-flex items-center justify-center border-2 font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
            style={{
              borderColor: 'var(--color-teal-mid)',
              color: 'var(--color-teal-mid)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-teal-mid)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-teal-mid)'
            }}
          >
            Jadi Freelancer
          </Link>
        </div>

        {/* Trust signals */}
        <div
          className="mt-12 flex items-center justify-center gap-6 flex-wrap"
          style={{
            animationDelay: '500ms',
            opacity: mounted ? 1 : 0,
            transition: 'all 0.6s ease-out',
          }}
        >
          {[
            { icon: '✓', label: 'ID Verified' },
            { icon: '🛡', label: 'Escrow Protected' },
            { icon: 'RM0', label: 'Platform Fee' },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: 'var(--color-mute)' }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}