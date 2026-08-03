import { notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getSampleMarketplaceJob } from '@/lib/sampleJobs'
import { ApplySection } from './ApplySection'

export const dynamic = 'force-dynamic'

interface JobDetail {
  id: string
  title: string
  description: string | null
  rate: string | null
  location: string | null
  track: string
  status: string
  createdAt: Date
  category: { id: string; name: string; emoji: string | null } | null
  employer: {
    company: string | null
    user: { id: string; name: string | null; email: string }
  } | null
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const session = await auth()

  let job: JobDetail | null = getSampleMarketplaceJob(jobId)
  let loadFailed = false

  if (!job) {
    try {
      job = await prisma.job.findUnique({
        where: { id: jobId },
        include: {
          employer: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
          category: { select: { id: true, name: true, emoji: true } },
        },
      })
    } catch (error) {
      console.error('Job detail fetch error:', error)
      loadFailed = true
    }
  }

  if (loadFailed) {
    return (
      <div className="min-h-[70vh] bg-[#f8f8f8] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 text-center sm:p-8">
          <div className="text-4xl" aria-hidden="true">↻</div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">We couldn&apos;t load this job</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            The marketplace service is temporarily unavailable. Your account and application data have not been changed.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/jobs/${jobId}`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-green-mid px-5 text-sm font-semibold text-white">
              Try again
            </Link>
            <Link href="/jobs" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-800">
              Back to jobs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!job) notFound()
  const isPreview = jobId.startsWith('sample-')

  const postedDate = new Date(job.createdAt).toLocaleDateString('ms-MY', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Back nav */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Main card */}
        {isPreview && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
            <span className="font-semibold">Preview listing.</span>{' '}
            This example shows how a job page works and cannot accept applications.
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            {job.category && (
              <span className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                {job.category.emoji} {job.category.name}
              </span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${job.track === 'LABOUR' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
              {job.track === 'LABOUR' ? '🛠️ Labour' : '💻 Technical'}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ml-auto ${job.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
              {job.status === 'OPEN' ? 'Open' : job.status}
            </span>
          </div>

          <h1 className="text-3xl font-semibold text-slate-900 mb-4">{job.title}</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {job.rate && (
              <div className="bg-emerald-50 rounded-2xl p-4">
                <div className="text-xs text-emerald-600 font-medium uppercase tracking-wide mb-1">Budget</div>
                <div className="font-semibold text-emerald-800">{job.rate}</div>
              </div>
            )}
            {job.location && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Location</div>
                <div className="font-medium text-slate-800">{job.location}</div>
              </div>
            )}
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Posted</div>
              <div className="font-medium text-slate-800">{postedDate}</div>
            </div>
          </div>

          {job.description && (
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>
          )}

          {job.employer && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">About the employer</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold">
                  {(job.employer.company || job.employer.user.name || 'E')[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-slate-800">{job.employer.company || job.employer.user.name || 'Employer'}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview listings demonstrate layout but never accept applications. */}
        {isPreview ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Ready to find real work?</h2>
            <p className="mt-1 text-sm text-slate-600">
              Browse available jobs or create your talent profile to be ready when new jobs are posted.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/jobs" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-green-mid px-5 text-sm font-semibold text-white">
                Browse jobs
              </Link>
              <Link href="/auth/signup?role=talent" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-800">
                Create talent profile
              </Link>
            </div>
          </div>
        ) : (
          <ApplySection jobId={jobId} userId={session?.user?.id} />
        )}
      </div>
    </div>
  )
}
