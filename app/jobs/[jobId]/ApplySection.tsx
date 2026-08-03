'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ApplySectionProps {
  jobId: string
  userId?: string
}

export function ApplySection({ jobId, userId }: ApplySectionProps) {
  const router = useRouter()
  const [proposal, setProposal] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)

  useEffect(() => {
    const pending = sessionStorage.getItem('pendingApply')
    if (!pending) return

    try {
      const saved = JSON.parse(pending)
      if (saved.jobId === jobId && typeof saved.proposal === 'string') {
        setProposal(saved.proposal)
      }
    } catch {
      sessionStorage.removeItem('pendingApply')
    }
  }, [jobId])

  const handleApply = async () => {
    if (!userId) {
      sessionStorage.setItem('pendingApply', JSON.stringify({ jobId, proposal }))
      router.push(`/auth/signin?callbackUrl=/jobs/${jobId}`)
      return
    }

    if (!proposal.trim()) {
      setApplyError('Please write a short proposal first.')
      return
    }

    if (proposal.trim().length < 10) {
      setApplyError('Your proposal must be at least 10 characters.')
      return
    }

    if (proposal.trim().length > 5000) {
      setApplyError('Your proposal must be 5,000 characters or fewer.')
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
        sessionStorage.removeItem('pendingApply')
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

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8">
      {!applied ? (
        <>
          <h3 className="font-semibold text-lg text-slate-800 mb-4">
            {userId ? 'Apply for this job' : 'Want to apply?'}
          </h3>
          <label htmlFor="job-proposal" className="sr-only">Your proposal</label>
          <textarea
            id="job-proposal"
            value={proposal}
            onChange={e => setProposal(e.target.value)}
            placeholder="Write a short proposal explaining why you're a good fit for this job..."
            className="w-full border border-slate-200 rounded-2xl p-4 h-32 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          />
          {applyError && (
            <p className="mt-2 text-sm text-red-600" role="alert">{applyError}</p>
          )}
          <button
            onClick={handleApply}
            disabled={isApplying || !proposal.trim()}
            className="mt-4 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isApplying
              ? 'Submitting...'
              : userId
                ? 'Submit Application'
                : 'Sign In to Apply'
            }
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            {userId
              ? 'By applying, you agree to our Terms of Service.'
              : 'Sign in to submit your application. Your proposal will be saved.'
            }
          </p>
        </>
      ) : (
        <div className="text-center py-6" role="status">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-emerald-700 mb-2">Application submitted!</h3>
          <p className="text-slate-600 text-sm mb-4">The employer will review your proposal and get in touch.</p>
          <Link href="/dashboard/talent" className="text-emerald-600 text-sm font-medium hover:underline">
            View your applications →
          </Link>
        </div>
      )}
    </div>
  )
}
