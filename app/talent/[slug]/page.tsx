import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { PortfolioGrid } from '@/components/portfolio'
import { portfolioProjects } from '@/data/portfolioProjects'
import { TALENT_PROFILE_BY_SLUG, TALENT_PROFILES } from '@/data/talentProfiles'

const TALENT_ALIASES: Record<string, string> = {
  'aina-razali': 'aina-photography',
  'danial-harith': 'danial-studio',
  'sharifah-nur': 'sharifah-lens',
}

const trackLabel = {
  LABOUR: 'Home & local services',
  TECHNICAL: 'Technical talent',
  PHOTOGRAPHY: 'Photography talent',
} as const

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default async function TalentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = TALENT_PROFILE_BY_SLUG[slug]

  if (!profile) {
    const alias = TALENT_ALIASES[slug]
    if (alias) {
      redirect(`/talent/${alias}`)
    }
    notFound()
  }

  const projects = portfolioProjects.filter((project) => project.talentSlug === profile.slug)
  const similarTalents = TALENT_PROFILES
    .filter((talent) => talent.slug !== profile.slug && talent.track === profile.track)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="border-b border-neutral-200 bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="rounded hover:text-green-mid">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/talent" className="rounded hover:text-green-mid">Talent</Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-800" aria-current="page">{profile.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-green-soft text-2xl font-bold text-green-deep"
                aria-hidden="true"
              >
                {initials(profile.name)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-green-soft px-3 py-1 text-xs font-semibold text-green-deep">
                    {trackLabel[profile.track]}
                  </span>
                  {profile.verified && (
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                      ✓ Verified profile
                    </span>
                  )}
                </div>
                <h1 className="mt-3 font-display-xl text-green-deep">{profile.name}</h1>
                <p className="mt-1 text-lg font-medium text-neutral-700">{profile.role}</p>
                <p className="mt-2 text-sm text-neutral-600">📍 {profile.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/jobs/post"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-green-mid px-6 text-sm font-semibold text-white transition hover:bg-green-deep"
              >
                Post a job for this talent
              </Link>
              <Link
                href="/talent"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-800 transition hover:border-green-mid hover:text-green-mid"
              >
                Compare more talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.35fr_0.65fr] lg:py-14">
        <div className="space-y-6">
          <section className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-green-deep">About {profile.name.split(' ')[0]}</h2>
            <p className="mt-3 leading-7 text-neutral-700">{profile.bio}</p>

            <div className="mt-6 grid gap-4 border-t border-neutral-100 pt-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-green-soft p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-green-mid">Rate</div>
                <div className="mt-1 text-lg font-bold text-green-deep">{profile.rate}</div>
              </div>
              <div className="rounded-2xl bg-teal-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Availability</div>
                <div className="mt-1 text-lg font-bold text-teal-900">{profile.availability}</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-neutral-800">Services</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.categories.map((category) => (
                  <span key={category.name} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700">
                    <span aria-hidden="true">{category.emoji}</span> {category.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {profile.track === 'PHOTOGRAPHY' && (
            <section className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7">
              <PortfolioGrid
                projects={projects}
                title="Portfolio"
                subtitle={
                  projects.length > 0
                    ? 'Browse recent work and visual style.'
                    : 'No projects have been uploaded yet. Verification and service details are shown above.'
                }
                showFilters
              />
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-green-deep">Trust & verification</h2>
            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">✓</span>
                <div>
                  <div className="font-semibold text-neutral-900">Profile verified</div>
                  <p className="mt-0.5 text-sm leading-5 text-neutral-600">Identity and profile details have been reviewed.</p>
                </div>
              </div>
              {profile.myKadVerified && (
                <div className="flex gap-3">
                  <span className="text-2xl" aria-hidden="true">🪪</span>
                  <div>
                    <div className="font-semibold text-neutral-900">MyKad verified</div>
                    <p className="mt-0.5 text-sm leading-5 text-neutral-600">Identity confirmed. Document details remain private.</p>
                  </div>
                </div>
              )}
              {profile.certs && profile.certs.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">Credentials</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.certs.map((credential) => (
                      <span key={credential} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900">
                        {credential}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-green-mid/20 bg-green-soft p-5 sm:p-6">
            <h2 className="text-lg font-bold text-green-deep">Safer hiring starts with a clear brief</h2>
            <p className="mt-2 text-sm leading-6 text-green-deep/80">
              State your scope, location, deadline and budget so the right talent can respond.
            </p>
            <Link href="/jobs/post" className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-green-mid px-5 text-sm font-semibold text-white">
              Post a job
            </Link>
          </section>
        </aside>
      </div>

      {similarTalents.length > 0 && (
        <section className="border-t border-neutral-200 bg-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="section-label text-green-mid">More options</p>
                <h2 className="mt-2 text-2xl font-bold text-green-deep">Similar talent</h2>
              </div>
              <Link href="/talent" className="text-sm font-semibold text-green-mid hover:text-green-deep">
                See all →
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similarTalents.map((talent) => (
                <Link
                  key={talent.slug}
                  href={`/talent/${talent.slug}`}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-soft font-bold text-green-deep" aria-hidden="true">
                      {initials(talent.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-neutral-950">{talent.name}</h3>
                      <p className="text-sm text-neutral-600">{talent.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 text-sm">
                    <span className="text-neutral-600">📍 {talent.location}</span>
                    <span className="font-semibold text-green-mid">{talent.rate}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
