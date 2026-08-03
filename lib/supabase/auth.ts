import { createClient } from './client'
import type { Provider } from '@supabase/supabase-js'
import { normalizeInternalRedirect, normalizeRegistrationRole } from '@/lib/auth-redirect'

const supabase = createClient()

function getAuthOrigin() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}

function buildAuthCallbackUrl(options: { role?: string; callbackUrl?: string }) {
  const registrationRole = normalizeRegistrationRole(options.role)
  const callbackUrl = new URL(getAuthOrigin())
  callbackUrl.pathname = '/auth/callback'

  if (registrationRole) {
    callbackUrl.searchParams.set('role', registrationRole)
  }

  if (options.callbackUrl) {
    callbackUrl.searchParams.set(
      'next',
      normalizeInternalRedirect(options.callbackUrl),
    )
  }

  return callbackUrl
}

export async function signUpWithEmail(
  email: string,
  password: string,
  options: { role?: string; callbackUrl?: string } = {},
) {
  const { role, callbackUrl: requestedCallbackUrl } = options
  const registrationRole = normalizeRegistrationRole(role)
  const callbackUrl = buildAuthCallbackUrl({
    role,
    callbackUrl: requestedCallbackUrl,
  })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      data: {
        role: registrationRole,
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
  const callbackUrl = buildAuthCallbackUrl(options)

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

export async function resendSignupConfirmation(
  email: string,
  options: { role?: string; callbackUrl?: string } = {},
) {
  const callbackUrl = buildAuthCallbackUrl(options)
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: callbackUrl.toString(),
    },
  })
  return { data, error }
}

export async function sendPasswordResetEmail(email: string) {
  const callbackUrl = buildAuthCallbackUrl({
    callbackUrl: '/auth/reset-password',
  })
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackUrl.toString(),
  })
  return { data, error }
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password })
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
