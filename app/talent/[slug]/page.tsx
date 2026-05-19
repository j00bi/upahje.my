import { notFound } from 'next/navigation'
import { TalentCard } from '@/components/talent/TalentCard'
import { TalentProfilePreview } from '@/components/onboarding/shared/TalentProfilePreview'
import { PortfolioGrid } from '@/components/portfolio'
import { portfolioProjects } from '@/data/portfolioProjects'

type DemoCategory = {
  emoji: string
  name: string
}

type DemoProfile = {
  name: string
  track: 'LABOUR' | 'TECHNICAL' | 'PHOTOGRAPHY'
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
  'aina-photography': {
    name: 'Aina',
    track: 'PHOTOGRAPHY',
    location: 'Kuala Lumpur',
    rate: 'RM 250–500 / hr',
    availability: 'Flexible',
    bio: 'Wedding and portrait specialist based in KL. I capture authentic moments and create timeless portraits. 5+ years experience in wedding photography.',
    categories: [
      { emoji: '📸', name: 'Wedding Photography' },
      { emoji: '📷', name: 'Portrait Photography' },
    ],
    verified: true,
    myKadVerified: true,
    portfolio: [
      'https://picsum.photos/seed/aina1/400/300',
      'https://picsum.photos/seed/aina2/400/300',
      'https://picsum.photos/seed/aina3/400/300',
      'https://picsum.photos/seed/aina4/400/300',
      'https://picsum.photos/seed/aina5/400/300',
    ],
    userId: 'user-3',
  },
  'danial-studio': {
    name: 'Danial',
    track: 'PHOTOGRAPHY',
    location: 'Penang',
    rate: 'RM 180–350 / hr',
    availability: 'Weekdays + Weekends',
    bio: 'Event and product photographer based in Penang. Specializing in corporate events and product photography for e-commerce.',
    categories: [
      { emoji: '📸', name: 'Event Photography' },
      { emoji: '📷', name: 'Product Photography' },
    ],
    verified: true,
    portfolio: [
      'https://picsum.photos/seed/danial1/400/300',
      'https://picsum.photos/seed/danial2/400/300',
      'https://picsum.photos/seed/danial3/400/300',
      'https://picsum.photos/seed/danial4/400/300',
    ],
    userId: 'user-4',
  },
  'sharifah-lens': {
    name: 'Sharifah',
    track: 'PHOTOGRAPHY',
    location: 'Shah Alam',
    rate: 'RM 300–600 / hr',
    availability: 'Flexible',
    bio: 'Pre-wedding and creative photographer in Shah Alam. Known for artistic compositions and natural lighting techniques.',
    categories: [
      { emoji: '📸', name: 'Pre-Wedding' },
      { emoji: '📷', name: 'Creative Photography' },
    ],
    verified: true,
    myKadVerified: true,
    portfolio: [
      'https://picsum.photos/seed/sharifah1/400/300',
      'https://picsum.photos/seed/sharifah2/400/300',
      'https://picsum.photos/seed/sharifah3/400/300',
      'https://picsum.photos/seed/sharifah4/400/300',
      'https://picsum.photos/seed/sharifah5/400/300',
    ],
    userId: 'user-5',
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
  const isPhotography = profile.track === 'PHOTOGRAPHY'

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-zinc-500">UpahJe.my / Talent</div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">{profile.name}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${isLabour ? 'bg-green-900/50 text-green-400' : isPhotography ? 'bg-amber-900/50 text-amber-400' : 'bg-purple-900/50 text-purple-400'}`}>
            {isLabour ? 'Labour Talent' : isPhotography ? 'Photography Talent' : 'Technical Talent'}
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
        {isPhotography && (
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
        <div className="sticky bottom-4 bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-white">Ready to work with {profile.name.split(' ')[0]}?</div>
            <div className="text-sm text-zinc-500">Message to discuss your job details.</div>
          </div>
          <button className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl font-medium text-white transition-all hover:opacity-90 ${isLabour ? 'bg-green-600' : isPhotography ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-purple-600'}`}>
            Hubungi Talent
          </button>
        </div>
      </div>
    </div>
  )
}
