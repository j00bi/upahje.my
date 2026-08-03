import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ApplicationDecisionCard } from '@/components/applications/ApplicationDecisionCard'
import { getUserWithRole } from '@/lib/auth'
import { scoreApplicationMatch } from '@/lib/application-matching'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const { user } = await getUserWithRole()

  if (!user) {
    redirect(`/auth/signin?callbackUrl=/jobs/${jobId}/matches`)
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      category: true,
      employer: true,
      applications: {
        include: {
          applicant: {
            include: {
              profile: true,
              talent: {
                include: {
                  categories: true,
                },
              },
            },
          },
        },
        orderBy: [
          { status: 'asc' },
          { createdAt: 'desc' },
        ],
      },
    },
  })

  if (!job) notFound()
  if (job.employer.userId !== user.id) {
    redirect('/dashboard')
  }

  const pendingCount = job.applications.filter(
    (application) => application.status === 'PENDING',
  ).length
  const acceptedApplication = job.applications.find(
    (application) => application.status === 'ACCEPTED',
  )

  return (
    <div className="min-h-screen bg-[#f8f8f8] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard/employer"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Employer dashboard
        </Link>

        <header className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900">
                Application review
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                {job.title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Compare proposals and trust signals. You stay in control of the hiring decision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-64">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Applications</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{job.applications.length}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-amber-700">Pending</p>
                <p className="mt-1 text-2xl font-semibold text-amber-950">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5 text-xs text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1.5">{job.category.emoji} {job.category.name}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5">{job.track === 'LABOUR' ? 'Labour' : 'Technical'}</span>
            {job.location && <span className="rounded-full bg-slate-100 px-3 py-1.5">{job.location}</span>}
            {job.rate && <span className="rounded-full bg-slate-100 px-3 py-1.5">{job.rate}</span>}
          </div>
        </header>

        {acceptedApplication && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950" role="status">
            <span className="font-semibold">Applicant selected.</span>{' '}
            {acceptedApplication.applicant.name || 'The chosen talent'} is now assigned to this job.
            Payment can be unlocked from the matched job flow once the agreement details are confirmed.
          </div>
        )}

        <section className="mt-6">
          {job.applications.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {job.applications.map((application) => {
                const talent = application.applicant.talent
                const match = scoreApplicationMatch({
                  jobTrack: job.track,
                  talentTrack: talent?.track,
                  jobCategoryId: job.categoryId,
                  talentCategoryIds: talent?.categories.map(
                    (category) => category.categoryId,
                  ) ?? [],
                  jobLocation: job.location,
                  talentState: application.applicant.profile?.state,
                  talentArea: application.applicant.profile?.area,
                  kycStatus: application.applicant.profile?.kycStatus,
                })

                return (
                  <ApplicationDecisionCard
                    key={application.id}
                    applicationId={application.id}
                    applicantName={application.applicant.name || 'UpahJe talent'}
                    proposal={application.message}
                    submittedAt={new Date(application.createdAt).toLocaleDateString('ms-MY', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    status={application.status}
                    score={match.score}
                    reasons={match.reasons}
                  />
                )
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center">
              <h2 className="text-lg font-semibold text-slate-950">No applications yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                Your job remains open. Applications will appear here as talents submit their proposals.
              </p>
              <Link
                href={`/jobs/${job.id}`}
                className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                View public job
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
