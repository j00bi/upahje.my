import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { TALENT_PROFILES } from '@/data/talentProfiles'
import { ExpandableTalentCard } from '@/components/talent/ExpandableTalentCard'

export default function TalentIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="section-label mb-3" style={{ color: 'var(--color-teal-mid)' }}>
                Talent
              </p>
              <h1 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
                Compare verified local workers.
              </h1>
              <p className="mt-4 text-base" style={{ color: 'var(--color-body)' }}>
                Browse early UpahJe profiles across creative, technical, and home service work.
                <span className="block text-sm mt-1" style={{ color: 'var(--color-mute)' }}>
                  Click a profile to preview, then &ldquo;View Full Profile&rdquo; for details.
                </span>
              </p>
            </div>
            <Link
              href="/jobs/post"
              className="inline-flex w-fit items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-800"
            >
              Post a Job
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TALENT_PROFILES.map(talent => (
              <ExpandableTalentCard key={talent.slug} talent={talent} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}