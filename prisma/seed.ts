import { PrismaClient, Track } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Seed Categories
  const categories = [
    // Labour Track
    { name: 'Cleaning', track: Track.LABOUR as Track, emoji: '🧹' },
    { name: 'Moving', track: Track.LABOUR as Track, emoji: '📦' },
    { name: 'Gardening', track: Track.LABOUR as Track, emoji: '🌿' },
    { name: 'Painting', track: Track.LABOUR as Track, emoji: '🎨' },
    { name: 'Plumbing', track: Track.LABOUR as Track, emoji: '🔧' },
    { name: 'Electrical', track: Track.LABOUR as Track, emoji: '⚡' },
    { name: 'Carpentry', track: Track.LABOUR as Track, emoji: '🔨' },
    { name: 'Landscaping', track: Track.LABOUR as Track, emoji: '🌳' },
    
    // Technical Track
    { name: 'Web Development', track: Track.TECHNICAL as Track, emoji: '💻' },
    { name: 'Mobile Development', track: Track.TECHNICAL as Track, emoji: '📱' },
    { name: 'UI/UX Design', track: Track.TECHNICAL as Track, emoji: '🎨' },
    { name: 'Graphic Design', track: Track.TECHNICAL as Track, emoji: '🖼️' },
    { name: 'Data Analysis', track: Track.TECHNICAL as Track, emoji: '📊' },
    { name: 'AI/ML', track: Track.TECHNICAL as Track, emoji: '🤖' },
    { name: 'DevOps', track: Track.TECHNICAL as Track, emoji: '⚙️' },
    { name: 'Cybersecurity', track: Track.TECHNICAL as Track, emoji: '🔒' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  console.log(`✅ Seeded ${categories.length} categories`)

  // Seed sample users (for development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('🌱 Seeding development users...')

    // Create a test employer
    const employerUser = await prisma.user.upsert({
      where: { email: 'employer@test.com' },
      update: {},
      create: {
        id: 'dev-employer-1',
        email: 'employer@test.com',
        name: 'Test Employer',
      },
    })

    await prisma.profile.upsert({
      where: { userId: employerUser.id },
      update: {},
      create: {
        userId: employerUser.id,
        role: 'EMPLOYER',
      },
    })

    await prisma.employer.upsert({
      where: { userId: employerUser.id },
      update: {},
      create: {
        userId: employerUser.id,
        company: 'Test Company',
      },
    })

    // Create a test talent
    const talentUser = await prisma.user.upsert({
      where: { email: 'talent@test.com' },
      update: {},
      create: {
        id: 'dev-talent-1',
        email: 'talent@test.com',
        name: 'Test Talent',
      },
    })

    await prisma.profile.upsert({
      where: { userId: talentUser.id },
      update: {},
      create: {
        userId: talentUser.id,
        role: 'TALENT',
      },
    })

    await prisma.talent.upsert({
      where: { userId: talentUser.id },
      update: {},
      create: {
        userId: talentUser.id,
        track: 'TECHNICAL',
        bio: 'Experienced developer',
        rate: 'RM50/hour',
      },
    })

    console.log('✅ Seeded development users')
  }

  console.log('ℹ️ UpahJe.Ai seed block is parked in the archived POC tree and not seeded from the active Prisma schema.')

  console.log('🌱 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
