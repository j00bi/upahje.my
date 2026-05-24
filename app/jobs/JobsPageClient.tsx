'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { JobFilters } from '@/components/jobs/JobFilters'
import { ExpandableJobCard } from '@/components/jobs/ExpandableJobCard'
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
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Belum ada kerja lagi</h3>
            <p className="text-slate-500 mb-2">Jadi yang pertama — post kerja dan dapatkan talent dalam masa 24 jam.</p>
            <div className="flex justify-center gap-3 mt-6">
              <Link
                href="/jobs/post"
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-medium transition"
              >
                + Post Kerja
              </Link>
              <button
                onClick={() => setFilters({})}
                className="px-6 py-2.5 border border-slate-300 rounded-2xl text-sm font-medium hover:bg-slate-50 transition"
              >
                Semua filter
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
