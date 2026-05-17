import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from './supabase/config'

const { url, key } = getSupabaseConfig()

export const supabase = createClient(url, key)
