import { getValidatedSupabaseConfig } from './config-validation'

export function getSupabaseConfig() {
  const config = getValidatedSupabaseConfig()
  return { url: config.url, key: config.anonKey }
}

export function getSupabaseAdminConfig() {
  const config = getValidatedSupabaseConfig()
  
  if (!config.serviceRoleKey) {
    throw new Error('Missing Supabase service role key (SUPABASE_SERVICE_ROLE_KEY)')
  }

  return { url: config.url, serviceRoleKey: config.serviceRoleKey }
}
