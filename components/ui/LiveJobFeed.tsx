'use client'

import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Clock3, MapPin, ShieldCheck } from 'lucide-react'

const marketplaceRows = [
  {
    title: 'Home help and labour',
    detail: 'Cleaner, runner, gardener, mover',
    meta: 'Quick profile supported',
  },
  {
    title: 'Events and content',
    detail: 'Photography, video, makeup, wedding support',
    meta: 'Portfolio-led hiring',
  },
  {
    title: 'Technical and admin',
    detail: 'Web, design, data entry, office support',
    meta: 'Scope and rate first',
  },
]

export default function LiveJobFeed() {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm" style={{ borderColor: 'rgba(14, 15, 12, 0.08)' }}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="section-label mb-2" style={{ color: 'var(--color-teal-mid)' }}>
            Marketplace Readiness
          </p>
          <h3 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            What UpahJe can support now
          </h3>
        </div>
        <div className="rounded-full p-2" style={{ backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal-deep)' }}>
          <BriefcaseBusiness className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-3">
        {marketplaceRows.map((row) => (
          <div
            key={row.title}
            className="rounded-2xl border p-4"
            style={{ borderColor: 'rgba(14, 15, 12, 0.08)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                  {row.title}
                </div>
                <p className="mt-1 text-sm leading-6" style={{ color: 'var(--color-body)' }}>
                  {row.detail}
                </p>
              </div>
              <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: 'var(--color-canvas-soft)', color: 'var(--color-mute)' }}>
                {row.meta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { icon: MapPin, label: 'Local area matching' },
          { icon: ShieldCheck, label: 'MyKad path for labour' },
          { icon: Clock3, label: 'Quick-start profiles' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--color-mute)' }}>
            <item.icon className="h-4 w-4" style={{ color: 'var(--color-teal-mid)' }} />
            {item.label}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/jobs"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition hover:-translate-y-0.5"
          style={{ borderColor: 'rgba(14, 15, 12, 0.1)', color: 'var(--color-ink)' }}
        >
          Browse jobs <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/onboarding"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--color-teal-mid)' }}
        >
          Join marketplace <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
