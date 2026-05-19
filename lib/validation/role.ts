export const ROLE_VALUES = ['TALENT', 'EMPLOYER', 'ADMIN'] as const

export type Role = (typeof ROLE_VALUES)[number]

/**
 * Validates if a role is valid
 */
export function isValidRole(role: string): role is Role {
  return ROLE_VALUES.includes(role as Role)
}

/**
 * Gets the redirect path for a role
 */
export function getRoleRedirectPath(role: Role | null): string {
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
