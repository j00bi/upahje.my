import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { prisma } from './prisma'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Role } from './validation/role'

export async function auth() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return null
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.user.id === user.id ? session : null
}

export async function getUser() {
  const session = await auth()
  return session?.user ?? null
}

export async function ensureLocalUser(supabaseUser: SupabaseUser) {
  const email = supabaseUser.email?.trim().toLowerCase()

  if (!email) {
    throw new Error('Missing user email')
  }

  const userById = await prisma.user.findUnique({
    where: { id: supabaseUser.id },
  })

  if (userById) {
    return userById
  }

  const userByEmail = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  })

  if (userByEmail) {
    return userByEmail
  }

  try {
    return await prisma.user.create({
      data: {
        id: supabaseUser.id,
        email,
        name: supabaseUser.user_metadata?.name ?? supabaseUser.email ?? null,
        image: supabaseUser.user_metadata?.avatar_url ?? null,
      },
    })
  } catch {
    const existing = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })

    if (existing) {
      return existing
    }

    throw new Error('Failed to create local user record')
  }
}

export async function getUserWithRole() {
  const session = await auth()
  if (!session?.user) {
    return { user: null, role: null, profile: null }
  }

  const localUser = await ensureLocalUser(session.user)

  const user = await prisma.user.findUnique({
    where: { id: localUser.id },
    include: {
      profile: true,
      employer: true,
      talent: true,
    },
  })

  return {
    user,
    role: user?.profile?.role as Role | null ?? null,
    profile: user?.profile ?? null,
    employer: user?.employer ?? null,
    talent: user?.talent ?? null,
  }
}

export async function requireAuth() {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireRole(allowedRoles: Role[]) {
  const { role } = await getUserWithRole()
  if (!role || !allowedRoles.includes(role)) {
    throw new Error('Forbidden: Insufficient permissions')
  }
  return role
}

export async function getRoleRedirectPath(role: Role | null): Promise<string> {
  if (!role) {
    return '/onboarding'
  }
  
  switch (role) {
    case 'EMPLOYER':
      return '/dashboard/employer'
    case 'TALENT':
      return '/dashboard/talent'
    case 'ADMIN':
      return '/admin'
    default:
      return '/onboarding'
  }
}
