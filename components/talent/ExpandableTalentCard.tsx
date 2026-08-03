'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { TalentProfile } from '@/data/talentProfiles'

interface ExpandableTalentCardProps {
  talent: TalentProfile
}

const avatarToneByTrack = {
  LABOUR: '#f7dfae',
  TECHNICAL: '#d9d5f5',
  PHOTOGRAPHY: '#cce9e4',
} as const

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()
}

export function ExpandableTalentCard({ talent }: ExpandableTalentCardProps) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const toggle = () => setExpanded(e => !e)

  useEffect(() => {
    if (expanded && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [expanded])

  return (
      <div
      className={`rounded-[24px] border transition-all duration-300 ${
        expanded ? 'shadow-lg border-teal-mid/40' : 'border-neutral-200 hover:border-teal-mid/20 hover:shadow-md'
      }`}
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      {/* Collapsed card */}
      <button
        onClick={toggle}
        className="w-full text-left p-5"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-4">
          <div
            className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl text-sm font-extrabold text-[var(--color-green-deep)]"
            style={{ backgroundColor: avatarToneByTrack[talent.track] }}
            aria-hidden="true"
          >{initials(talent.name)}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold" style={{ color: 'var(--color-ink)' }}>{talent.name}</h2>
                  {talent.verified && (
                    <span className="badge badge-verified text-[10px] leading-none">✓ Disahkan</span>
                  )}
                </div>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-mute)' }}>{talent.role}</p>
                <p className="mt-0.5 text-xs flex items-center gap-1" style={{ color: 'var(--color-body)' }}>
                  <span>📍</span> {talent.location}
                </p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="font-semibold text-sm" style={{ color: 'var(--color-teal-deep)' }}>{talent.rate}</span>
                <span className="text-[10px] mt-0.5" style={{ color: 'var(--color-mute)' }}>bermula dari</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {talent.categories.slice(0, 3).map(cat => (
                <span key={cat.name} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] text-neutral-600">
                  {cat.emoji} {cat.name}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t pt-3" style={{ borderColor: 'rgba(14, 15, 12, 0.06)' }}>
              <div className="flex items-center gap-2">
                {talent.rating > 0 ? (
                  <span className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--color-ink)' }}>
                    <span className="text-amber-500">★</span> {talent.rating}
                    <span style={{ color: 'var(--color-mute)' }}>({talent.reviewCount})</span>
                  </span>
                ) : (
                  <span className="text-sm" style={{ color: 'var(--color-mute)' }}>Baru di UpahJe</span>
                )}
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-mute)' }} />
                <span className="text-sm" style={{ color: 'var(--color-body)' }}>{talent.availability}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                style={{ color: 'var(--color-mute)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pt-0 border-t" style={{ borderColor: 'rgba(14, 15, 12, 0.06)' }}>
          {talent.bio && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-mute)' }}>Tentang</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-body)' }}>{talent.bio}</p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-3" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--color-teal-deep)' }}>
                Ketersediaan
              </div>
              <div className="font-medium text-sm" style={{ color: 'var(--color-teal-deep)' }}>{talent.availability}</div>
            </div>
            {talent.certs && talent.certs.length > 0 && (
              <div className="rounded-2xl p-3" style={{ backgroundColor: 'var(--color-amber-pale)' }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--color-amber-deep)' }}>
                  Pensijilan
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {talent.certs.map((c, i) => (
                    <span key={i} className="text-[11px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-teal-soft)', color: 'var(--color-teal-deep)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => router.push(`/talent/${talent.slug}`)}
            className="mt-4 w-full py-3 text-white font-medium text-sm rounded-2xl transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--color-green-mid)',
            }}
          >
            Lihat profil penuh
          </button>
        </div>
      </div>
    </div>
  )
}
