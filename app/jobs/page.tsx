import { JobCard } from '@/components/jobs/JobCard'
import { getJobs } from '@/lib/actions/jobs'
import Link from 'next/link'

export default async function JobsPage() {
  const jobs = await getJobs(20)

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Browse Jobs</h1>
          <p className="mt-1 text-slate-600">{jobs.length} open opportunities right now</p>
        </div>
        <Link 
          href="/jobs/post" 
          className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Post a Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">No open jobs right now. Be the first to post a job!</p>
          <Link href="/jobs/post" className="mt-4 inline-block rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            Post the first job
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => {
            const transformedJob = {
              id: job.id,
              title: job.title,
              category: job.track || 'General',
              location: job.location || 'Malaysia',
              budget: job.rate ? String(job.rate) : 'Contact for rate',
              status: job.status,
              postedDate: job.createdAt 
                ? new Date(job.createdAt).toLocaleDateString('en-MY', { month: 'short', day: 'numeric' })
                : 'Recently',
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