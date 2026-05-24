import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { getActiveCategories, getCategoriesByCluster, MARKETPLACE_CATEGORIES } from '@/lib/categories'
import type { CategoryCluster } from '@/lib/categories'

function ClusterSection({ cluster, label }: { cluster: CategoryCluster; label: string }) {
  const cats = getCategoriesByCluster(cluster)
  const active = cats.filter((c) => c.talentCount > 0)
  const comingSoon = cats.filter((c) => c.talentCount === 0)

  if (active.length === 0) return null

  return (
    <section>
      <h2 className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--color-teal-mid)' }}>
        {label}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {active.map((category) => {
          const clusterCats = cats.filter((c) => c.id !== category.id && c.talentCount > 0)
          const otherCats = cats.filter((c) => c.id !== category.id)

          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group block rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg"
            >
              <div className="text-3xl mb-3">{category.emoji}</div>
              <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-ink-deep)' }}>
                {category.problemPhrase}
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--color-body)' }}>
                {category.name} · {category.nameMs}
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-mute)' }}>
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="badge badge-positive text-xs">
                  {category.talentCount} sedia
                </span>
                {otherCats.length > 0 && (
                  <span className="text-xs" style={{ color: 'var(--color-body)' }}>
                    +{otherCats.length} lagi servis
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function ComingSoonSection() {
  const inactive = MARKETPLACE_CATEGORIES.filter((c) => c.talentCount === 0)
  if (inactive.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--color-mute)' }}>
        Sedang dalam perjalanan
      </h2>
      <div className="flex flex-wrap gap-3">
        {inactive.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-300 px-4 py-2 text-sm transition-all hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
            style={{ color: 'var(--color-body)' }}
          >
            <span>{category.emoji}</span>
            <span>{category.problemPhrase}</span>
            <span className="text-xs ml-1" style={{ color: 'var(--color-mute)' }}>Coming soon</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function CategoriesIndexPage() {
  const active = getActiveCategories()
  const clusters = [...new Set(active.map((c) => c.cluster))] as CategoryCluster[]

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
              Ada Apa Hari Ni?
            </p>
            <h1 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
              Apa masalah nak settle?
            </h1>
            <p className="mt-4 text-base" style={{ color: 'var(--color-body)' }}>
              Pilih apa yang anda perlukan — kami akan cari orang yang tepat.
            </p>
          </div>

          <div className="mt-10 space-y-14">
            {clusters.map((cluster) => {
              const label = active.find((c) => c.cluster === cluster)?.clusterLabel || cluster
              return <ClusterSection key={cluster} cluster={cluster} label={label!} />
            })}
          </div>

          <ComingSoonSection />
        </div>
      </section>

      <Footer />
    </div>
  )
}
