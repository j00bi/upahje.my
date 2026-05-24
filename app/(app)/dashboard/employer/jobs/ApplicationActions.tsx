'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ApplicationActionsProps {
  applicationId: string
  currentStatus: string
  jobStatus: string
}

const actions = [
  { action: 'review', label: 'Mark reviewed', className: 'border-blue-200 text-blue-700 hover:bg-blue-50' },
  { action: 'accept', label: 'Accept', className: 'border-teal-200 text-teal-700 hover:bg-teal-50' },
  { action: 'reject', label: 'Reject', className: 'border-slate-200 text-slate-700 hover:bg-slate-50' },
]

export function ApplicationActions({ applicationId, currentStatus, jobStatus }: ApplicationActionsProps) {
  const router = useRouter()
  const [pendingAction, setPendingAction] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function updateApplication(action: string) {
    setPendingAction(action)
    setError(null)

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) {
        const payload = await response.json()
        setError(payload.error ?? 'Failed to update application.')
        return
      }

      router.refresh()
    } catch {
      setError('Failed to update application.')
    } finally {
      setPendingAction(null)
    }
  }

  const isClosed = jobStatus !== 'OPEN' || currentStatus === 'ACCEPTED' || currentStatus === 'REJECTED' || currentStatus === 'WITHDRAWN'

  return (
    <div className="flex flex-col items-start gap-2 lg:items-end">
      <div className="flex flex-wrap gap-2">
        {actions.map((item) => (
          <button
            key={item.action}
            type="button"
            disabled={Boolean(pendingAction) || isClosed || (item.action === 'review' && currentStatus === 'REVIEWED')}
            onClick={() => updateApplication(item.action)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${item.className}`}
          >
            {pendingAction === item.action ? 'Saving...' : item.label}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
