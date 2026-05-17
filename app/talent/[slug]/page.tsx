import { notFound } from 'next/navigation'
import { TalentCard } from '@/components/talent/TalentCard'
import { TalentProfilePreview } from '@/components/onboarding/shared/TalentProfilePreview'

type DemoCategory = {
  emoji: string
  name: string
}

type DemoProfile = {
  name: string
  track: 'LABOUR' | 'TECHNICAL'
  location: string
  rate: string
  availability: string
  bio: string
  categories: DemoCategory[]
  verified: boolean
  myKadVerified?: boolean
  portfolio?: string[]
  certs?: string[]
  userId?: string
  reviews?: { rating: number; comment: string; from: string }[]
}

type DemoProfiles = Record<string, DemoProfile>

// Demo profiles — in real app this would come from Prisma/Supabase
const DEMO_PROFILES: DemoProfiles = {
  'ahmad-razlan': {
    name: 'Ahmad Razlan',
    track: 'LABOUR',
    location: 'Ampang, Kuala Lumpur',
    rate: 'RM 45–60 / job',
    availability: 'Weekdays + Saturday',
    bio: '5+ years doing house cleaning, gardening and simple handyman work in KL & Selangor. I bring my own equipment and always show up on time. References available.',
    categories: [
      { emoji: '🏠', name: 'Rumah & Taman' },
      { emoji: '👕', name: 'Cucian & Dobi' },
      { emoji: '🔧', name: 'Baik Pulih Kenderaan' },
    ],
    verified: true,
    myKadVerified: true,
    portfolio: [],
    certs: ['Bomba Safety Certified'],
    userId: 'user-1',
  },
  'siti-nur': {
    name: 'Siti Nur Aisyah',
    track: 'TECHNICAL',
    location: 'Petaling Jaya, Selangor',
    rate: 'RM 95–130 / hr',
    availability: 'Flexible (most days)',
    bio: 'I design and build modern web apps and marketing sites for growing Malaysian businesses. Previously at a YC startup. Strong in React, Next.js, and Framer Motion.',
    categories: [
      { emoji: '💻', name: 'Web & App Dev' },
      { emoji: '🎨', name: 'Design & Kreatif' },
    ],
    verified: true,
    portfolio: ['https://github.com/sitinur', 'https://sitinur.design'],
    certs: ['Figma Certified', 'Google Analytics', 'AWS Certified'],
    userId: 'user-2',
  },
}

export default async function TalentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = DEMO_PROFILES[slug]

  if (!profile) {
    notFound()
  }

  // Demo-only page shell: keep review data static so build-time page collection
  // does not touch the Prisma-backed reviews table.
  const reviews: { rating: number; comment?: string | null; fromUser: { name?: string | null } }[] = []
  const averageRating = null as number | null

  const isLabour = profile.track === 'LABOUR'

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-500">UpahJe.my / Talent</div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{profile.name}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${isLabour ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
            {isLabour ? 'Labour Talent' : 'Technical Talent'}
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
        <div className="bg-white border rounded-3xl p-5 sm:p-6 mb-6 sm:mb-8">
          <h3 className="font-semibold mb-4">Trust & Verification</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {profile.myKadVerified && (
              <div className="flex gap-3">
                <div className="text-2xl">🪪</div>
                <div>
                  <div className="font-medium">MyKad Verified</div>
                  <div className="text-gray-600 text-xs">Identity confirmed • PDPA compliant</div>
                </div>
              </div>
            )}
            {profile.certs && profile.certs.length > 0 && (
              <div>
                <div className="font-medium mb-1">Professional Credentials</div>
                <div className="flex flex-wrap gap-1">
                  {profile.certs.map((c, i) => (
                    <span key={i} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

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

        {/* Similar Talents - using improved TalentCard (Track A) */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-semibold">Similar talents nearby</h3>
            <button className="text-xs text-blue-600 hover:underline">See all →</button>
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
              reviewCount={18}
              averageRating={4.5}
            />
            <TalentCard
              name="Kumar a/l Raj"
              track="LABOUR"
              location="Cheras"
              rate="RM 45–60 / job"
              availability="Weekdays"
              categories={["Baik Pulih Kenderaan", "Elektrik & Plumbing"]}
              reviewCount={7}
              averageRating={4.2}
            />
            <TalentCard
              name="Siti Aminah"
              track="LABOUR"
              location="Ampang"
              rate="RM 35–50 / job"
              availability="Weekends"
              categories={["Masakan & Katering", "Jagaan & Teman"]}
              reviewCount={23}
              averageRating={4.8}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-4 bg-white border rounded-3xl p-4 sm:p-5 shadow flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Ready to work with {profile.name.split(' ')[0]}?</div>
            <div className="text-sm text-gray-600">Message to discuss your job details.</div>
          </div>
          <button className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl font-medium text-white ${isLabour ? 'bg-green-600' : 'bg-purple-600'}`}>
            Hubungi Talent
          </button>
        </div>
      </div>
    </div>
  )
}
