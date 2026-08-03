'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { JobFilters } from '@/components/jobs/JobFilters'
import { ExpandableJobCard } from '@/components/jobs/ExpandableJobCard'
import type { JobFilters as JobFiltersType } from '@/lib/actions/jobs'
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
  const router = useRouter()
  const { isEnglish } = useLanguage()
  const searchKey = searchParams.toString()
  const initialFilters = filtersFromSearchParams(searchParams)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<'live' | 'preview'>('live')
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
      setDataSource(res.headers.get('x-upahje-data-source') === 'preview' ? 'preview' : 'live')
      setJobs(Array.isArray(data) ? data : [])
    } catch {
      setDataSource('preview')
      setJobs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setFilters(filtersFromSearchParams(searchParams))
  }, [searchParams])

  useEffect(() => { fetchJobs(filters) }, [filters, fetchJobs])

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {filters.search
                  ? (isEnglish ? `Results for “${filters.search}”` : `Hasil untuk “${filters.search}”`)
                  : (isEnglish ? 'Find work that fits' : 'Cari kerja yang sesuai')}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5" aria-live="polite">
                {loading
                  ? (isEnglish ? 'Searching jobs...' : 'Mencari kerja...')
                  : isEnglish
                    ? `${jobs.length} ${jobs.length === 1 ? 'job' : 'jobs'} available`
                    : `${jobs.length} kerja tersedia`}
              </p>
            </div>
            <Link
              href="/jobs/post"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-medium transition"
            >
              {isEnglish ? '+ Post a Job' : '+ Post Kerja'}
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
        {dataSource === 'preview' && !loading && (
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
            <span className="font-semibold">
              {isEnglish ? 'Marketplace preview.' : 'Paparan marketplace.'}
            </span>{' '}
            {isEnglish
              ? 'These sample listings are shown while live inventory is unavailable. They do not accept applications.'
              : 'Ini ialah contoh senarai sementara inventori sebenar belum tersedia. Contoh ini tidak menerima permohonan.'}
          </div>
        )}
        {jobs.length === 0 && !loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {isEnglish ? 'No matching jobs' : 'Tiada kerja yang sepadan'}
            </h3>
            <p className="text-slate-500 mb-6">
              {isEnglish ? 'Try a broader search or clear your filters.' : 'Cuba carian yang lebih umum atau kosongkan tapisan.'}
            </p>
            <button
              onClick={() => router.replace('/jobs')}
              className="px-6 py-2.5 border border-slate-300 rounded-2xl text-sm font-medium hover:bg-slate-50 transition"
            >
              {isEnglish ? 'Clear search and filters' : 'Kosongkan carian dan tapisan'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map(job => (
              <ExpandableJobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
