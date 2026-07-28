import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { completeAuthentication } from '@/lib/auth-flow'
import {
  normalizeInternalRedirect,
  toProfileRole,
} from '@/lib/auth-redirect'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('error', 'session_missing')
    return NextResponse.redirect(signInUrl)
  }

  try {
    const { searchParams } = request.nextUrl
    const registration = await completeAuthentication(
      user,
      toProfileRole(searchParams.get('role')),
      normalizeInternalRedirect(searchParams.get('next'), '/dashboard'),
    )

    return NextResponse.redirect(new URL(registration.destination, request.url))
  } catch (registrationError) {
    console.error('Error completing authentication:', registrationError)
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('error', 'profile_setup_failed')
    return NextResponse.redirect(signInUrl)
  }
}
