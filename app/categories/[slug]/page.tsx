import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { portfolioProjects } from '@/data/portfolioProjects'
import { PortfolioGrid } from '@/components/portfolio'

const CATEGORY_ALIASES: Record<string, string> = {
  'web-development': 'web-design',
  'design-creative': 'design',
  'labour-general': 'home-services',
  'admin-data': 'admin-support',
}

export async function generateStaticParams() {
  return MARKETPLACE_CATEGORIES.map((cat) => ({ slug: cat.slug }))
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

  // Map category slugs to portfolio project categories/tags to match
  const categoryFilterMap: Record<string, string[]> = {
    'photography': ['Wedding', 'Portrait', 'Pre-wedding', 'Event', 'Product', 'Creative', 'Pre-Wedding'],
    'videography': [],
    'content-creator': [],
    'photo-editor': [],
    'design': [],
    'makeup-artist': [],
    'wedding-planner': ['Wedding', 'Pre-wedding', 'Pre-Wedding'],
  }

  const matchingCategories = categoryFilterMap[slug] || []
  
  const categoryProjects = portfolioProjects.filter((p) =>
    matchingCategories.length === 0
      ? false
      : matchingCategories.some((mc) =>
          p.category.toLowerCase().includes(mc.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(mc.toLowerCase()))
        )
  )

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
                {category.talentCount} talent{category.talentCount !== 1 ? '' : ''} available
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
                {category.id === 'photography' && (
                  <Link
                    href="/jobs"
                    className="inline-flex h-10 items-center rounded-xl border border-zinc-700 bg-zinc-900 px-5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
                  >
                    Browse Jobs
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category Content ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        {categoryProjects.length > 0 ? (
          <PortfolioGrid
            projects={categoryProjects}
            title={`Projects in ${category.name}`}
            subtitle="Browse work from talented creatives"
            showFilters={true}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-5xl">{category.emoji}</div>
            <h2 className="text-xl font-bold text-white">Coming Soon</h2>
            <p className="mt-2 max-w-md text-sm text-zinc-500">
              We're onboarding {category.name.toLowerCase()} talent now. 
              Check back soon or post a job to find the right creative for your project.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/jobs/post"
                className="inline-flex h-10 items-center rounded-xl bg-amber-500 px-5 text-xs font-semibold text-black transition-colors hover:bg-amber-400"
              >
                Post a Job
              </Link>
              <Link
                href="/"
                className="inline-flex h-10 items-center rounded-xl border border-zinc-700 bg-zinc-900 px-5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Browse Other Categories
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
