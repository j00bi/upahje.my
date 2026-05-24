import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseConfig } from '@/lib/supabase/config'
import { ensureLocalUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
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
      const localUser = await ensureLocalUser(data.user)
      const userRole = selectedRole ?? toProfileRole(data.user.user_metadata?.role)
      let redirectTarget = new URL(next, request.url)

      try {
        const existingProfile = await prisma.profile.findUnique({
          where: { userId: localUser.id },
        })

        if (!existingProfile && userRole) {
          await prisma.profile.create({
            data: {
              userId: localUser.id,
              role: userRole,
            },
          })
        }

        // Prefer the caller-specified redirect (e.g. back to a job page),
        // fall back to role-based dashboard, then to onboarding.
        if (next && next !== '/dashboard') {
          redirectTarget = new URL(next, request.url)
        } else if (!existingProfile && userRole) {
          const redirectPath = userRole === 'EMPLOYER'
            ? '/dashboard/employer'
            : '/dashboard/talent'

          redirectTarget = new URL(redirectPath, request.url)
        } else if (!existingProfile && !userRole) {
          redirectTarget = new URL('/onboarding', request.url)
        }
      } catch (profileError) {
        console.error('Error creating user profile:', profileError)
      }

      const response = NextResponse.redirect(redirectTarget)
      pendingCookies.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
      })
      return response
    }
  }

  // If verification fails or parameters are missing, redirect to sign-in
  return NextResponse.redirect(new URL('/auth/signin', request.url))
}
