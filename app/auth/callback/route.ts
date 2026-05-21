import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseConfig } from '@/lib/supabase/config'
import { ensureLocalUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'
  type CookieOption = Parameters<NextResponse['cookies']['set']>[2]
  const pendingCookies: Array<{ name: string; value: string; options?: CookieOption }> = []

  if (token_hash && type) {
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

    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error && data?.user) {
      const localUser = await ensureLocalUser(data.user)
      let redirectTarget = new URL(next, request.url)

      // Check if this is a new sign-up (email confirmation)
      if (type === 'email' || type === 'signup') {
        // Get the selected role from URL params (passed during signup)
        // Default to TALENT if not specified
        const selectedRole = searchParams.get('role') || 'TALENT'
        
        // Create user profile with role if it doesn't exist
        try {
          const existingProfile = await prisma.profile.findUnique({
            where: { userId: localUser.id },
          })

          if (!existingProfile) {
            await prisma.profile.create({
              data: {
                userId: localUser.id,
                role: selectedRole === 'employer' || selectedRole === 'EMPLOYER' 
                  ? 'EMPLOYER' 
                  : 'TALENT',
              },
            })
          }

          // Redirect based on role
          const redirectPath = selectedRole === 'employer' || selectedRole === 'EMPLOYER'
            ? '/dashboard/employer' 
            : '/dashboard/talent'
          
          redirectTarget = new URL(redirectPath, request.url)
        } catch (profileError) {
          console.error('Error creating user profile:', profileError)
          // Continue with default redirect
        }
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
