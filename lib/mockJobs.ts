export interface JobPostData {
  title: string
  description: string
  category: string
  location: string
  budget: string
  track: 'LABOUR' | 'TECHNICAL'
}

export interface Job extends JobPostData {
  id: string
  status: string
  postedDate: string
  employerName?: string
  employerRating?: number
  jobType?: string
  duration?: string
  requirements?: string[]
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Garden Maintenance - Taman Melawati',
    description: 'Need regular garden maintenance for 3-bedroom house. Grass cutting, weeding, and basic pruning.',
    category: 'Garden & Landscaping',
    location: 'Taman Melawati, Kuala Lumpur',
    budget: 'RM 150 - 200',
    track: 'LABOUR',
    status: 'Open',
    postedDate: '2 hours ago',
    employerName: 'Encik Ahmad',
    employerRating: 4.5,
    jobType: 'One-time',
    duration: '3-4 hours',
    requirements: ['Own tools preferred', 'Reliable', 'Can start immediately']
  },
  {
    id: '2',
    title: 'House Cleaning Service - Ampang',
    description: 'Deep cleaning for 4-bedroom semi-detached house. Kitchen, bathrooms, living areas.',
    category: 'Cleaning Services',
    location: 'Ampang, Selangor',
    budget: 'RM 250 - 350',
    track: 'LABOUR',
    status: 'Open',
    postedDate: '5 hours ago',
    employerName: 'Puan Sarah',
    employerRating: 4.8,
    jobType: 'One-time',
    duration: 'Full day',
    requirements: ['Experience with deep cleaning', 'Own cleaning supplies']
  },
  {
    id: '3',
    title: 'Moving Help - PJ to Cheras',
    description: 'Need 2-3 people to help move furniture and boxes from Petaling Jaya to Cheras.',
    category: 'Moving & Transportation',
    location: 'Petaling Jaya, Selangor',
    budget: 'RM 300 - 400',
    track: 'LABOUR',
    status: 'Open',
    postedDate: '1 day ago',
    employerName: 'Encik Lim',
    employerRating: 4.2,
    jobType: 'One-time',
    duration: 'Half day',
    requirements: ['Physically fit', 'Can lift heavy items', 'Own vehicle preferred']
  },
  {
    id: '4',
    title: 'Website Development - Small Business',
    description: 'Need a simple 5-page website for local bakery. Must be mobile-responsive.',
    category: 'Web Development',
    location: 'Bangi, Selangor',
    budget: 'RM 2000 - 3500',
    track: 'TECHNICAL',
    status: 'Open',
    postedDate: '3 hours ago',
    employerName: 'Bakery Kecil',
    employerRating: undefined,
    jobType: 'Project',
    duration: '2-3 weeks',
    requirements: ['Portfolio required', 'React/Next.js preferred', 'Must include basic SEO']
  },
  {
    id: '5',
    title: 'Social Media Management - Cafe',
    description: 'Manage Instagram and Facebook for new cafe in KLCC area. Content creation and engagement.',
    category: 'Digital Marketing',
    location: 'KLCC, Kuala Lumpur',
    budget: 'RM 800 - 1200/month',
    track: 'TECHNICAL',
    status: 'Open',
    postedDate: '1 day ago',
    employerName: 'Cafe Merdeka',
    employerRating: undefined,
    jobType: 'Part-time',
    duration: 'Ongoing',
    requirements: ['Previous social media experience', 'Can create graphics', 'Good English & BM']
  },
  {
    id: '6',
    title: 'Electrical Repair - Condo Unit',
    description: 'Fix electrical issues in 3-bedroom condo. Tripping circuit breaker and faulty switches.',
    category: 'Electrical',
    location: 'KL Sentral, Kuala Lumpur',
    budget: 'RM 150 - 250',
    track: 'LABOUR',
    status: 'Open',
    postedDate: '6 hours ago',
    employerName: 'Puan Zainab',
    employerRating: 4.6,
    jobType: 'One-time',
    duration: '2-3 hours',
    requirements: ['Licensed electrician preferred', 'Own tools', 'Available evenings']
  },
  {
    id: '7',
    title: 'Content Writing - Tech Startup',
    description: 'Write blog posts about fintech and digital banking for Malaysian market.',
    category: 'Writing & Content',
    location: 'Remote (KL-based)',
    budget: 'RM 50 - 80 per article',
    track: 'TECHNICAL',
    status: 'Open',
    postedDate: '2 days ago',
    employerName: 'FinTech MY',
    employerRating: undefined,
    jobType: 'Project',
    duration: 'Ongoing',
    requirements: ['Strong English writing', 'Finance knowledge preferred', 'Can meet deadlines']
  },
  {
    id: '8',
    title: 'Plumbing Service - Shah Alam',
    description: 'Fix leaking pipe in bathroom and unclog kitchen sink.',
    category: 'Plumbing',
    location: 'Shah Alam, Selangor',
    budget: 'RM 100 - 180',
    track: 'LABOUR',
    status: 'Open',
    postedDate: '4 hours ago',
    employerName: 'Encik Hassan',
    employerRating: 4.4,
    jobType: 'One-time',
    duration: '1-2 hours',
    requirements: ['Experience with residential plumbing', 'Own tools']
  },
  {
    id: '9',
    title: 'Logo Design - Food Delivery App',
    description: 'Create modern logo for new food delivery service targeting university students.',
    category: 'Graphic Design',
    location: 'Cyberjaya, Selangor',
    budget: 'RM 500 - 800',
    track: 'TECHNICAL',
    status: 'Open',
    postedDate: '12 hours ago',
    employerName: 'MakanExpress',
    employerRating: undefined,
    jobType: 'Project',
    duration: '1 week',
    requirements: ['Portfolio required', 'Vector format', 'Multiple concepts']
  },
  {
    id: '10',
    title: 'Babysitting - Weekend',
    description: 'Need babysitter for 2 kids (ages 3 and 6) while parents attend wedding.',
    category: 'Childcare',
    location: 'Mont Kiara, Kuala Lumpur',
    budget: 'RM 80 - 120',
    track: 'LABOUR',
    status: 'Open',
    postedDate: '3 days ago',
    employerName: 'Puan Aisyah',
    employerRating: 4.9,
    jobType: 'One-time',
    duration: '6 hours',
    requirements: ['Childcare experience', 'First aid knowledge preferred', 'Non-smoker']
  },
  {
    id: '11',
    title: 'Mobile App Development - E-commerce',
    description: 'Build simple e-commerce app for local fashion brand. iOS and Android.',
    category: 'Mobile Development',
    location: 'Bangsar, Kuala Lumpur',
    budget: 'RM 8000 - 12000',
    track: 'TECHNICAL',
    status: 'Open',
    postedDate: '1 day ago',
    employerName: 'Butik Local',
    employerRating: undefined,
    jobType: 'Project',
    duration: '4-6 weeks',
    requirements: ['React Native or Flutter', 'E-commerce experience', 'API integration skills']
  },
  {
    id: '12',
    title: 'Car Wash & Detailing - PJ',
    description: 'Full car wash and interior detailing for SUV. Pet-friendly car.',
    category: 'Automotive',
    location: 'Petaling Jaya, Selangor',
    budget: 'RM 120 - 180',
    track: 'LABOUR',
    status: 'Open',
    postedDate: '8 hours ago',
    employerName: 'Encik Razak',
    employerRating: 4.3,
    jobType: 'One-time',
    duration: '2-3 hours',
    requirements: ['Own equipment', 'Experience with detailing', 'Can come to location']
  }
]

export const categories = [
  'All Categories',
  'Garden & Landscaping',
  'Cleaning Services',
  'Moving & Transportation',
  'Electrical',
  'Plumbing',
  'Childcare',
  'Automotive',
  'Web Development',
  'Mobile Development',
  'Graphic Design',
  'Digital Marketing',
  'Writing & Content'
]

export const locations = [
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

export const tracks = ['All Tracks', 'Labour', 'Technical']