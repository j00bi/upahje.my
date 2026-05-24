'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin, Search, ShieldCheck, UserRound } from 'lucide-react'

const POPULAR = [
  { label: 'Photographer', href: '/categories/photography' },
  { label: 'Home repair', href: '/categories/home-services' },
  { label: 'Web design', href: '/categories/web-design' },
  { label: 'Admin help', href: '/categories/admin-support' },
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
    <section
      className="relative overflow-hidden border-b px-4 py-10 sm:px-6 md:py-16"
      style={{
        backgroundColor: 'var(--color-canvas-soft)',
        borderColor: 'rgba(14, 15, 12, 0.06)',
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p
            className="section-label mb-4 inline-flex items-center gap-2"
            style={{ color: 'var(--color-teal-mid)' }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: 'var(--color-teal-mid)' }}
            />
            Off-white marketplace, built on trust
          </p>

          <h1
            className="font-display-mega max-w-3xl"
            style={{
              color: 'var(--color-ink)',
              lineHeight: 1.05,
            }}
          >
            Hire local help. Find paid work. No fog.
          </h1>

          <p
            className="mt-5 max-w-2xl text-base leading-7 md:text-lg"
            style={{
              color: 'var(--color-body)',
            }}
          >
            UpahJe connects Malaysian clients with local labour, creatives, and technical talent.
            Post a job, compare profiles, agree on scope, and move payment only when work is ready.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 max-w-2xl"
          >
            <div
              className="flex flex-col gap-2 rounded-2xl border bg-white p-2 shadow-sm sm:flex-row"
              style={{
                borderColor: 'rgba(14, 15, 12, 0.08)',
              }}
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search photographer, cleaner, web dev..."
                  className="min-h-[52px] w-full rounded-xl border border-transparent bg-white py-3 pl-12 pr-4 text-base outline-none transition focus:border-blue-300 focus:bg-blue-50/30"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-black text-white transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--color-teal-mid)',
                }}
              >
                Cari
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className="text-xs self-center font-medium"
              style={{ color: 'var(--color-mute)' }}
            >
              Popular:
            </span>
            {POPULAR.map((p) => (
              <button
                key={p.label}
                onClick={() => router.push(p.href)}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'rgba(15, 118, 110, 0.18)',
                  color: 'var(--color-teal-deep)',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/jobs/post"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-black text-white transition hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--color-teal-mid)',
              }}
            >
              Post a job
              <BriefcaseBusiness className="h-4 w-4" />
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border bg-white px-6 text-sm font-black transition hover:-translate-y-0.5"
              style={{
                borderColor: 'rgba(14, 15, 12, 0.1)',
                color: 'var(--color-ink)',
              }}
            >
              Create work profile
              <UserRound className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
              <div className="mb-4 flex items-center gap-2 text-sm font-black" style={{ color: 'var(--color-teal-deep)' }}>
                <BriefcaseBusiness className="h-4 w-4" />
                For clients
              </div>
              <h2 className="text-2xl font-black tracking-normal" style={{ color: 'var(--color-ink)' }}>
                Need work settled?
              </h2>
              <p className="mt-2 text-sm leading-6" style={{ color: 'var(--color-body)' }}>
                Post scope, budget, and location. Shortlist people by service, area, rate, and profile depth.
              </p>
              <Link href="/jobs/post" className="mt-5 inline-flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--color-teal-deep)' }}>
                Start hiring <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--color-amber-pale)' }}>
              <div className="mb-4 flex items-center gap-2 text-sm font-black" style={{ color: 'var(--color-amber-deep)' }}>
                <UserRound className="h-4 w-4" />
                For workers
              </div>
              <h2 className="text-2xl font-black tracking-normal" style={{ color: 'var(--color-ink)' }}>
                Want more jobs?
              </h2>
              <p className="mt-2 text-sm leading-6" style={{ color: 'var(--color-body)' }}>
                Make a quick profile first, then add MyKad, rates, service areas, and portfolio details.
              </p>
              <Link href="/onboarding" className="mt-5 inline-flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--color-amber-deep)' }}>
                Join as talent <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl bg-white p-4 sm:grid-cols-3">
            {[
              { icon: MapPin, label: 'KL + Selangor first' },
              { icon: ShieldCheck, label: 'Verification flow ready' },
              { icon: CheckCircle2, label: 'Escrow-ready jobs' },
            ].map(item => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-xs font-bold"
                style={{ color: 'var(--color-mute)' }}
              >
                <item.icon className="h-4 w-4" style={{ color: 'var(--color-teal-mid)' }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
