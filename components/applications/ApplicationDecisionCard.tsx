'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ApplicationDecisionCardProps {
  applicationId: string
  applicantName: string
  proposal: string | null
  submittedAt: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN'
  score: number
  reasons: string[]
}

const statusStyles = {
  PENDING: 'bg-amber-100 text-amber-900',
  ACCEPTED: 'bg-emerald-100 text-emerald-900',
  REJECTED: 'bg-rose-100 text-rose-900',
  WITHDRAWN: 'bg-slate-100 text-slate-700',
}

export function ApplicationDecisionCard({
  applicationId,
  applicantName,
  proposal,
  submittedAt,
  status,
  score,
  reasons,
}: ApplicationDecisionCardProps) {
  const router = useRouter()
  const [pendingAction, setPendingAction] = useState<'ACCEPT' | 'REJECT' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const decide = async (action: 'ACCEPT' | 'REJECT') => {
    setPendingAction(action)
    setError(null)

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'The application could not be updated.')
        return
      }

      router.refresh()
    } catch {
      setError('The application could not be updated. Please try again.')
    } finally {
      setPendingAction(null)
    }
  }

  return (
    <article
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      data-application-id={applicationId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-950">{applicantName}</h2>
          <p className="mt-1 text-xs text-slate-500">Applied {submittedAt}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm leading-6 text-slate-700">
          {proposal || 'No proposal message was supplied.'}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-900">
          {score}% fit signal
        </span>
        {reasons.map((reason) => (
          <span key={reason} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
            {reason}
          </span>
        ))}
      </div>

      {status === 'PENDING' && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => decide('REJECT')}
            disabled={pendingAction !== null}
            className="min-h-11 rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
          >
            {pendingAction === 'REJECT' ? 'Declining…' : 'Decline'}
          </button>
          <button
            type="button"
            onClick={() => decide('ACCEPT')}
            disabled={pendingAction !== null}
            className="min-h-11 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
          >
            {pendingAction === 'ACCEPT' ? 'Accepting…' : 'Accept applicant'}
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-rose-700" role="alert">{error}</p>}
    </article>
  )
}
