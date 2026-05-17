import { notFound } from 'next/navigation'
import { TalentProfilePreview } from '@/components/onboarding/shared/TalentProfilePreview'

type DemoCategory = {
  emoji: string
  name: string
}

type DemoReview = {
  rating: number
  comment: string
  from: string
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
  reviews?: DemoReview[]
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
    reviews: [
      { rating: 5, comment: 'Very reliable and thorough. Will hire again.', from: 'Mrs. Tan, Bangsar' },
      { rating: 4, comment: 'Good work, came exactly on time.', from: 'Encik Rahman' },
    ],
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
    reviews: [
      { rating: 5, comment: 'Delivered our new marketing site in 3 weeks. Beautiful work.', from: 'Founder, KopiCo' },
    ],
  },
}

export default function TalentProfilePage({ params }: { params: { slug: string } }) {
  const profile = DEMO_PROFILES[params.slug]

  if (!profile) {
    notFound()
  }

  const isLabour = profile.track === 'LABOUR'

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-500">UpahJe.my / Talent</div>
            <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${isLabour ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
            {isLabour ? 'Labour Talent' : 'Technical Talent'}
          </div>
        </div>

        {/* Main Profile Card using shared component */}
        <div className="mb-8">
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
        <div className="bg-white border rounded-3xl p-6 mb-8">
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
            {profile.certs?.length > 0 && (
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
        {profile.reviews?.length > 0 && (
          <div className="bg-white border rounded-3xl p-6 mb-8">
            <h3 className="font-semibold mb-4">Reviews from clients</h3>
            <div className="space-y-5">
              {profile.reviews.map((r, i) => (
                <div key={i} className="border-l-2 pl-4 border-gray-200">
                  <div className="flex text-amber-500 mb-1">
                    {'★'.repeat(r.rating)}
                  </div>
                  <div className="text-gray-700">{r.comment}</div>
                  <div className="text-xs text-gray-500 mt-1">— {r.from}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-4">All reviews are from verified completed jobs on UpahJe.</div>
          </div>
        )}

        {/* CTA */}
        <div className="sticky bottom-4 bg-white border rounded-3xl p-5 shadow flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Ready to work with {profile.name.split(' ')[0]}?</div>
            <div className="text-sm text-gray-600">Message to discuss your job details.</div>
          </div>
          <button className={`px-8 py-3 rounded-2xl font-medium text-white ${isLabour ? 'bg-green-600' : 'bg-purple-600'}`}>
            Hubungi Talent
          </button>
        </div>
      </div>
    </div>
  )
}
