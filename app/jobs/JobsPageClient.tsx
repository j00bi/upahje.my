'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { JobFilters } from '@/components/jobs/JobFilters'
import type { JobFilters as JobFiltersType } from '@/lib/actions/jobs'

interface Job {
  id: string
  title: string
  description: string | null
  rate: string | null
  location: string | null
  track: string
  status: string
  createdAt: string
  categoryId: string
  employer: {
    company: string | null
    user: { name: string | null }
  } | null
  category: { id: string; name: string; emoji: string | null } | null
}

interface Category { id: string; name: string; emoji: string | null; track: string }

const SAMPLE_CATEGORIES: Category[] = [
  { id: 'rumah-taman', name: 'Rumah & Taman', emoji: '🏠', track: 'LABOUR' },
  { id: 'haiwan', name: 'Haiwan Peliharaan', emoji: '🐾', track: 'LABOUR' },
  { id: 'cucian', name: 'Cucian & Dobi', emoji: '👕', track: 'LABOUR' },
  { id: 'angkat', name: 'Angkat & Hantar', emoji: '📦', track: 'LABOUR' },
  { id: 'masakan', name: 'Masakan & Katering', emoji: '🍳', track: 'LABOUR' },
  { id: 'design', name: 'Design & Kreatif', emoji: '🎨', track: 'TECHNICAL' },
  { id: 'webdev', name: 'Web & App Dev', emoji: '💻', track: 'TECHNICAL' },
  { id: 'marketing', name: 'Pemasaran Digital', emoji: '📣', track: 'TECHNICAL' },
  { id: 'content', name: 'Kandungan & Penulisan', emoji: '✍️', track: 'TECHNICAL' },
]

const SAMPLE_LOCATIONS = [
  'Kuala Lumpur', 'Petaling Jaya', 'Shah Alam', 'Kajang', 'Cheras',
  'Ampang', 'KL Sentral', 'Penang', 'Johor Bahru',
]

function filtersFromSearchParams(searchParams: ReturnType<typeof useSearchParams>): JobFiltersType {
  const track = searchParams.get('track')
  const status = searchParams.get('status')

  return {
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    location: searchParams.get('location') || undefined,
    track: track === 'LABOUR' || track === 'TECHNICAL' ? track : undefined,
    status: status || undefined,
  }
}

export default function JobsPageClient() {
  const searchParams = useSearchParams()
  const searchKey = searchParams.toString()
  const initialFilters = filtersFromSearchParams(searchParams)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<JobFiltersType>(initialFilters)
  const categories = SAMPLE_CATEGORIES
  const [locations] = useState<string[]>(SAMPLE_LOCATIONS)

  const fetchJobs = useCallback(async (f: JobFiltersType) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (f.search) params.set('search', f.search)
      if (f.category) params.set('category', f.category)
      if (f.location) params.set('location', f.location)
      if (f.track) params.set('track', f.track)
      if (f.status) params.set('status', f.status)

      const res = await fetch(`/api/jobs?${params.toString()}`)
      const data = await res.json()
      setJobs(Array.isArray(data) ? data : [])
    } catch {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setFilters(initialFilters)
  }, [searchKey])

  useEffect(() => { fetchJobs(filters) }, [filters, fetchJobs])

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Browse Jobs</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {loading ? 'Searching...' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} available`}
              </p>
            </div>
            <Link
              href="/jobs/post"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-medium transition"
            >
              + Post a Job
            </Link>
          </div>

          <JobFilters
            key={searchKey}
            onFilterChange={setFilters}
            categories={categories}
            locations={locations}
            initialFilters={initialFilters}
          />
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {jobs.length === 0 && !loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No jobs found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => setFilters({})}
              className="px-6 py-2.5 border border-slate-300 rounded-2xl text-sm font-medium hover:bg-slate-50 transition"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-white border border-slate-200 rounded-3xl p-6 hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {job.category && (
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full mb-2">
                        {job.category.emoji} {job.category.name}
                      </span>
                    )}
                    <h3 className="font-semibold text-xl text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
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
                        <span>{job.employer.company}</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${job.track === 'LABOUR' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                        {job.track === 'LABOUR' ? '🛠️ Labour' : '💻 Technical'}
                      </span>
                    </div>
                    {job.description && (
                      <p className="mt-3 text-slate-700 text-sm line-clamp-2 leading-relaxed">{job.description}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {job.rate && (
                      <div className="font-semibold text-emerald-700">{job.rate}</div>
                    )}
                    <div className="text-xs text-slate-400 mt-1">
                      {new Date(job.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
