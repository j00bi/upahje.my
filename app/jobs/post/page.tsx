import { redirect } from 'next/navigation'
import { getUserWithRole } from '@/lib/auth'
import { PostJobForm } from './PostJobForm'

export const dynamic = 'force-dynamic'

export default async function PostJobPage() {
  const { user, role } = await getUserWithRole()

  if (!user) {
    redirect('/auth/signin?callbackUrl=/jobs/post')
  }

  if (!role) {
    redirect('/onboarding')
  }

  if (role !== 'EMPLOYER') {
    redirect('/dashboard')
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Post a New Job</h1>
      <p className="text-slate-600 mb-8">Fill in the details below to post your job.</p>
      <PostJobForm session={{ user: { id: user.id } }} />
    </main>
  )
}
