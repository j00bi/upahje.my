import { redirect } from 'next/navigation'
import { auth, getUserWithRole } from '@/lib/auth'
import { isValidRole, type Role } from '@/lib/validation/role'

/**
 * Protects a route based on user authentication and role
 * @param allowedRoles - Array of allowed roles (e.g., ['EMPLOYER', 'TALENT'])
 * @returns The user's role if authorized
 * @throws Redirects to sign-in if not authenticated, or to onboarding if role doesn't match
 */
export async function protectRoute(allowedRoles?: Role[]) {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/signin')
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    const { user } = await getUserWithRole()
    return { user, role: null }
  }

  const { user, role } = await getUserWithRole()
  
  if (!role || !allowedRoles.includes(role)) {
    redirect('/onboarding')
  }

  return { user, role }
}

/**
 * Protects employer-only routes
 */
export async function protectEmployerRoute() {
  return protectRoute(['EMPLOYER'])
}

/**
 * Protects talent-only routes
 */
export async function protectTalentRoute() {
  return protectRoute(['TALENT'])
}

/**
 * Protects admin-only routes
 */
export async function protectAdminRoute() {
  return protectRoute(['ADMIN'])
}

/**
 * Protects routes that require any authenticated user
 */
export async function protectAuthenticatedRoute() {
  return protectRoute(['TALENT', 'EMPLOYER', 'ADMIN'])
}

/**
 * Gets the current user's role for conditional rendering
 */
export async function getCurrentUserRole(): Promise<Role | null> {
  const session = await auth()
  if (!session) return null
  
  const { role } = await getUserWithRole()
  return role && isValidRole(role) ? role : null
}

/**
 * Checks if current user has a specific role
 */
export async function hasRole(roleToCheck: Role): Promise<boolean> {
  const currentRole = await getCurrentUserRole()
  return currentRole === roleToCheck
}

/**
 * Checks if current user has any of the specified roles
 */
export async function hasAnyRole(rolesToCheck: Role[]): Promise<boolean> {
  const currentRole = await getCurrentUserRole()
  return currentRole ? rolesToCheck.includes(currentRole) : false
}
