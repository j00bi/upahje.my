import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { TALENT_PROFILES } from '@/data/talentProfiles'

export default function TalentIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
                Talent
              </p>
              <h1 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
                Compare verified local workers.
              </h1>
              <p className="mt-4 text-base" style={{ color: 'var(--color-body)' }}>
                Browse early UpahJe profiles across creative, technical, and home service work.
              </p>
            </div>
            <Link
              href="/jobs/post"
              className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Post a Job
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TALENT_PROFILES.map((talent) => (
              <Link
                key={talent.slug}
                href={`/talent/${talent.slug}`}
                className="block rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="h-14 w-14 flex-shrink-0 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/112?img=${talent.avatarImg})` }}
                  />
                  <div className="min-w-0">
                    <h2 className="font-semibold text-neutral-950">{talent.name}</h2>
                    <p className="text-sm text-neutral-500">{talent.role}</p>
                    <p className="mt-1 text-xs text-neutral-500">{talent.location}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {talent.categories.slice(0, 3).map((category) => (
                    <span
                      key={category.name}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-sm">
                  <span className="font-semibold text-emerald-700">
                    ★ {talent.rating} ({talent.reviewCount})
                  </span>
                  <span className="font-semibold text-neutral-950">{talent.rate}</span>
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
