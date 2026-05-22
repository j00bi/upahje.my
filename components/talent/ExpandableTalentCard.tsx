'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { TalentProfile } from '@/data/talentProfiles'

interface ExpandableTalentCardProps {
  talent: TalentProfile
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
      className={`rounded-2xl border border-neutral-200 bg-white transition-all duration-300 ${
        expanded ? 'shadow-lg border-emerald-300' : 'hover:border-emerald-200 hover:shadow-md'
      }`}
    >
      {/* Collapsed card */}
      <button
        onClick={toggle}
        className="w-full text-left p-5"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-4">
          <div
            className="h-14 w-14 flex-shrink-0 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(https://i.pravatar.cc/112?img=${talent.avatarImg})` }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold text-neutral-950">{talent.name}</h2>
                <p className="text-sm text-neutral-500">{talent.role}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{talent.location}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="font-semibold text-emerald-700 text-sm">{talent.rate}</span>
                {talent.verified && (
                  <span className="text-xs text-emerald-600 mt-0.5">✓ Verified</span>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {talent.categories.slice(0, 3).map(cat => (
                <span key={cat.name} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] text-neutral-600">
                  {cat.emoji} {cat.name}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
              {talent.rating > 0 ? (
                <span className="text-sm font-medium text-neutral-600">
                  ★ {talent.rating} ({talent.reviewCount})
                </span>
              ) : (
                <span className="text-sm text-neutral-400">New to UpahJe</span>
              )}
              <svg
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
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
        <div className="px-5 pb-5 pt-0 border-t border-neutral-100">
          {talent.bio && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">About</h4>
              <p className="text-sm text-neutral-700 leading-relaxed">{talent.bio}</p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Availability</div>
              <div className="font-medium text-sm text-slate-800">{talent.availability}</div>
            </div>
            {talent.certs && talent.certs.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Certifications</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {talent.certs.map((c, i) => (
                    <span key={i} className="text-[11px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => router.push(`/talent/${talent.slug}`)}
            className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-2xl transition"
          >
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  )
}