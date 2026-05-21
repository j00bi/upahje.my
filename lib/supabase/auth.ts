import { createClient } from './client'

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

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
