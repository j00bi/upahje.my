/**
 * Environment Configuration Validation
 * Validates all required environment variables for Supabase and application
 */

export interface SupabaseConfig {
  url: string
  anonKey: string
  serviceRoleKey?: string
}

export interface AppConfig {
  nodeEnv: string
  nextAuthSecret: string
  nextAuthUrl: string
  databaseUrl: string
}

export interface ValidatedConfig {
  supabase: SupabaseConfig
  app: AppConfig
}

export function validateEnvironment(): ValidatedConfig {
  const errors: string[] = []

  // Validate Supabase configuration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is required')
  }

  if (!supabaseAnonKey) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
  }

  // Validate application configuration
  const nodeEnv = process.env.NODE_ENV || 'development'
  const nextAuthSecret = process.env.NEXTAUTH_SECRET
  const nextAuthUrl = process.env.NEXTAUTH_URL
  const databaseUrl = process.env.DATABASE_URL

  if (!nextAuthSecret) {
    errors.push('NEXTAUTH_SECRET is required')
  }

  if (!nextAuthUrl) {
    errors.push('NEXTAUTH_URL is required')
  }

  if (!databaseUrl) {
    errors.push('DATABASE_URL is required')
  }

  // Throw error if any required variables are missing
  if (errors.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${errors.join('\n')}`
    )
  }

  return {
    supabase: {
      url: supabaseUrl!,
      anonKey: supabaseAnonKey!,
      serviceRoleKey: supabaseServiceRoleKey,
    },
    app: {
      nodeEnv,
      nextAuthSecret: nextAuthSecret!,
      nextAuthUrl: nextAuthUrl!,
      databaseUrl: databaseUrl!,
    },
  }
}

// Validate on module load (in development)
if (process.env.NODE_ENV === 'development') {
  try {
    validateEnvironment()
    console.log('✓ Environment configuration validated successfully')
  } catch (error) {
    console.error('❌ Environment validation failed:', error)
  }
}

export function getValidatedSupabaseConfig(): SupabaseConfig {
  const config = validateEnvironment()
  return config.supabase
}

export function getValidatedAppConfig(): AppConfig {
  const config = validateEnvironment()
  return config.app
}