'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function WithdrawApplicationButton({
  applicationId,
}: {
  applicationId: string
}) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const withdraw = async () => {
    setIsPending(true)
    setError(null)

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'WITHDRAW' }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'Could not withdraw the application.')
        return
      }

      router.refresh()
    } catch {
      setError('Could not withdraw the application. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={withdraw}
        disabled={isPending}
        className="text-xs font-semibold text-slate-600 underline-offset-4 hover:text-rose-700 hover:underline disabled:cursor-wait disabled:opacity-60"
      >
        {isPending ? 'Withdrawing…' : 'Withdraw'}
      </button>
      {error && <p className="mt-2 text-xs text-rose-700" role="alert">{error}</p>}
    </div>
  )
}
