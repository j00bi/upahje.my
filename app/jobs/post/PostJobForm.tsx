'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'
import type { Track } from '@/lib/domain'

interface PostJobFormProps {
  session?: { user: { id: string } } | null
  onSuccess?: (jobId: string) => void
}

export function PostJobForm({ session, onSuccess }: PostJobFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    location: '',
    rateMin: '',
    rateMax: '',
    track: 'LABOUR' as Track,
  })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const isValid = form.title.trim().length >= 3 && form.categoryId && form.location.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    // If not authenticated, redirect to sign-in preserving form intent
    if (!session) {
      sessionStorage.setItem('pendingJobPost', JSON.stringify(form))
      router.push('/auth/signin?callbackUrl=/jobs/post')
      return
    }

    setLoading(true)
    setError(null)

    const rate = form.rateMin && form.rateMax
      ? `RM${form.rateMin} – RM${form.rateMax}`
      : form.rateMin ? `RM${form.rateMin}+` : 'Negotiable'

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          categoryId: form.categoryId,
          location: form.location.trim(),
          rateMin: form.rateMin,
          rateMax: form.rateMax,
          track: form.track,
          rate,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        onSuccess?.(data.jobId)
        router.push(`/jobs/${data.jobId}`)
      } else if (res.status === 401) {
        // Token expired or session lost
        sessionStorage.setItem('pendingJobPost', JSON.stringify(form))
        router.push('/auth/signin?callbackUrl=/jobs/post')
      } else {
        setError(data.error ?? 'Failed to post job. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const categories = form.track === 'LABOUR' ? LABOUR_CATEGORIES : TECHNICAL_CATEGORIES

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Track selector */}
      <div className="flex gap-3">
        {(['LABOUR', 'TECHNICAL'] as Track[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => update('track', t)}
            className={`flex-1 py-3 rounded-2xl border-2 text-sm font-medium transition ${
form.track === t
                    ? 'border-teal-600 bg-teal-50 text-teal-800'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            {t === 'LABOUR' ? '🛠️ Labour' : '💻 Technical'}
          </button>
        ))}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Job title *</label>
        <input
          type="text"
          value={form.title}
          onChange={e => update('title', e.target.value)}
          placeholder="e.g. Need grass cutter this Saturday"
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          maxLength={120}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Category *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => update('categoryId', cat.id)}
              className={`p-3 rounded-2xl border text-sm text-left transition ${
                form.categoryId === cat.id
                  ? 'border-teal-500 bg-teal-50 text-teal-800 font-medium'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="ml-1.5">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
        <input
          type="text"
          value={form.location}
          onChange={e => update('location', e.target.value)}
          placeholder="e.g. Kajang, Selangor"
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          required
        />
      </div>

      {/* Budget range */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Budget (RM, optional)</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              value={form.rateMin}
              onChange={e => update('rateMin', e.target.value)}
              placeholder="Min"
              min="0"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="number"
              value={form.rateMax}
              onChange={e => update('rateMax', e.target.value)}
              placeholder="Max"
              min="0"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (optional)</label>
        <textarea
          value={form.description}
          onChange={e => update('description', e.target.value)}
          placeholder="Describe the job, requirements, what's included, any special notes..."
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          maxLength={1000}
        />
        <p className="mt-1 text-xs text-slate-400 text-right">{form.description.length}/1000</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl transition disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Posting...' : 'Post Job'}
      </button>

      <p className="text-center text-xs text-slate-400">
        {session ? 'Your job will be visible immediately after posting.' : 'You\'ll be asked to sign in before we post your job.'}
      </p>
    </form>
  )
}