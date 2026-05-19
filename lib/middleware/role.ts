import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseConfig } from '@/lib/supabase/config'
import { prisma } from '@/lib/prisma'

export type UserRole = 'TALENT' | 'EMPLOYER' | 'ADMIN'

export interface RoleCheckConfig {
  allowedRoles: UserRole[]
  redirectTo?: string
  redirectParam?: boolean
}

/**
 * Middleware factory for role-based access control
 * @param config - Configuration for allowed roles and redirects
 * @returns Middleware function
 */
export function withRoleCheck(config: RoleCheckConfig) {
  return async function roleMiddleware(request: NextRequest) {
    const { url, key } = getSupabaseConfig()
    
    const supabase = createServerClient(url, key, {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {
            // Handled by NextResponse
          },
        },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If no user, redirect to sign in
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = config.redirectTo || '/auth/signin'
      if (config.redirectParam) {
        redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      }
      return NextResponse.redirect(redirectUrl)
    }

    // Get user profile with role
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    })

    // If no role set, redirect to onboarding
    if (!profile?.role) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/onboarding'
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user has required role
    if (!config.allowedRoles.includes(profile.role)) {
      const redirectUrl = request.nextUrl.clone()
      
      // Redirect to appropriate dashboard based on actual role
      switch (profile.role) {
        case 'EMPLOYER':
          redirectUrl.pathname = '/dashboard/employer'
          break
        case 'TALENT':
          redirectUrl.pathname = '/dashboard/talent'
          break
        case 'ADMIN':
          redirectUrl.pathname = '/admin'
          break
        default:
          redirectUrl.pathname = '/onboarding'
      }
      
      return NextResponse.redirect(redirectUrl)
    }

    // User has required role, continue
    return NextResponse.next()
  }
}

/**
 * Pre-configured middleware for specific roles
 */
export const employerOnly = withRoleCheck({
  allowedRoles: ['EMPLOYER'],
  redirectTo: '/auth/signin',
  redirectParam: true,
})

export const talentOnly = withRoleCheck({
  allowedRoles: ['TALENT'],
  redirectTo: '/auth/signin',
  redirectParam: true,
})

export const adminOnly = withRoleCheck({
  allowedRoles: ['ADMIN'],
  redirectTo: '/auth/signin',
  redirectParam: true,
})

export const authenticatedOnly = withRoleCheck({
  allowedRoles: ['TALENT', 'EMPLOYER', 'ADMIN'],
  redirectTo: '/auth/signin',
  redirectParam: true,
})
