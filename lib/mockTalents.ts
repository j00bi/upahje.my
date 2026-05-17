import type { Track } from "@/lib/domain"

export interface Talent {
  id: string
  name: string
  track: Track
  location: string
  rate: string
  availability: string
  categories: string[]
  verified: boolean
  rating: number
  reviewCount: number
  bio?: string
  skills?: string[]
}

export const mockTalents: Talent[] = [
  // Labour Talents
  {
    id: 't1',
    name: 'Ahmad bin Hassan',
    track: 'LABOUR',
    location: 'Taman Melawati, Kuala Lumpur',
    rate: 'RM 25/hour',
    availability: 'Flexible',
    categories: ['Garden & Landscaping', 'General Labour'],
    verified: true,
    rating: 4.8,
    reviewCount: 45,
    bio: 'Experienced gardener with 5 years of experience in residential garden maintenance.',
    skills: ['Grass cutting', 'Weeding', 'Pruning', 'Landscaping']
  },
  {
    id: 't2',
    name: 'Siti Aminah',
    track: 'LABOUR',
    location: 'Ampang, Selangor',
    rate: 'RM 30/hour',
    availability: 'Weekends only',
    categories: ['Cleaning Services', 'Housekeeping'],
    verified: true,
    rating: 4.9,
    reviewCount: 78,
    bio: 'Professional cleaner with attention to detail. Specializes in deep cleaning.',
    skills: ['Deep cleaning', 'Kitchen cleaning', 'Bathroom sanitization', 'Organizing']
  },
  {
    id: 't3',
    name: 'Rahim bin Karim',
    track: 'LABOUR',
    location: 'Petaling Jaya, Selangor',
    rate: 'RM 35/hour',
    availability: 'Flexible',
    categories: ['Moving & Transportation', 'General Labour'],
    verified: true,
    rating: 4.6,
    reviewCount: 32,
    bio: 'Strong and reliable mover. Has own vehicle for transportation.',
    skills: ['Furniture moving', 'Heavy lifting', 'Packing', 'Driving']
  },
  {
    id: 't4',
    name: 'John Tan',
    track: 'LABOUR',
    location: 'KL Sentral, Kuala Lumpur',
    rate: 'RM 40/hour',
    availability: 'Flexible',
    categories: ['Electrical', 'Plumbing'],
    verified: true,
    rating: 4.7,
    reviewCount: 56,
    bio: 'Licensed electrician and plumber with 10 years of experience.',
    skills: ['Electrical repair', 'Plumbing', 'Circuit breaker fixing', 'Pipe repair']
  },
  {
    id: 't5',
    name: 'Fatimah binti Ali',
    track: 'LABOUR',
    location: 'Shah Alam, Selangor',
    rate: 'RM 28/hour',
    availability: 'Weekdays',
    categories: ['Childcare', 'Housekeeping'],
    verified: true,
    rating: 4.9,
    reviewCount: 89,
    bio: 'Experienced babysitter with first aid certification.',
    skills: ['Childcare', 'First aid', 'Cooking', 'Educational activities']
  },
  {
    id: 't6',
    name: 'Kumar a/l Rajan',
    track: 'LABOUR',
    location: 'Bangi, Selangor',
    rate: 'RM 32/hour',
    availability: 'Flexible',
    categories: ['Automotive', 'General Labour'],
    verified: false,
    rating: 4.4,
    reviewCount: 23,
    bio: 'Car wash and detailing specialist with mobile service.',
    skills: ['Car washing', 'Interior detailing', 'Polishing', 'Paint correction']
  },

  // Technical Talents
  {
    id: 't7',
    name: 'Nurul Izzah',
    track: 'TECHNICAL',
    location: 'Bangsar, Kuala Lumpur',
    rate: 'RM 85/hour',
    availability: 'Flexible',
    categories: ['Web Development', 'Mobile Development'],
    verified: true,
    rating: 4.9,
    reviewCount: 34,
    bio: 'Full-stack developer specializing in React and Next.js.',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL']
  },
  {
    id: 't8',
    name: 'James Wong',
    track: 'TECHNICAL',
    location: 'Cyberjaya, Selangor',
    rate: 'RM 120/hour',
    availability: 'Weekdays',
    categories: ['Graphic Design', 'Video & Motion'],
    verified: true,
    rating: 4.8,
    reviewCount: 41,
    bio: 'Creative designer with 8 years of experience in branding and digital design.',
    skills: ['Adobe Creative Suite', 'Figma', 'Logo design', 'Motion graphics']
  },
  {
    id: 't9',
    name: 'Aina Sofiya',
    track: 'TECHNICAL',
    location: 'KLCC, Kuala Lumpur',
    rate: 'RM 75/hour',
    availability: 'Flexible',
    categories: ['Digital Marketing', 'Content Writing'],
    verified: true,
    rating: 4.7,
    reviewCount: 28,
    bio: 'Digital marketing specialist with focus on social media and content strategy.',
    skills: ['Social media management', 'SEO', 'Content creation', 'Analytics']
  },
  {
    id: 't10',
    name: 'Dr. Lim Chen Wei',
    track: 'TECHNICAL',
    location: 'Mont Kiara, Kuala Lumpur',
    rate: 'RM 150/hour',
    availability: 'Project-based',
    categories: ['Data & AI', 'Business & Finance'],
    verified: true,
    rating: 4.9,
    reviewCount: 15,
    bio: 'Data scientist and AI specialist with PhD in Machine Learning.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'AI Consulting']
  },
  {
    id: 't11',
    name: 'Siti Rahimah',
    track: 'TECHNICAL',
    location: 'Petaling Jaya, Selangor',
    rate: 'RM 65/hour',
    availability: 'Flexible',
    categories: ['Writing & Content', 'Social Media'],
    verified: false,
    rating: 4.5,
    reviewCount: 19,
    bio: 'Content writer specializing in tech and finance topics.',
    skills: ['Technical writing', 'Blog writing', 'Copywriting', 'Editing']
  },
  {
    id: 't12',
    name: 'Arjun Kumar',
    track: 'TECHNICAL',
    location: 'Bangi, Selangor',
    rate: 'RM 95/hour',
    availability: 'Weekends',
    categories: ['IT Support', 'Web Development'],
    verified: true,
    rating: 4.6,
    reviewCount: 27,
    bio: 'IT support specialist and web developer with 5 years experience.',
    skills: ['IT troubleshooting', 'WordPress', 'Basic networking', 'Website maintenance']
  }
]

export const talentLocations = [
  'All Locations',
  'Kuala Lumpur',
  'Petaling Jaya',
  'Ampang',
  'Shah Alam',
  'Bangi',
  'Cyberjaya',
  'Mont Kiara',
  'Bangsar',
  'KL Sentral',
  'KLCC'
]

export const talentRates = [
  'All Rates',
  'Under RM 30/hour',
  'RM 30 - 50/hour',
  'RM 50 - 100/hour',
  'RM 100+/hour'
]

export const talentAvailability = [
  'All Availability',
  'Flexible',
  'Weekdays',
  'Weekends',
  'Project-based'
]
