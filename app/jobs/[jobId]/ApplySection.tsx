'use client'

import { useState, useEffect } from 'react'
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
  const [restoredProposal, setRestoredProposal] = useState(false)

  // Restore pending application from sessionStorage after auth redirect
  useEffect(() => {
    try {
      const pending = sessionStorage.getItem('pendingApply')
      if (pending) {
        const { jobId: savedJobId, proposal: savedProposal } = JSON.parse(pending)
        if (savedJobId === jobId && savedProposal) {
          setProposal(savedProposal)
          setRestoredProposal(true)
          // Show a brief success note
          setTimeout(() => setRestoredProposal(false), 4000)
        }
        sessionStorage.removeItem('pendingApply')
      }
    } catch {
      // Silently fail — sessionStorage might be unavailable
    }
  }, [jobId])

  const handleApply = async () => {
    if (!userId) {
      // Save pending application before redirect
      sessionStorage.setItem('pendingApply', JSON.stringify({ jobId, proposal }))
      router.push(`/auth/signup?callbackUrl=/jobs/${jobId}`)
      return
    }

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
        if (data.code === 'KYC_REQUIRED') {
          setApplyError('Please complete your profile verification (MyKad upload) to apply.') // KYC gate message
        } else {
          setApplyError(data.error ?? 'Failed to submit application.')
        }
      }
    } catch {
      setApplyError('Something went wrong. Please try again.')
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8">
      {!applied ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-slate-800">
              {userId ? 'Apply for this job' : 'Daftar & Mohon kerja ini'}
            </h3>
            {restoredProposal && (
              <span className="text-xs bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full font-medium animate-pulse">
                Proposal dipulihkan
              </span>
            )}
          </div>

          {!userId && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm">
              <p className="font-medium text-amber-800">Buat akaun percuma untuk mohon</p>
              <p className="text-amber-700 mt-1 text-xs">
                Cuma perlu e-mel & kata laluan. Lengkapkan profil nanti.
              </p>
            </div>
          )}

          <textarea
            value={proposal}
            onChange={e => setProposal(e.target.value)}
            placeholder={
              userId
                ? "Write a short proposal explaining why you're a good fit for this job..."
                : "Ceritakan sikit kenapa sesuai dengan kerja ni..."
            }
            className="w-full border border-slate-200 rounded-2xl p-4 h-32 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          />
          {applyError && (
            <p className="mt-2 text-sm text-red-600">{applyError}</p>
          )}
          <button
            onClick={handleApply}
            disabled={isApplying || !proposal.trim()}
            className="mt-4 w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl transition disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isApplying
              ? 'Submitting...'
              : userId
                ? 'Submit Application'
                : 'Daftar & Mohon'
            }
          </button>

          {userId ? (
            <p className="mt-3 text-center text-xs text-slate-400">
              By applying, you agree to our Terms of Service.
            </p>
          ) : (
            <div className="mt-4 space-y-2 text-center text-xs text-slate-400">
              <p>Dengan mendaftar, anda bersetuju dengan{' '}
                <Link href="/terms" className="text-teal-600 hover:underline">Terma</Link>
                {' & '}
                <Link href="/privacy" className="text-teal-600 hover:underline">Dasar Privasi</Link>.
              </p>
              <p className="text-slate-400">
                Sudah ada akaun?{' '}
                <Link href={`/auth/signin?callbackUrl=/jobs/${jobId}`} className="text-teal-600 hover:underline">
                  Log masuk
                </Link>
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-teal-700 mb-2">Application submitted!</h3>
          <p className="text-slate-600 text-sm mb-4">The employer will review your proposal and get in touch.</p>
          <Link href="/dashboard/talent" className="text-teal-600 text-sm font-medium hover:underline">
            View your applications →
          </Link>
        </div>
      )}
    </div>
  )
}
