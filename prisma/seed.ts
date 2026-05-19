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

  // ============================================================
  // UpahJe.Ai — Seed realistic AiTasks for agent testing / Video POC
  // ============================================================
  console.log('🌱 Seeding UpahJe.Ai tasks (for agent discovery)...')

  const videoTaskSpec = {
    title: "Create a Professional Product Demo Video for UpahJe",
    narrative: "60-70% human marketplace live demo + 30-40% autonomous AI agent journey",
    duration: "2:30 - 3:30 minutes",
    tools: ["Remotion (required for motion graphics)", "screen recording / vision models (BYOK)"],
    phases: [
      { phase: 0, gate: "Kickoff & Planning", deliverables: ["Detailed plan with 7 gates", "Living log template", "Risks & unknowns"] },
      { phase: 1, gate: "Human-side footage & script", deliverables: ["Recorded live demos of job posting, talent discovery, onboarding"] },
      { phase: 2, gate: "AI agent-side footage", deliverables: ["Agent registration, task discovery, accept, submit flows (using current API)"] },
      { phase: 3, gate: "Remotion animations & motion graphics", deliverables: ["Title sequences, UI flow explanations, brand motion"] },
      { phase: 4, gate: "First full cut + subtitles", deliverables: ["Rough cut for review"] },
      { phase: 5, gate: "Final polish & exports", deliverables: ["1080p master + 9:16 vertical cut + all source files"] },
      { phase: 6, gate: "Retrospective & handoff", deliverables: ["Full living execution log", "Retrospective", "All assets + editable Remotion project"] }
    ],
    standardsRef: "/docs/AI_AGENT_WORKING_STANDARDS.md (non-negotiable)",
    paymentMilestones: [ { gate: 0, amount: 240 }, { gate: 2, amount: 180 }, { gate: 4, amount: 300 }, { gate: 6, amount: 480 } ]
  }

  const aiTasks = [
    {
      title: "Create a Professional Product Demo Video for UpahJe (Human + AI Agent Marketplace)",
      description: `${videoTaskSpec.title}

High-quality 2:30–3:30 minute promotional product demo video showcasing UpahJe as a dual-sided marketplace for humans AND autonomous AI agents.

Narrative must be 60-70% authentic human marketplace experience (live demos of job posting, talent profiles, onboarding, trust signals) + 30-40% autonomous AI agent journey (registration, task discovery, accept, execute, submit, review).

Technical requirement: Primary motion graphics tool must be Remotion (React). All source code + assets must be delivered.

You MUST read and follow /docs/AI_AGENT_WORKING_STANDARDS.md — this is non-negotiable.

Full phase gates, deliverables, and payment schedule defined in the structured spec below.`,
      category: "Content Creation",
      requiredCapabilities: ["video:production", "remotion", "screen-recording", "narrative-scripting", "motion-graphics"],
      reward: { amount: 1200, currency: "MYR" },
      difficulty: "hard",
      status: "open",
    },
    {
      title: "Scrape and structure product pricing from 8 Malaysian e-commerce sites",
      description: "Build a reliable scraper + normalizer that outputs clean JSON with price history, seller info, and confidence scores. Must handle anti-bot measures gracefully.",
      category: "Web Scraping",
      requiredCapabilities: ["web:scrape:http", "data:json", "anti-bot:handling"],
      reward: { amount: 450, currency: "MYR" },
      difficulty: "medium",
      status: "open",
    },
    {
      title: "Generate 40 high-converting product descriptions (BM + EN) for local fashion brand",
      description: "Create bilingual (Bahasa Malaysia + English) product copy that feels premium and culturally natural. Include SEO keywords and A/B variants.",
      category: "Content Writing",
      requiredCapabilities: ["content:writing", "lang:ms", "lang:en", "seo"],
      reward: { amount: 380, currency: "MYR" },
      difficulty: "easy",
      status: "open",
    },
  ]

  for (const task of aiTasks) {
    const existing = await prisma.aiTask.findFirst({
      where: { title: task.title },
      select: { id: true },
    })

    const data = {
      title: task.title,
      description: task.description,
      category: task.category,
      requiredCapabilities: task.requiredCapabilities,
      reward: task.reward,
      difficulty: task.difficulty,
      status: task.status,
    }

    if (existing) {
      await prisma.aiTask.update({
        where: { id: existing.id },
        data,
      })
      continue
    }

    await prisma.aiTask.create({
      data,
    })
  }

  console.log(`✅ Seeded ${aiTasks.length} UpahJe.Ai tasks (including the real Product Demo Video POC task)`)

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
