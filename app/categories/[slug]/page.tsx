import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Map category slugs to database category IDs
const SLUG_TO_CATEGORY_ID: Record<string, string> = {
  'home-services': 'rumah-taman',
  'web-design': 'webdev',
  'electrical-trade': 'elektrik',
  'admin-support': 'content',
  'photography': 'foto',
}

const CATEGORY_ALIASES: Record<string, string> = {
  'web-development': 'web-design',
  'design-creative': 'design',
  'labour-general': 'home-services',
  'admin-data': 'admin-support',
}

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

async function getJobsByCategory(categoryId: string): Promise<Job[]> {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        categoryId: categoryId,
        status: 'OPEN',
      },
      include: {
        employer: {
          include: {
            user: { select: { name: true } },
          },
        },
        category: { select: { id: true, name: true, emoji: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    return jobs.map(job => ({
      ...job,
      createdAt: job.createdAt.toISOString(),
    })) as unknown as Job[]
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    const alias = CATEGORY_ALIASES[slug]
    if (alias) {
      redirect(`/categories/${alias}`)
    }
    notFound()
  }

  // Map slug to categoryId for database query
  const categoryId = SLUG_TO_CATEGORY_ID[slug] || slug
  const jobs = await getJobsByCategory(categoryId)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-black text-white">
      {/* ─── Category Hero ─── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 sm:px-6 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">{category.name}</span>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800 text-3xl">
              {category.emoji}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-amber-400">
                {jobs.length} job{jobs.length !== 1 ? 's' : ''} available
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {category.emoji} {category.name}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                {category.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/jobs/post"
                  className="inline-flex h-10 items-center rounded-xl bg-amber-500 px-5 text-xs font-semibold text-black transition-colors hover:bg-amber-400"
                >
                  Post a {category.name} Job
                </Link>
                {jobs.length > 0 && (
                  <Link
                    href="/jobs"
                    className="inline-flex h-10 items-center rounded-xl border border-zinc-700 bg-zinc-900 px-5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
                  >
                    Browse All Jobs
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Jobs Section ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        {jobs.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">
              Live {category.name} Jobs
            </h2>
            {jobs.map(job => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-amber-500/30 hover:bg-zinc-900 transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Category badge */}
                    {job.category && (
                      <span className="inline-flex items-center gap-1 text-xs bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full mb-2">
                        {job.category.emoji} {job.category.name}
                      </span>
                    )}
                    <h3 className="font-semibold text-xl text-white group-hover:text-amber-400 transition-colors truncate">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-zinc-400">
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                      )}
                      {job.employer?.company && (
                        <span>{job.employer.company}</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${job.track === 'LABOUR' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                        {job.track === 'LABOUR' ? '🛠️ Labour' : '💻 Technical'}
                      </span>
                    </div>
                    {job.description && (
                      <p className="mt-3 text-zinc-400 text-sm line-clamp-2 leading-relaxed">{job.description}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {job.rate && (
                      <div className="font-semibold text-amber-400">{job.rate}</div>
                    )}
                    <div className="text-xs text-zinc-500 mt-1">
                      {new Date(job.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl">{category.emoji}</div>
            <h2 className="text-xl font-bold text-white">No live jobs yet</h2>
            <p className="mt-2 max-w-md text-sm text-zinc-500">
              Be the first to post a {category.name.toLowerCase()} job and connect with talented professionals.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/jobs/post"
                className="inline-flex h-10 items-center rounded-xl bg-amber-500 px-5 text-xs font-semibold text-black transition-colors hover:bg-amber-400"
              >
                Post a Job
              </Link>
              <Link
                href="/jobs"
                className="inline-flex h-10 items-center rounded-xl border border-zinc-700 bg-zinc-900 px-5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Browse Other Jobs
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ─── Other Categories ─── */}
      <section className="border-t border-zinc-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-xl font-bold sm:text-2xl">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {MARKETPLACE_CATEGORIES.filter((c) => c.slug !== slug).slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-amber-500/30 hover:bg-zinc-900"
              >
                <span className="text-2xl transition-transform group-hover:scale-110">{cat.emoji}</span>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-800 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} UpahJe.my — Malaysia's creative talent marketplace
        </div>
      </footer>
    </div>
  )
}