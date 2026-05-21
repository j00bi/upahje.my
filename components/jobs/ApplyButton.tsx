'use client'

import { useState } from 'react'
import { applyToJob } from '@/app/actions/apply'

export function ApplyButton({ jobId }: { jobId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await applyToJob(jobId, message)

    if (result.success) {
      setStatus('success')
      setTimeout(() => {
        setIsOpen(false)
        setMessage('')
        setStatus('idle')
      }, 1500)
    } else {
      setStatus('error')
    }

    setIsSubmitting(false)
  }

  if (status === 'success') {
    return (
      <div className="flex-1 rounded-full bg-emerald-100 py-3 text-center text-emerald-700 font-semibold">
        Application submitted!
      </div>
    )
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 rounded-full bg-emerald-700 py-3 text-white font-semibold hover:bg-emerald-800"
      >
        Apply Now
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a short message to the employer..."
        className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        rows={4}
        required
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="flex-1 rounded-full border border-slate-300 py-3 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-emerald-700 py-3 text-white font-semibold disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
