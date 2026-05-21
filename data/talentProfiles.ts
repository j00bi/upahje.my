import type { Track } from '@/lib/domain'

export type TalentCategory = {
  emoji: string
  name: string
}

export type TalentProfile = {
  slug: string
  name: string
  role: string
  track: Track
  location: string
  rate: string
  availability: string
  bio: string
  categories: TalentCategory[]
  verified: boolean
  myKadVerified?: boolean
  portfolio?: string[]
  certs?: string[]
  userId?: string
  rating: number
  reviewCount: number
  avatarImg: number
}

export const TALENT_PROFILES: TalentProfile[] = [
  {
    slug: 'aina-photography',
    name: 'Aina Razali',
    role: 'Photographer',
    track: 'PHOTOGRAPHY',
    location: 'Kuala Lumpur',
    rate: 'RM 800/day',
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
    rating: 4.9,
    reviewCount: 24,
    avatarImg: 1,
  },
  {
    slug: 'danial-studio',
    name: 'Danial Harith',
    role: 'Videographer',
    track: 'PHOTOGRAPHY',
    location: 'Petaling Jaya',
    rate: 'RM 1,200/day',
    availability: 'Weekdays + weekends',
    bio: 'Event and product shooter covering launches, corporate video, reels, and same-week highlight edits for Malaysian businesses.',
    categories: [
      { emoji: '🎥', name: 'Videography' },
      { emoji: '📸', name: 'Event Photography' },
    ],
    verified: true,
    portfolio: [
      'https://picsum.photos/seed/danial1/400/300',
      'https://picsum.photos/seed/danial2/400/300',
      'https://picsum.photos/seed/danial3/400/300',
      'https://picsum.photos/seed/danial4/400/300',
    ],
    userId: 'user-4',
    rating: 4.8,
    reviewCount: 18,
    avatarImg: 4,
  },
  {
    slug: 'sharifah-lens',
    name: 'Sharifah Nur',
    role: 'Content Creator',
    track: 'PHOTOGRAPHY',
    location: 'Shah Alam',
    rate: 'RM 600/day',
    availability: 'Flexible',
    bio: 'Pre-wedding, creative portrait, and campaign creator known for natural light, art direction, and social-ready galleries.',
    categories: [
      { emoji: '📱', name: 'Content Creator' },
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
    rating: 4.9,
    reviewCount: 31,
    avatarImg: 25,
  },
  {
    slug: 'amir-hakim',
    name: 'Amir Hakim',
    role: 'Web Developer',
    track: 'TECHNICAL',
    location: 'Cyberjaya',
    rate: 'RM 1,500/day',
    availability: 'Project-based',
    bio: 'Next.js and ecommerce developer for landing pages, booking flows, dashboards, and payment-enabled Malaysian SME websites.',
    categories: [
      { emoji: '💻', name: 'Web & App Dev' },
      { emoji: '🎨', name: 'Design & Kreatif' },
    ],
    verified: true,
    portfolio: ['https://github.com/amirhakim', 'https://amirhakim.dev'],
    certs: ['AWS Certified', 'Google Analytics'],
    userId: 'user-6',
    rating: 4.7,
    reviewCount: 42,
    avatarImg: 33,
  },
  {
    slug: 'ahmad-razlan',
    name: 'Ahmad Razlan',
    role: 'Home Services',
    track: 'LABOUR',
    location: 'Ampang, Kuala Lumpur',
    rate: 'RM 45-60/job',
    availability: 'Weekdays + Saturday',
    bio: '5+ years doing house cleaning, gardening and simple handyman work in KL & Selangor. I bring my own equipment and always show up on time. References available.',
    categories: [
      { emoji: '🏠', name: 'Rumah & Taman' },
      { emoji: '👕', name: 'Cucian & Dobi' },
      { emoji: '🔧', name: 'Baik Pulih Kenderaan' },
    ],
    verified: true,
    myKadVerified: true,
    certs: ['Bomba Safety Certified'],
    userId: 'user-1',
    rating: 4.8,
    reviewCount: 16,
    avatarImg: 16,
  },
  {
    slug: 'siti-nur',
    name: 'Siti Nur Aisyah',
    role: 'Technical Talent',
    track: 'TECHNICAL',
    location: 'Petaling Jaya, Selangor',
    rate: 'RM 95-130/hr',
    availability: 'Flexible',
    bio: 'I design and build modern web apps and marketing sites for growing Malaysian businesses. Previously at a YC startup. Strong in React, Next.js, and Framer Motion.',
    categories: [
      { emoji: '💻', name: 'Web & App Dev' },
      { emoji: '🎨', name: 'Design & Kreatif' },
    ],
    verified: true,
    portfolio: ['https://github.com/sitinur', 'https://sitinur.design'],
    certs: ['Figma Certified', 'Google Analytics', 'AWS Certified'],
    userId: 'user-2',
    rating: 4.9,
    reviewCount: 29,
    avatarImg: 18,
  },
  {
    slug: 'rina-binti-hassan',
    name: 'Rina binti Hassan',
    role: 'Home Services',
    track: 'LABOUR',
    location: 'Subang Jaya',
    rate: 'RM 40-55/job',
    availability: 'Flexible',
    bio: 'Reliable home cleaning, laundry, and garden helper serving Subang Jaya and nearby areas.',
    categories: [
      { emoji: '🏠', name: 'Rumah & Taman' },
      { emoji: '👕', name: 'Cucian & Dobi' },
    ],
    verified: true,
    myKadVerified: true,
    userId: 'user-7',
    rating: 4.5,
    reviewCount: 18,
    avatarImg: 21,
  },
  {
    slug: 'kumar-a-l-raj',
    name: 'Kumar a/l Raj',
    role: 'Skilled Trade',
    track: 'LABOUR',
    location: 'Cheras',
    rate: 'RM 45-60/job',
    availability: 'Weekdays',
    bio: 'Vehicle repair, electrical checks, and small plumbing jobs for homes and shoplots around Cheras.',
    categories: [
      { emoji: '🔧', name: 'Baik Pulih Kenderaan' },
      { emoji: '⚡', name: 'Elektrik & Plumbing' },
    ],
    verified: true,
    userId: 'user-8',
    rating: 4.2,
    reviewCount: 7,
    avatarImg: 22,
  },
  {
    slug: 'siti-aminah',
    name: 'Siti Aminah',
    role: 'Care & Catering',
    track: 'LABOUR',
    location: 'Ampang',
    rate: 'RM 35-50/job',
    availability: 'Weekends',
    bio: 'Weekend catering, home cooking help, and care companion tasks for families in Ampang.',
    categories: [
      { emoji: '🍳', name: 'Masakan & Katering' },
      { emoji: '👶', name: 'Jagaan & Teman' },
    ],
    verified: true,
    userId: 'user-9',
    rating: 4.8,
    reviewCount: 23,
    avatarImg: 23,
  },
]

export const FEATURED_TALENTS = TALENT_PROFILES.slice(0, 4)

export const TALENT_PROFILE_BY_SLUG = TALENT_PROFILES.reduce<Record<string, TalentProfile>>(
  (profiles, profile) => {
    profiles[profile.slug] = profile
    return profiles
  },
  {},
)
