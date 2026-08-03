'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'

interface Job {
  id: string
  title: string
  description: string | null
  rate: string | null
  location: string | null
  track: string
  status: string
  createdAt: string
  employer: {
    company: string | null
    user: { name: string | null }
  } | null
  category: { id: string; name: string; emoji: string | null } | null
}

interface ExpandableJobCardProps {
  job: Job
}

export function ExpandableJobCard({ job }: ExpandableJobCardProps) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { isEnglish } = useLanguage()

  const toggle = () => setExpanded(e => !e)

  // Scroll into view when expanding
  useEffect(() => {
    if (expanded && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [expanded])

  return (
    <div
      className={`bg-white border border-slate-200 rounded-3xl transition-all duration-300 ${
        expanded ? 'shadow-lg border-green-mid/40' : 'hover:border-green-mid/30 hover:shadow-md'
      }`}
    >
      {/* Clickable collapsed card */}
      <button
        onClick={toggle}
        className="w-full text-left p-6"
        aria-expanded={expanded}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            {job.category && (
              <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full mb-2">
                {job.category.emoji} {job.category.name}
              </span>
            )}
            <h3 className="font-semibold text-xl text-slate-900 truncate">
              {job.title}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500">
              {job.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
              )}
              {job.employer?.company && (
                <span className="hidden sm:inline">{job.employer.company}</span>
              )}
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${job.track === 'LABOUR' ? 'bg-green-soft text-green-mid' : 'bg-purple-100 text-purple-700'}`}>
                {job.track === 'LABOUR'
                  ? (isEnglish ? '🛠️ Physical work' : '🛠️ Kerja fizikal')
                  : (isEnglish ? '💻 Technical' : '💻 Teknikal')}
              </span>
            </div>
            {job.description && !expanded && (
              <p className="mt-3 text-slate-700 text-sm line-clamp-2 leading-relaxed">{job.description}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            {job.rate && (
              <div className="font-semibold text-green-mid">{job.rate}</div>
            )}
            <div className="text-xs text-slate-400 mt-1">
              {new Date(job.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })}
            </div>
            {/* Expand indicator */}
            <div className="mt-2 flex justify-end">
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
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
        <div className="px-6 pb-6 pt-2 border-t border-slate-100">
          {job.description && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {isEnglish ? 'Job details' : 'Butiran kerja'}
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {job.rate && (
              <div className="bg-green-soft rounded-2xl p-3">
                <div className="text-xs text-green-mid font-medium uppercase tracking-wide mb-0.5">
                  {isEnglish ? 'Budget' : 'Bajet'}
                </div>
                <div className="font-semibold text-green-deep text-sm">{job.rate}</div>
              </div>
            )}
            {job.location && (
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">
                  {isEnglish ? 'Location' : 'Lokasi'}
                </div>
                <div className="font-medium text-slate-800 text-sm">{job.location}</div>
              </div>
            )}
            {job.employer && (
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">
                  {isEnglish ? 'Posted by' : 'Dipost oleh'}
                </div>
                <div className="font-medium text-slate-800 text-sm truncate">
                  {job.employer.company || job.employer.user.name || (isEnglish ? 'Anonymous' : 'Tanpa nama')}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/jobs/${job.id}`)}
              className="flex-1 py-3 bg-green-mid hover:bg-green-deep text-white font-medium text-sm rounded-2xl transition"
            >
              {isEnglish ? 'View full details' : 'Lihat butiran penuh'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
