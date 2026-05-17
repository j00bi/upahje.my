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
    }
  ]

  const { data, error } = await supabase.from('Job').insert(sampleJobs) as any

  if (error) {
    console.error('Error seeding jobs:', error.message)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data?.length || 0} sample jobs!`)
  console.log('You can now view them on the jobs page.')
}

seedJobs()