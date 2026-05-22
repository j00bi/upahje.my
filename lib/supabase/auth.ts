import { createClient } from './client'
import type { Provider } from '@supabase/supabase-js'

const supabase = createClient()

export async function signUpWithEmail(email: string, password: string, role?: string) {
  // Construct the callback URL with the role parameter
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  const callbackUrl = new URL(origin)
  callbackUrl.pathname = '/auth/callback'
  if (role) {
    callbackUrl.searchParams.set('role', role)
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      data: {
        role,
      },
    },
  })
  return { data, error }
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signInWithOAuth(
  provider: Provider,
  options: { role?: string; callbackUrl?: string } = {},
) {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
  const callbackUrl = new URL(origin)
  callbackUrl.pathname = '/auth/callback'
  if (options.role) {
    callbackUrl.searchParams.set('role', options.role)
  }
  if (options.callbackUrl) {
    callbackUrl.searchParams.set('next', options.callbackUrl)
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        prompt: 'select_account',
      },
    },
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
