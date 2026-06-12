import { notFound, redirect } from 'next/navigation'
import { TalentCard } from '@/components/talent/TalentCard'
import { TalentProfilePreview } from '@/components/onboarding/shared/TalentProfilePreview'
import { PortfolioGrid } from '@/components/portfolio'
import { portfolioProjects } from '@/data/portfolioProjects'
import { TALENT_PROFILE_BY_SLUG } from '@/data/talentProfiles'

const TALENT_ALIASES: Record<string, string> = {
  'aina-razali': 'aina-photography',
  'danial-harith': 'danial-studio',
  'sharifah-nur': 'sharifah-lens',
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

  // Demo-only page shell: keep review data static so build-time page collection
  // does not touch the Prisma-backed reviews table.
  const reviews: { rating: number; comment?: string | null; fromUser: { name?: string | null } }[] = []
  const averageRating = null as number | null

  const isLabour = profile.track === 'LABOUR'
  const isCreative = profile.categories.some((c) => c.name.toLowerCase().includes('photo') || c.name.toLowerCase().includes('video'))

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-zinc-500">UpahJe.my / Talent</div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">{profile.name}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${isLabour ? 'bg-green-900/50 text-green-400' : isCreative ? 'bg-amber-900/50 text-amber-400' : 'bg-purple-900/50 text-purple-400'}`}>
            {isLabour ? 'Labour Talent' : isCreative ? 'Creative Talent' : 'Technical Talent'}
          </div>
        </div>

        {/* Main Profile Card using shared component */}
        <div className="mb-6 sm:mb-8">
          <TalentProfilePreview
            name={profile.name}
            location={profile.location}
            track={profile.track}
            rate={profile.rate}
            availability={profile.availability}
            bio={profile.bio}
            categories={profile.categories}
            portfolio={profile.portfolio}
            certs={profile.certs}
            variant="full"
          />
        </div>

        {/* Trust & Verification */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 sm:p-6 mb-6 sm:mb-8">
          <h3 className="font-semibold mb-4 text-white">Trust & Verification</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {profile.myKadVerified && (
              <div className="flex gap-3">
                <div className="text-2xl">🪪</div>
                <div>
                  <div className="font-medium text-white">MyKad Verified</div>
                  <div className="text-zinc-500 text-xs">Identity confirmed • PDPA compliant</div>
                </div>
              </div>
            )}
            {profile.certs && profile.certs.length > 0 && (
              <div>
                <div className="font-medium mb-1 text-white">Professional Credentials</div>
                <div className="flex flex-wrap gap-1">
                  {profile.certs.map((c, i) => (
                    <span key={i} className="text-xs bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio — Behance-style Project Grid */}
        {isCreative && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 sm:p-6 mb-6 sm:mb-8">
            <PortfolioGrid
              projects={portfolioProjects.filter((p) => p.talentSlug === slug)}
              title="Portfolio"
              subtitle="Browse their work, see their style"
              showFilters={true}
            />
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="bg-white border rounded-3xl p-5 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Reviews from clients</h3>
              {averageRating !== null && (
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {'★'.repeat(Math.round(averageRating))}
                    {'☆'.repeat(5 - Math.round(averageRating))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-5">
              {reviews.map((r, i) => (
                <div key={i} className="border-l-2 pl-4 border-gray-200">
                  <div className="flex text-amber-500 mb-1">
                    {'★'.repeat(r.rating)}
                  </div>
                  {r.comment && (
                    <div className="text-gray-700">{r.comment}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    — {r.fromUser?.name || 'Anonymous'}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-4">All reviews are from verified completed jobs on UpahJe.</div>
          </div>
        )}

        {/* Similar Talents */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-semibold text-white">Similar talents nearby</h3>
            <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors">See all →</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TalentCard
              name="Rina binti Hassan"
              track="LABOUR"
              location="Subang Jaya"
              rate="RM 40–55 / job"
              availability="Flexible"
              categories={["Rumah & Taman", "Cucian & Dobi"]}
              verified
              reviewCount={0}
              averageRating={0}
            />
            <TalentCard
              name="Kumar a/l Raj"
              track="LABOUR"
              location="Cheras"
              rate="RM 45–60 / job"
              availability="Weekdays"
              categories={["Baik Pulih Kenderaan", "Elektrik & Plumbing"]}
              verified
              reviewCount={0}
              averageRating={0}
            />
            <TalentCard
              name="Siti Aminah"
              track="LABOUR"
              location="Ampang"
              rate="RM 35–50 / job"
              availability="Weekends"
              categories={["Masakan & Katering", "Jagaan & Teman"]}
              verified
              reviewCount={0}
              averageRating={0}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-4 bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-white">Ready to work with {profile.name.split(' ')[0]}?</div>
            <div className="text-sm text-zinc-500">Message to discuss your job details.</div>
          </div>
          <button className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl font-medium text-white transition-all hover:opacity-90 ${isLabour ? 'bg-green-600' : isCreative ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-purple-600'}`}>
            Hubungi Talent
          </button>
        </div>
      </div>
    </div>
  )
}
