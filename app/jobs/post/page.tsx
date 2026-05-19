import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { PostJobForm } from './PostJobForm'
import { getCurrentEmployerId } from '@/lib/actions/jobCreation'

export default async function PostJobPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin?callbackUrl=/jobs/post')
  }

  // Check if user has an employer profile
  const employerResult = await getCurrentEmployerId()
  
  if (!employerResult.success) {
    // If we can't get or create an employer profile, show an error
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold">Unable to Post Job</h2>
          <p className="mt-2 text-slate-600">{employerResult.error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Post a New Job</h1>
      <p className="text-slate-600 mb-8">Fill in the details below to post your job.</p>
      <PostJobForm />
    </main>
  )
}
