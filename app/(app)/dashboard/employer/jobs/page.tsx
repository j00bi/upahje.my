import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ApplicationActions } from './ApplicationActions'

export const dynamic = 'force-dynamic'

const statusClasses: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  REVIEWED: 'bg-blue-100 text-blue-800',
  ACCEPTED: 'bg-teal-100 text-teal-800',
  REJECTED: 'bg-slate-100 text-slate-700',
  WITHDRAWN: 'bg-slate-100 text-slate-500',
}

export default async function EmployerJobsPage() {
  const { user, employer } = await getUserWithRole()

  if (!user) {
    redirect('/auth/signin?callbackUrl=/dashboard/employer/jobs')
  }

  if (!employer) {
    redirect('/onboarding')
  }

  const jobs = await prisma.job.findMany({
    where: { employerId: employer.id },
    include: {
      category: { select: { name: true, emoji: true } },
      applications: {
        include: {
          talent: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-900">
              My jobs
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950">
              Review applications and choose who to hire.
            </h1>
            <p className="text-sm leading-6 text-slate-600">
              Accepting an application matches the job and closes other pending proposals.
            </p>
          </div>
          <Link
            href="/jobs/post"
            className="inline-flex h-11 items-center justify-center rounded-full bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Post New Job
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <article key={job.id} className="glass rounded-[1.75rem] p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {job.category?.emoji} {job.category?.name}
                    </span>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                      {job.status}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {job.applications.length} {job.applications.length === 1 ? 'application' : 'applications'}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-950">{job.title}</h2>
                  <p className="text-sm text-slate-600">{job.location || 'Location not specified'} · {job.rate || 'Negotiable'}</p>
                </div>
                <Link href={`/jobs/${job.id}`} className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                  View public page
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {job.applications.length > 0 ? (
                  job.applications.map((application) => {
                    const applicantName = application.talent.user.name || application.talent.user.email || 'Talent'

                    return (
                      <div key={application.id} className="rounded-2xl border border-slate-200 bg-white/85 p-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-slate-950">{applicantName}</h3>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[application.status] ?? 'bg-slate-100 text-slate-700'}`}>
                                {application.status}
                              </span>
                              {application.talent.verified && (
                                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-slate-600">
                              {application.talent.track} · {application.talent.rate || 'Rate not set'} · {application.talent.availability || 'Availability not set'}
                            </p>
                          </div>
                          <ApplicationActions applicationId={application.id} currentStatus={application.status} jobStatus={job.status} />
                        </div>
                        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                          {application.proposal}
                        </p>
                      </div>
                    )
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-5 text-sm text-slate-600">
                    No applications yet. Share this job or wait for matching talent to apply.
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="glass rounded-[1.75rem] p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-950">No jobs posted yet</h2>
            <p className="mt-2 text-sm text-slate-600">Post a job before you can review applications.</p>
            <Link href="/jobs/post" className="mt-4 inline-flex rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">
              Post your first job
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
