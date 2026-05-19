import { redirect } from 'next/navigation'
import { auth, getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { JobCard } from '@/components/jobs/JobCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TalentDashboard() {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard/talent')
  }

  // Fetch talent data
  const { user } = await getUserWithRole()

  if (!user) {
    redirect('/onboarding')
  }

  const talent = await prisma.talent.findUnique({
    where: { userId: user.id },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      jobs: {
        include: {
          employer: {
            include: {
              user: true,
            },
          },
          category: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!talent) {
    redirect('/onboarding')
  }

  // Get available jobs based on talent's categories
  const availableJobs = await prisma.job.findMany({
    where: {
      status: 'OPEN',
      categoryId: {
        in: talent.categories.map((tc: { categoryId: string }) => tc.categoryId),
      },
      talentId: null,
    },
    include: {
      employer: {
        include: {
          user: true,
        },
      },
      category: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 6,
  })

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-5 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">
              Talent dashboard
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950">
              Find jobs that match your skills.
            </h1>
            <p className="text-sm leading-6 text-slate-600">
              Browse available jobs and apply to opportunities that fit your expertise.
            </p>
          </div>
          <Link 
            href="/talent/profile"
            className="inline-flex h-11 items-center justify-center rounded-full bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Edit Profile
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="glass rounded-[1.75rem] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Available Jobs</h2>
              <p className="text-sm text-slate-600">Jobs matching your categories.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {availableJobs.length > 0 ? (
              availableJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  category={job.category?.name || 'Uncategorized'}
                  location={job.location || 'Not specified'}
                  budget={job.rate || 'Negotiable'}
                  status={job.status}
                  postedDate={new Date(job.createdAt).toLocaleDateString()}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-slate-500">
                <p>No available jobs matching your categories.</p>
                <Link 
                  href="/jobs"
                  className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                >
                  Browse all jobs →
                </Link>
              </div>
            )}
          </div>
        </article>

        <aside className="glass rounded-[1.75rem] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-950">Your Categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {talent.categories.map((tc) => (
              <span
                key={tc.categoryId}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700"
              >
                {tc.category.emoji && <span className="mr-1">{tc.category.emoji}</span>}
                {tc.category.name}
              </span>
            ))}
          </div>
          
          <h2 className="text-lg font-semibold text-slate-950 mt-6">Active Jobs</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Jobs you&apos;re currently working on.
          </p>
          <div className="mt-4 space-y-3">
            {talent.jobs.length > 0 ? (
              talent.jobs.slice(0, 3).map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-600">{job.employer?.user?.name || 'Employer'}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-500">
                No active jobs yet.
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  )
}
