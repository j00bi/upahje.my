import { redirect } from 'next/navigation'
import { getUserWithRole } from '@/lib/auth'

export default async function DashboardHome() {
  const { user, role } = await getUserWithRole()

  if (!user) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  // Redirect based on role
  if (role === 'EMPLOYER') {
    redirect('/dashboard/employer')
  } else if (role === 'TALENT') {
    redirect('/dashboard/talent')
  }

  // Default redirect for users without a role set
  redirect('/onboarding')
}
