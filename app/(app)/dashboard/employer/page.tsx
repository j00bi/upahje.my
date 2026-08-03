import { redirect } from 'next/navigation'
import { auth, getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { JobCard } from '@/components/jobs/JobCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EmployerDashboard() {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard/employer')
  }

  // Fetch employer data and jobs
  const { user } = await getUserWithRole()

  if (!user) {
    redirect('/onboarding')
  }

  const employer = await prisma.employer.findUnique({
    where: { userId: user.id },
    include: {
      jobs: {
        include: {
          category: true,
          talent: true,
          applications: {
            select: { id: true, status: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!employer) {
    redirect('/onboarding')
  }

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
              Employer dashboard
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950">
              Post jobs, review matches, and keep the trust layer visible.
            </h1>
            <p className="text-sm leading-6 text-slate-600">
              Manage your job postings and track talent matches.
            </p>
          </div>
          <Link 
            href="/jobs/post"
            className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Post New Job
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="glass rounded-[1.75rem] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Your Active Jobs</h2>
              <p className="text-sm text-slate-600">Current postings and their status.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {employer.jobs.length > 0 ? (
              employer.jobs.map((job: any) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  category={job.category?.name || 'Uncategorized'}
                  location={job.location || 'Not specified'}
                  budget={job.rate || 'Negotiable'}
                  status={job.status}
                  postedDate={new Date(job.createdAt).toLocaleDateString()}
                  proposalCount={job.applications.length}
                  detailsHref={`/jobs/${job.id}/matches`}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-slate-500">
                <p>No jobs posted yet.</p>
                <Link 
                  href="/jobs/post"
                  className="text-emerald-600 hover:text-emerald-700 font-medium mt-2 inline-block"
                >
                  Post your first job →
                </Link>
              </div>
            )}
          </div>
        </article>

        <aside className="glass rounded-[1.75rem] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-950">Application inbox</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Open a job to review proposals and choose who you want to hire.
          </p>
          <div className="mt-5 space-y-3">
            {employer.jobs.filter((job) => job.applications.length > 0).length > 0 ? (
              employer.jobs
                .filter((job) => job.applications.length > 0)
                .slice(0, 5)
                .map((job) => {
                  const pendingCount = job.applications.filter(
                    (application) => application.status === 'PENDING',
                  ).length

                  return (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}/matches`}
                      className="block rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:border-emerald-300 hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-900">{job.title}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {job.applications.length} total application{job.applications.length === 1 ? '' : 's'}
                          </p>
                        </div>
                        {pendingCount > 0 && (
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                            {pendingCount} new
                          </span>
                        )}
                      </div>
                    </Link>
                  )
                })
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-500">
                No applications yet. New proposals will appear here.
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  )
}
