import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const labourCategories = [
  { name: 'Rumah & Taman', emoji: '🏠' },
  { name: 'Haiwan Peliharaan', emoji: '🐾' },
  { name: 'Cucian & Dobi', emoji: '👕' },
  { name: 'Angkat & Hantar', emoji: '📦' },
  { name: 'Masakan & Katering', emoji: '🍳' },
  { name: 'Jagaan & Teman', emoji: '👶' },
  { name: 'Baik Pulih Kenderaan', emoji: '🔧' },
  { name: 'Elektrik & Plumbing', emoji: '⚡' },
  { name: 'Cuci Karpet & Sofa', emoji: '🛋️' },
  { name: 'Fotografi Majlis', emoji: '📷' },
]

const technicalCategories = [
  { name: 'Design & Kreatif', emoji: '🎨' },
  { name: 'Web & App Dev', emoji: '💻' },
  { name: 'Pemasaran Digital', emoji: '📣' },
  { name: 'Kandungan & Penulisan', emoji: '✍️' },
  { name: 'Data & AI', emoji: '📊' },
  { name: 'Perniagaan & Kewangan', emoji: '🗂️' },
  { name: 'Video & Motion', emoji: '🎬' },
  { name: 'Fotografi Komersil', emoji: '📸' },
  { name: 'Sokongan IT', emoji: '🖥️' },
  { name: 'Pengurusan Media Sosial', emoji: '📱' },
]

// Sample employers data
const sampleEmployers = [
  {
    email: 'employer1@example.com',
    name: 'Ahmad bin Hassan',
    company: 'Taman Maju Jaya',
  },
  {
    email: 'employer2@example.com',
    name: 'Siti binti Rahman',
    company: 'Kedai Makan Siti',
  },
  {
    email: 'employer3@example.com',
    name: 'Lim Wei Ming',
    company: 'Tech Solutions Sdn Bhd',
  },
  {
    email: 'employer4@example.com',
    name: 'Priya a/p Krishnan',
    company: 'Clean & Green Services',
  },
  {
    email: 'employer5@example.com',
    name: 'John Tan',
    company: 'Digital Marketing Agency',
  },
]

// Sample jobs data
const sampleJobs = [
  {
    title: 'Potong Rumput Mingguan',
    description: 'Memerlukan tukang potong rumput untuk rumah di Taman Maju Jaya. Kerja setiap Sabtu pagi.',
    rate: 'RM 80-100',
    location: 'Ampang, Selangor',
    track: 'LABOUR' as const,
    category: 'Rumah & Taman',
    employerIndex: 0,
  },
  {
    title: 'Cuci Karpet Sofa',
    description: 'Perlu cuci karpet dan sofa di rumah sebelum Hari Raya. 3 set sofa dan 2 karpet.',
    rate: 'RM 150-200',
    location: 'Cheras, Kuala Lumpur',
    track: 'LABOUR' as const,
    category: 'Cuci Karpet & Sofa',
    employerIndex: 1,
  },
  {
    title: 'Website Company Profile',
    description: 'Need a professional company website with 5 pages. Must be mobile responsive.',
    rate: 'RM 2000-3000',
    location: 'Remote',
    track: 'TECHNICAL' as const,
    category: 'Web & App Dev',
    employerIndex: 2,
  },
  {
    title: 'Social Media Management',
    description: 'Manage Instagram and Facebook for restaurant. 3 posts per week.',
    rate: 'RM 800-1200/month',
    location: 'Kuala Lumpur',
    track: 'TECHNICAL' as const,
    category: 'Pengurusan Media Sosial',
    employerIndex: 3,
  },
  {
    title: 'Event Photography',
    description: 'Need photographer for company annual dinner. 4 hours coverage.',
    rate: 'RM 500-800',
    location: 'Putrajaya',
    track: 'LABOUR' as const,
    category: 'Fotografi Majlis',
    employerIndex: 4,
  },
  {
    title: 'House Cleaning Service',
    description: 'Weekly house cleaning for 4-bedroom house. Includes kitchen and bathroom deep cleaning.',
    rate: 'RM 200-250',
    location: 'Petaling Jaya, Selangor',
    track: 'LABOUR' as const,
    category: 'Cucian & Dobi',
    employerIndex: 0,
  },
  {
    title: 'Mobile App Development',
    description: 'Build a simple inventory management app for small business. iOS and Android.',
    rate: 'RM 5000-8000',
    location: 'Remote',
    track: 'TECHNICAL' as const,
    category: 'Web & App Dev',
    employerIndex: 2,
  },
  {
    title: 'Food Delivery Rider',
    description: 'Part-time food delivery rider needed for weekend shifts. Own vehicle required.',
    rate: 'RM 10-15 per delivery',
    location: 'Kuala Lumpur',
    track: 'LABOUR' as const,
    category: 'Angkat & Hantar',
    employerIndex: 1,
  },
]

async function main() {
  console.log('🌱 Seeding categories...')

  // Labour categories
  for (const cat of labourCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        emoji: cat.emoji,
        track: 'LABOUR',
      },
    })
  }

  // Technical categories
  for (const cat of technicalCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        emoji: cat.emoji,
        track: 'TECHNICAL',
      },
    })
  }

  console.log('✅ Categories seeded successfully')

  console.log('🌱 Seeding sample users and employers...')

  // Create users and employers
  for (const employerData of sampleEmployers) {
    // Create user
    const user = await prisma.user.upsert({
      where: { email: employerData.email },
      update: {
        name: employerData.name,
      },
      create: {
        email: employerData.email,
        name: employerData.name,
      },
    })

    // Create employer profile
    await prisma.employer.upsert({
      where: { userId: user.id },
      update: {
        company: employerData.company,
      },
      create: {
        userId: user.id,
        company: employerData.company,
      },
    })
  }

  console.log('✅ Sample users and employers seeded successfully')

  console.log('🌱 Seeding sample jobs...')

  // Get categories for job creation
  const categories = await prisma.category.findMany()
  const categoryMap = new Map(categories.map(cat => [cat.name, cat.id]))

  // Get employers for job creation
  const employers = await prisma.employer.findMany({
    include: { user: true },
  })

  // Create jobs
  for (const jobData of sampleJobs) {
    const employer = employers[jobData.employerIndex]
    const categoryId = categoryMap.get(jobData.category)

    if (!employer || !categoryId) {
      console.warn(`Skipping job "${jobData.title}" - missing employer or category`)
      continue
    }

    await prisma.job.create({
      data: {
        title: jobData.title,
        description: jobData.description,
        rate: jobData.rate,
        location: jobData.location,
        track: jobData.track,
        categoryId: categoryId,
        employerId: employer.id,
        status: 'OPEN',
      },
    })
  }

  console.log('✅ Sample jobs seeded successfully')

  // Print summary
  const jobCount = await prisma.job.count()
  const employerCount = await prisma.employer.count()
  const userCount = await prisma.user.count()

  console.log('\n📊 Seed Summary:')
  console.log(`   Users: ${userCount}`)
  console.log(`   Employers: ${employerCount}`)
  console.log(`   Jobs: ${jobCount}`)
  console.log(`   Categories: ${categories.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
