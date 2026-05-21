import { createClient } from '@/lib/supabase/server'

export interface JobFilters {
  search?: string
  category?: string
  location?: string
  track?: 'LABOUR' | 'TECHNICAL'
  status?: string
  minBudget?: number
  maxBudget?: number
  limit?: number
}

export async function getJobs(filters: JobFilters = {}) {
  const supabase = await createClient()
  
  const {
    search,
    category,
    location,
    track,
    status = 'OPEN',
    minBudget,
    maxBudget,
    limit = 20
  } = filters

  let query = supabase
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
      categoryId,
      employer:Employer(
        company,
        user:User(name)
      ),
      category:Category(
        id,
        name,
        emoji
      )
    `)
    .eq('status', status)
    .order('createdAt', { ascending: false })
    .limit(limit)

  // Apply filters
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }
  
  if (category) {
    query = query.eq('categoryId', category)
  }
  
  if (location) {
    query = query.ilike('location', `%${location}%`)
  }
  
  if (track) {
    query = query.eq('track', track)
  }
  
  if (minBudget !== undefined) {
    // Note: rate is stored as string, so we need to handle this differently
    // For now, we'll skip budget filtering until we have proper numeric rate storage
  }

  if (maxBudget !== undefined) {
    // Same as minBudget: numeric filtering will land when rate storage is normalized.
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return data || []
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('Category')
    .select('id, name, emoji, track')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export async function getLocations() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('Job')
    .select('location')
    .neq('location', null)
    .neq('location', '')
    .order('location', { ascending: true })

  if (error) {
    console.error('Error fetching locations:', error)
    return []
  }

  // Return unique locations
  const locations = [...new Set(data.map(item => item.location))]
  return locations
}
