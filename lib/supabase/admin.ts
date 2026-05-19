import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAdminConfig } from './config'

let adminClient: SupabaseClient | null = null

export function createAdminClient() {
  if (adminClient) {
    return adminClient
  }

  const { url, serviceRoleKey } = getSupabaseAdminConfig()

  adminClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return adminClient
}
