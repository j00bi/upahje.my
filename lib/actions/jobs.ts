import { createClient } from '@/lib/supabase/server'

export async function getJobs(limit = 20) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('Job')
    .select(`
      id,
      title,
      description,
      rate,
      location,
      track,
      status,
      createdAt,
      employer:Employer(
        companyName,
        user:User(name)
      )
    `)
    .eq('status', 'OPEN')
    .order('createdAt', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return data || []
}