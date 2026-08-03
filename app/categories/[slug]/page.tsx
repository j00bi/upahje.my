import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { getCategoryBySlug, MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { prisma } from '@/lib/prisma'
import { getSampleMarketplaceJobs } from '@/lib/sampleJobs'
import { previewDataEnabled } from '@/lib/security'

const SLUG_TO_CATEGORY_ID: Record<string, string> = {
  'home-services': 'rumah-taman',
  'web-design': 'webdev',
  'electrical-trade': 'elektrik',
  'admin-support': 'content',
  photography: 'foto',
}

const CATEGORY_ALIASES: Record<string, string> = {
  'web-development': 'web-design',
  'design-creative': 'design',
  'labour-general': 'home-services',
  'admin-data': 'admin-support',
}

interface MarketplaceJob {
  id: string
  title: string
  description: string | null
  rate: string | null
  location: string | null
  track: string
  status: string
  createdAt: Date | string
  categoryId: string
  employer: {
    company: string | null
    user: { name: string | null }
  } | null
  category: { id: string; name: string; emoji: string | null } | null
}

async function getJobsByCategory(categoryId: string): Promise<{
  jobs: MarketplaceJob[]
  isPreview: boolean
}> {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        categoryId,
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

    if (jobs.length > 0) {
      return { jobs, isPreview: false }
    }
  } catch (error) {
    console.error('Error fetching category jobs:', error)
    if (!previewDataEnabled()) {
      return { jobs: [], isPreview: false }
    }
  }

  if (!previewDataEnabled()) {
    return { jobs: [], isPreview: false }
  }

  return {
    jobs: getSampleMarketplaceJobs().filter((job) => job.categoryId === categoryId),
    isPreview: true,
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

  const categoryId = SLUG_TO_CATEGORY_ID[slug] || slug
  const { jobs, isPreview } = await getJobsByCategory(categoryId)

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="border-b border-neutral-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="rounded hover:text-green-mid">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/categories" className="rounded hover:text-green-mid">Categories</Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-800" aria-current="page">{category.name}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: 'var(--color-green-soft)' }}
                aria-hidden="true"
              >
                {category.emoji}
              </div>
              <div>
                <div className="inline-flex items-center rounded-full bg-green-soft px-3 py-1 text-xs font-semibold text-green-deep">
                  {category.talentCount} talent tersedia
                </div>
                <h1 className="mt-3 font-display-xl text-green-deep">{category.name}</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-body">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <Link
                href="/talent"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-green-mid px-5 text-sm font-semibold text-white transition hover:bg-green-deep"
              >
                Browse talent
              </Link>
              <Link
                href="/jobs/post"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-800 transition hover:border-green-mid hover:text-green-mid"
              >
                Post a {category.name} job
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {isPreview && jobs.length > 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
            <span className="font-semibold">Marketplace preview.</span>{' '}
            These example listings demonstrate the category while live inventory is unavailable.
          </div>
        )}

        {jobs.length > 0 ? (
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="section-label text-green-mid">{isPreview ? 'Preview listings' : 'Open now'}</p>
                <h2 className="mt-2 text-2xl font-bold text-green-deep">
                  {isPreview ? `Example ${category.name} jobs` : `Live ${category.name} jobs`}
                </h2>
              </div>
              <Link href="/jobs" className="text-sm font-semibold text-green-mid hover:text-green-deep">
                View all jobs →
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {job.category && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">
                            <span aria-hidden="true">{job.category.emoji}</span> {job.category.name}
                          </span>
                        )}
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          job.track === 'LABOUR'
                            ? 'bg-green-soft text-green-deep'
                            : 'bg-teal-50 text-teal-800'
                        }`}>
                          {job.track === 'LABOUR' ? 'Labour' : 'Technical'}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-neutral-950 transition group-hover:text-green-mid">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
                        {job.location && <span>📍 {job.location}</span>}
                        {job.employer?.company && <span>{job.employer.company}</span>}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      {job.rate && <div className="font-semibold text-green-mid">{job.rate}</div>}
                      <div className="mt-1 text-xs text-neutral-500">
                        {new Date(job.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                  {job.description && (
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-neutral-600">
                      {job.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-neutral-200 bg-white px-5 py-14 text-center sm:px-8">
            <div className="text-5xl" aria-hidden="true">{category.emoji}</div>
            <h2 className="mt-4 text-2xl font-bold text-green-deep">Belum ada kerja aktif di sini</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-neutral-600">
              Lihat talent yang tersedia atau post kerja percuma untuk mula menerima cadangan.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/talent" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-green-mid px-5 text-sm font-semibold text-white">
                Browse talent
              </Link>
              <Link href="/jobs/post" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 px-5 text-sm font-semibold text-neutral-800">
                Post a job
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="border-t border-neutral-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-green-deep">Explore other categories</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {MARKETPLACE_CATEGORIES.filter((item) => item.slug !== slug).slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={`/categories/${item.slug}`}
                className="group flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4 text-center transition hover:border-emerald-200 hover:bg-green-soft"
              >
                <span className="text-2xl transition-transform group-hover:scale-110" aria-hidden="true">{item.emoji}</span>
                <span className="text-xs font-semibold text-neutral-700 group-hover:text-green-deep">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
