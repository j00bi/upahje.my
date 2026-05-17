import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import PostJobForm from './PostJobForm'

export default async function PostJobPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin?callbackUrl=/jobs/post')
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Post a New Job</h1>
      <p className="text-slate-600 mb-8">Fill in the details below to post your job.</p>
      <PostJobForm />
    </main>
  )
}