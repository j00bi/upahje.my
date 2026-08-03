import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { ensureLocalUser } from '@/lib/auth'
import {
  getDashboardPath,
  normalizeInternalRedirect,
  toProfileRole,
  type AuthProfileRole,
} from '@/lib/auth-redirect'

type RegistrationState = {
  destination: string
  role: Role | null
  profileComplete: boolean
}

function onboardingPath(role: Role | null, requestedDestination: string) {
  const searchParams = new URLSearchParams()

  if (role === 'EMPLOYER') {
    searchParams.set('role', 'employer')
  }

  if (role === 'TALENT') {
    searchParams.set('role', 'talent')
  }

  if (requestedDestination !== '/dashboard') {
    searchParams.set('next', requestedDestination)
  }

  const query = searchParams.toString()
  return query ? `/onboarding?${query}` : '/onboarding'
}

export async function completeAuthentication(
  supabaseUser: SupabaseUser,
  requestedRole: AuthProfileRole | null,
  requestedDestination: string | null | undefined,
): Promise<RegistrationState> {
  const localUser = await ensureLocalUser(supabaseUser)
  const metadataRole = toProfileRole(supabaseUser.user_metadata?.role)
  const registrationRole = requestedRole ?? metadataRole
  const destination = normalizeInternalRedirect(
    requestedDestination,
    '/dashboard',
  )

  let profile = await prisma.profile.findUnique({
    where: { userId: localUser.id },
  })

  if (!profile && registrationRole) {
    try {
      profile = await prisma.profile.create({
        data: {
          userId: localUser.id,
          role: registrationRole,
        },
      })
    } catch {
      profile = await prisma.profile.findUnique({
        where: { userId: localUser.id },
      })

      if (!profile) {
        throw new Error('Failed to create registration profile')
      }
    }
  }

  const role = profile?.role ?? null

  if (!role) {
    return {
      destination: onboardingPath(null, destination),
      role: null,
      profileComplete: false,
    }
  }

  const roleRecord = role === 'EMPLOYER'
    ? await prisma.employer.findUnique({
        where: { userId: localUser.id },
        select: { id: true },
      })
    : role === 'TALENT'
      ? await prisma.talent.findUnique({
          where: { userId: localUser.id },
          select: { id: true },
        })
      : { id: localUser.id }

  if (!roleRecord) {
    return {
      destination: onboardingPath(role, destination),
      role,
      profileComplete: false,
    }
  }

  const fallback = getDashboardPath(role)

  return {
    destination: normalizeInternalRedirect(requestedDestination, fallback),
    role,
    profileComplete: true,
  }
}
