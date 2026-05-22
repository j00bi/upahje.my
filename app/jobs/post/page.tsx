import { auth } from '@/lib/auth'
import { PostJobForm } from './PostJobForm'

export const dynamic = 'force-dynamic'

export default async function PostJobPage() {
  const session = await auth()

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Post a New Job</h1>
      <p className="text-slate-600 mb-8">Fill in the details below to post your job. We&apos;ll ask you to sign in when you submit.</p>
      <PostJobForm session={session} />
    </main>
  )
}