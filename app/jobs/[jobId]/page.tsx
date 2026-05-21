'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { use } from 'react'

interface JobDetailProps {
  params: Promise<{ jobId: string }>
}

interface Job {
  id: string
  title: string
  description: string | null
  rate: string | null
  location: string | null
  track: string
  status: string
  createdAt: string
  employer: {
    id: string
    company: string | null
    user: { id: string; name: string | null; email: string }
  }
  category: { id: string; name: string; emoji: string | null } | null
}

export default function JobDetailPage({ params }: JobDetailProps) {
  const { jobId } = use(params)
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [proposal, setProposal] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then(data => {
        if (data) setJob(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [jobId])

  const handleApply = async () => {
    if (!proposal.trim()) {
      setApplyError('Please write a short proposal first.')
      return
    }

    setIsApplying(true)
    setApplyError(null)

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal }),
      })

      if (res.ok) {
        setApplied(true)
      } else {
        const data = await res.json()
        setApplyError(data.error ?? 'Failed to submit application.')
      }
    } catch {
      setApplyError('Something went wrong. Please try again.')
    } finally {
      setIsApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading job...</p>
        </div>
      </div>
    )
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">Job not found</h2>
          <p className="text-slate-500 mb-6">This job may have been filled or removed.</p>
          <Link href="/jobs" className="px-6 py-2.5 bg-emerald-600 text-white rounded-2xl text-sm font-medium">
            Browse all jobs
          </Link>
        </div>
      </div>
    )
  }

  const postedDate = new Date(job.createdAt).toLocaleDateString('ms-MY', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Back nav */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Main card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8">
          {/* Category + track */}
          <div className="flex items-center gap-2 mb-4">
            {job.category && (
              <span className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                {job.category.emoji} {job.category.name}
              </span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${job.track === 'LABOUR' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
              {job.track === 'LABOUR' ? '🛠️ Labour' : '💻 Technical'}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ml-auto ${job.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
              {job.status}
            </span>
          </div>

          <h1 className="text-3xl font-semibold text-slate-900 mb-4">{job.title}</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {job.rate && (
              <div className="bg-emerald-50 rounded-2xl p-4">
                <div className="text-xs text-emerald-600 font-medium uppercase tracking-wide mb-1">Budget</div>
                <div className="font-semibold text-emerald-800">{job.rate}</div>
              </div>
            )}
            {job.location && (
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Location</div>
                <div className="font-medium text-slate-800">{job.location}</div>
              </div>
            )}
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Posted</div>
              <div className="font-medium text-slate-800">{postedDate}</div>
            </div>
          </div>

          {job.description && (
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>
          )}

          {job.employer && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">About the employer</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold">
                  {(job.employer.company || job.employer.user.name || 'E')[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-slate-800">{job.employer.company || job.employer.user.name || 'Employer'}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Apply card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8">
          {!applied ? (
            <>
              <h3 className="font-semibold text-lg text-slate-800 mb-4">Apply for this job</h3>
              <textarea
                value={proposal}
                onChange={e => setProposal(e.target.value)}
                placeholder="Write a short proposal explaining why you're a good fit for this job..."
                className="w-full border border-slate-200 rounded-2xl p-4 h-32 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
              {applyError && (
                <p className="mt-2 text-sm text-red-600">{applyError}</p>
              )}
              <button
                onClick={handleApply}
                disabled={isApplying || !proposal.trim()}
                className="mt-4 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {isApplying ? 'Submitting...' : 'Submit Application'}
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">
                By applying, you agree to our Terms of Service. We'll notify the employer.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-2">Application submitted!</h3>
              <p className="text-slate-600 text-sm mb-4">The employer will review your proposal and get in touch.</p>
              <Link href="/dashboard/talent" className="text-emerald-600 text-sm font-medium hover:underline">
                View your applications →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}