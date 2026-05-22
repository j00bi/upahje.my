const DASHBOARD_PATHS = {
  ADMIN: '/admin',
  EMPLOYER: '/dashboard/employer',
  TALENT: '/dashboard/talent',
} as const

export type AuthRegistrationRole = 'employer' | 'talent'
export type AuthProfileRole = keyof typeof DASHBOARD_PATHS

export function normalizeRegistrationRole(value: string | null | undefined): AuthRegistrationRole | null {
  if (value === 'employer' || value === 'talent') {
    return value
  }

  if (value === 'EMPLOYER') {
    return 'employer'
  }

  if (value === 'TALENT') {
    return 'talent'
  }

  return null
}

export function toProfileRole(value: string | null | undefined): 'EMPLOYER' | 'TALENT' | null {
  const role = normalizeRegistrationRole(value)

  if (role === 'employer') {
    return 'EMPLOYER'
  }

  if (role === 'talent') {
    return 'TALENT'
  }

  return null
}

export function getDashboardPath(role: string | null | undefined) {
  if (role === 'ADMIN' || role === 'EMPLOYER' || role === 'TALENT') {
    return DASHBOARD_PATHS[role]
  }

  return '/dashboard'
}

export function normalizeInternalRedirect(value: string | null | undefined, fallback = '/dashboard') {
  if (!value) {
    return fallback
  }

  if (!value.startsWith('/') || value.startsWith('//')) {
    return fallback
  }

  return value
}
