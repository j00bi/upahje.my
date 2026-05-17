import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params
  const supabase = await createClient()

  const { data: job } = await supabase
    .from('Job')
    .select(`
      id,
      title,
      description,
      rate,
      location,
      track,
      status,
      createdAt,
      employer:Employer(
        companyName,
        user:User(name)
      )
    `)
    .eq('id', jobId)
    .single()

  if (!job) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Job not found</h1>
        <Link href="/jobs" className="text-emerald-700 hover:underline">← Back to jobs</Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6">
        <Link href="/jobs" className="text-sm text-emerald-700 hover:underline">← Back to all jobs</Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
            {job.status}
          </span>
          <span className="text-sm text-slate-500">{job.track}</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight mb-2">{job.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
          <span>{job.location}</span>
          <span>•</span>
          <span className="font-medium text-emerald-700">{job.rate}</span>
        </div>

        <div className="prose max-w-none text-slate-700 mb-8">
          <p>{job.description || 'No description provided.'}</p>
        </div>

        <div className="pt-6 border-t flex flex-col sm:flex-row gap-3">
          <button className="flex-1 rounded-full bg-emerald-700 py-3 text-white font-semibold hover:bg-emerald-800">
            Contact Employer
          </button>
          <button className="flex-1 rounded-full border border-slate-300 py-3 font-semibold hover:bg-slate-50">
            Save for Later
          </button>
        </div>
      </div>
    </main>
  )
}