/**
 * Seed script for sample jobs
 * Run with: npx tsx lib/seed-jobs.ts
 * 
 * Note: This uses placeholder employerId and categoryId.
 * For production, replace with real IDs from your database.
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seedJobs() {
  console.log('Seeding sample jobs...')

  const sampleJobs = [
    // Labour jobs
    {
      title: "Need grass cutter this weekend",
      description: "Looking for someone reliable to cut grass in Ampang area. Small garden, should take 2-3 hours. Tools can be provided.",
      rate: "RM 80-120",
      location: "Ampang, KL",
      track: "LABOUR",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "Weekly house cleaning - Bangsar",
      description: "Need trustworthy cleaner for weekly house cleaning in Bangsar. 3 bedroom house, 2 bathrooms. Experience preferred.",
      rate: "RM 150 / visit",
      location: "Bangsar, KL",
      track: "LABOUR",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "Urgent: Move furniture this Saturday",
      description: "Need 2-3 strong helpers to move furniture from current apartment to new place in Mont Kiara. Should take 4-5 hours.",
      rate: "RM 200-250 for team",
      location: "Mont Kiara, KL",
      track: "LABOUR",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "Aircond installation - Subang Jaya",
      description: "Need experienced technician to install 2 split air conditioners at a residential unit in Subang Jaya.",
      rate: "RM 350-400",
      location: "Subang Jaya, Selangor",
      track: "LABOUR",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "Painting job - 2 bedroom apartment",
      description: "Looking for painter to repaint 2 bedroom apartment in Cheras. Walls and ceiling only. Materials provided.",
      rate: "RM 800-1000",
      location: "Cheras, KL",
      track: "LABOUR",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },

    // Technical jobs
    {
      title: "Build simple company website",
      description: "Need a freelancer to build a clean 5-page company website using Next.js or similar. Must be mobile responsive.",
      rate: "RM 1800-2500",
      location: "Remote",
      track: "TECHNICAL",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "Fix bug in existing React dashboard",
      description: "Small bug fix needed in a React + Tailwind dashboard. Data table not rendering correctly on mobile.",
      rate: "RM 400-600",
      location: "Remote",
      track: "TECHNICAL",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "Set up Supabase + Prisma for startup",
      description: "Help set up authentication, database schema and basic CRUD for a new startup using Supabase and Prisma.",
      rate: "RM 1200-1600",
      location: "Remote",
      track: "TECHNICAL",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "Create landing page for mobile app",
      description: "Design and build a modern landing page for a new productivity mobile app. Figma design will be provided.",
      rate: "RM 900-1300",
      location: "Remote",
      track: "TECHNICAL",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    },
    {
      title: "WordPress site maintenance + security",
      description: "Monthly maintenance for existing WordPress site. Update plugins, improve security and fix any issues.",
      rate: "RM 350 / month",
      location: "Remote",
      track: "TECHNICAL",
      status: "OPEN",
      categoryId: "cm_placeholder_category",
      employerId: "cm_placeholder_employer"
    }
  ]

  const { error } = await supabase.from('Job').insert(sampleJobs)

  if (error) {
    console.error('Error seeding jobs:', error.message)
    process.exit(1)
  }

  console.log(`Successfully seeded ${sampleJobs.length} sample jobs!`)
  console.log('You can now view them on the jobs page.')
}

seedJobs()
