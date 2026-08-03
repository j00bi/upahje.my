import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseConfig } from '@/lib/supabase/config'
import { completeAuthentication } from '@/lib/auth-flow'
import {
  normalizeInternalRedirect,
  toProfileRole,
} from '@/lib/auth-redirect'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = normalizeInternalRedirect(searchParams.get('next'), '/dashboard')
  const selectedRole = toProfileRole(searchParams.get('role'))
  type CookieOption = Parameters<NextResponse['cookies']['set']>[2]
  const pendingCookies: Array<{ name: string; value: string; options?: CookieOption }> = []

  if ((token_hash && type) || code) {
    const { url, key } = getSupabaseConfig()

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          pendingCookies.length = 0
          cookies.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            pendingCookies.push({ name, value, options })
          })
        },
      },
    })

    const result = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : await supabase.auth.verifyOtp({
          type: type!,
          token_hash: token_hash!,
        })

    const { error, data } = result

    if (!error && data?.user) {
      try {
        const registration = await completeAuthentication(data.user, selectedRole, next)
        const destination = next === '/auth/reset-password'
          ? next
          : registration.destination
        const redirectTarget = new URL(destination, request.url)

        const response = NextResponse.redirect(redirectTarget)
        pendingCookies.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
        return response
      } catch (profileError) {
        console.error('Error completing user registration:', profileError)
        const signInUrl = new URL('/auth/signin', request.url)
        signInUrl.searchParams.set('error', 'profile_setup_failed')
        return NextResponse.redirect(signInUrl)
      }
    }

    console.error('Authentication callback failed:', error)
  }

  const signInUrl = new URL('/auth/signin', request.url)
  signInUrl.searchParams.set('error', 'callback_failed')
  return NextResponse.redirect(signInUrl)
}
