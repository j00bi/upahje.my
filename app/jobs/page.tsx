import { JobCard } from '@/components/jobs/JobCard'
import { JobFilters } from '@/components/jobs/JobFilters'
import { getJobs, getCategories, getLocations, JobFilters as JobFiltersType } from '@/lib/actions/jobs'
import Link from 'next/link'

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const filters: JobFiltersType = {
    search: typeof params.search === 'string' ? params.search : undefined,
    category: typeof params.category === 'string' ? params.category : undefined,
    location: typeof params.location === 'string' ? params.location : undefined,
    track: params.track === 'LABOUR' || params.track === 'TECHNICAL' ? params.track : undefined,
  }

  const [jobs, categories, locations] = await Promise.all([
    getJobs(filters),
    getCategories(),
    getLocations(),
  ])

  const getEmployer = (
    employer: { company?: string }[] | { company?: string } | null | undefined
  ) => {
    if (!employer) {
      return undefined
    }

    return Array.isArray(employer) ? employer[0] : employer
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Browse Jobs</h1>
          <p className="mt-1 text-slate-600">
            {jobs.length} {jobs.length === 1 ? 'opportunity' : 'opportunities'} available
          </p>
        </div>
        <Link 
          href="/jobs/post" 
          className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition"
        >
          Post a Job
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <JobFilters 
          categories={categories}
          locations={locations}
          initialFilters={filters}
          onFilterChange={() => {
            // In a real app, this would update the URL params
            // For now, we'll rely on server-side filtering
          }}
        />
      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
            <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No jobs found</h3>
          <p className="text-slate-600 mb-4">Try adjusting your filters or search terms</p>
          <Link 
            href="/jobs/post" 
            className="inline-block rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition"
          >
            Post the first job
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => {
            const category = Array.isArray(job.category) ? job.category[0] : job.category
            const employer = getEmployer(job.employer)
            const transformedJob = {
              id: job.id,
              title: job.title,
              category: category?.name || job.track || 'General',
              categoryEmoji: category?.emoji,
              location: job.location || 'Malaysia',
              budget: job.rate ? String(job.rate) : 'Contact for rate',
              status: job.status,
              postedDate: job.createdAt 
                ? new Date(job.createdAt).toLocaleDateString('en-MY', { month: 'short', day: 'numeric' })
                : 'Recently',
              employerName: employer?.company || undefined,
              skills: job.description ? job.description.split(',').slice(0, 3).map((s: string) => s.trim()) : [],
              isEscrowProtected: true, // Assuming all jobs are escrow protected
            }
            return (
              <a key={job.id} href={`/jobs/${job.id}`} className="block hover:opacity-95 transition">
                <JobCard {...transformedJob} />
              </a>
            )
          })}
        </div>
      )}
    </main>
  )
}
