import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { MARKETPLACE_CATEGORIES } from '@/lib/categories'

export default function CategoriesIndexPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
              Categories
            </p>
            <h1 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
              Browse the work Malaysians are hiring for.
            </h1>
            <p className="mt-4 text-base" style={{ color: 'var(--color-body)' }}>
              Start with a service area, then compare portfolios, rates, and availability before posting a job.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETPLACE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group block rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                    {category.emoji}
                  </div>
                  <div>
                    <h2 className="font-semibold text-neutral-950 group-hover:text-emerald-800">
                      {category.name}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">{category.nameMs}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-neutral-600">{category.description}</p>
                <div className="mt-5 text-sm font-semibold text-emerald-700">
                  {category.talentCount > 0 ? `${category.talentCount} talent available` : 'Onboarding now'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
