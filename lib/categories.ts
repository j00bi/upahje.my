export interface Category {
  id: string
  slug: string
  name: string
  nameMs: string
  emoji: string
  description: string
  talentCount: number
}

export const MARKETPLACE_CATEGORIES: Category[] = [
  {
    id: 'photography',
    slug: 'photography',
    name: 'Photography',
    nameMs: 'Fotografi',
    emoji: '📸',
    description: 'Wedding, event, portrait, product — browse portfolios and book Malaysia\'s best photographers',
    talentCount: 3,
  },
  {
    id: 'videography',
    slug: 'videography',
    name: 'Videography',
    nameMs: 'Videografi',
    emoji: '🎥',
    description: 'Cinematography, event coverage, reels, drone, video editing',
    talentCount: 0,
  },
  {
    id: 'content',
    slug: 'content-creator',
    name: 'Content Creator',
    nameMs: 'Kreator Kandungan',
    emoji: '📱',
    description: 'Social media content, TikTok/IG campaigns, UGC, brand collaborations',
    talentCount: 0,
  },
  {
    id: 'photo-editor',
    slug: 'photo-editor',
    name: 'Photo Editor',
    nameMs: 'Editor Foto',
    emoji: '✨',
    description: 'Retouching, colour grading, background removal, before/after transformations',
    talentCount: 0,
  },
  {
    id: 'design',
    slug: 'design',
    name: 'Graphic Design',
    nameMs: 'Reka Grafik',
    emoji: '🎨',
    description: 'Branding, logos, social media graphics, print design, illustration',
    talentCount: 0,
  },
  {
    id: 'home-services',
    slug: 'home-services',
    name: 'Home Services',
    nameMs: 'Servis Rumah',
    emoji: '🏠',
    description: 'Cleaning, gardening, moving, repair help, and household tasks around KL and Selangor',
    talentCount: 1,
  },
  {
    id: 'electrical-trade',
    slug: 'electrical-trade',
    name: 'Electrical & Trade',
    nameMs: 'Elektrik & Kemahiran',
    emoji: '⚡',
    description: 'Electricians, plumbing, appliance repair, handyman work, and skilled trade jobs',
    talentCount: 0,
  },
  {
    id: 'admin-support',
    slug: 'admin-support',
    name: 'Admin Support',
    nameMs: 'Sokongan Admin',
    emoji: '🗂️',
    description: 'Data entry, virtual assistance, operations support, document cleanup, and office tasks',
    talentCount: 0,
  },
  {
    id: 'web-design',
    slug: 'web-design',
    name: 'Web & Design',
    nameMs: 'Web & Reka Bentuk',
    emoji: '💻',
    description: 'Websites, landing pages, ecommerce setup, UI design, and technical creative work',
    talentCount: 2,
  },
  {
    id: 'makeup',
    slug: 'makeup-artist',
    name: 'Makeup Artist',
    nameMs: 'Jurisolek',
    emoji: '💄',
    description: 'Bridal, editorial, event makeup — portfolios and booking',
    talentCount: 0,
  },
  {
    id: 'wedding',
    slug: 'wedding-planner',
    name: 'Wedding Planner',
    nameMs: 'Perancang Perkahwinan',
    emoji: '💍',
    description: 'Full coordination, styling, day-of management, vendor connections',
    talentCount: 0,
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return MARKETPLACE_CATEGORIES.find((c) => c.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return MARKETPLACE_CATEGORIES.find((c) => c.id === id)
}
