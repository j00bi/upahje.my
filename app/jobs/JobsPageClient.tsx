'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { JobFilters } from '@/components/jobs/JobFilters'
import { ExpandableJobCard } from '@/components/jobs/ExpandableJobCard'
import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'
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

interface Category { id: string; name: string; emoji: string | null; track: 'LABOUR' | 'TECHNICAL' }

const DISCOVERY_CATEGORIES: Category[] = [
  ...LABOUR_CATEGORIES.map((category) => ({ ...category, track: 'LABOUR' as const })),
  ...TECHNICAL_CATEGORIES.map((category) => ({ ...category, track: 'TECHNICAL' as const })),
]

function filtersFromQueryString(queryString: string): JobFiltersType {
  const searchParams = new URLSearchParams(queryString)
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchKey = searchParams.toString()
  const initialFilters = useMemo(() => filtersFromQueryString(searchKey), [searchKey])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<JobFiltersType>(initialFilters)
  const categories = DISCOVERY_CATEGORIES
  const locations = useMemo(() => {
    const realLocations = jobs
      .map((job) => job.location?.trim())
      .filter((location): location is string => Boolean(location))

    return [...new Set(realLocations)].sort((a, b) => a.localeCompare(b))
  }, [jobs])
  const hasActiveFilters = Boolean(filters.search || filters.category || filters.location || filters.track)

  const writeFiltersToUrl = useCallback((nextFilters: JobFiltersType) => {
    const params = new URLSearchParams()
    if (nextFilters.search) params.set('search', nextFilters.search)
    if (nextFilters.category) params.set('category', nextFilters.category)
    if (nextFilters.location) params.set('location', nextFilters.location)
    if (nextFilters.track) params.set('track', nextFilters.track)
    if (nextFilters.status) params.set('status', nextFilters.status)

    const nextQuery = params.toString()
    if (nextQuery !== searchKey) {
      router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ''}`, { scroll: false })
    }
  }, [pathname, router, searchKey])

  const handleFilterChange = useCallback((nextFilters: JobFiltersType) => {
    setFilters(nextFilters)
    writeFiltersToUrl(nextFilters)
  }, [writeFiltersToUrl])

  const fetchJobs = useCallback(async (f: JobFiltersType) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (f.search) params.set('search', f.search)
      if (f.category) params.set('category', f.category)
      if (f.location) params.set('location', f.location)
      if (f.track) params.set('track', f.track)
      if (f.status) params.set('status', f.status)

      const res = await fetch(`/api/jobs?${params.toString()}`)
      if (!res.ok) {
        throw new Error(`Job request failed with ${res.status}`)
      }

      const data = await res.json()
      setJobs(Array.isArray(data) ? data : [])
    } catch {
      setJobs([])
      setError('Unable to load live jobs right now. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  useEffect(() => { fetchJobs(filters) }, [filters, fetchJobs])

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Cari Kerja</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {loading ? 'Mencari...' : `${jobs.length} kerja dijumpai`}
              </p>
            </div>
            <Link
              href="/jobs/post"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-medium transition"
            >
              + Post Kerja
            </Link>
          </div>

          <JobFilters
            key={searchKey}
            onFilterChange={handleFilterChange}
            categories={categories}
            locations={locations}
            initialFilters={initialFilters}
          />
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {error && !loading ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">!</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Jobs could not load</h3>
            <p className="text-slate-500 mb-6">{error}</p>
            <button
              onClick={() => fetchJobs(filters)}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-medium transition"
            >
              Retry
            </button>
          </div>
        ) : jobs.length === 0 && !loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {hasActiveFilters ? 'No matching jobs found' : 'No live jobs yet'}
            </h3>
            <p className="text-slate-500 mb-2">
              {hasActiveFilters
                ? 'Try a broader search or clear filters to see every open job.'
                : 'The marketplace is ready, but no employer has posted a live job yet.'}
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <Link
                href="/jobs/post"
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-medium transition"
              >
                + Post Kerja
              </Link>
              <button
                onClick={() => handleFilterChange({})}
                className="px-6 py-2.5 border border-slate-300 rounded-2xl text-sm font-medium hover:bg-slate-50 transition"
              >
                Clear filters
              </button>
            </div>
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
