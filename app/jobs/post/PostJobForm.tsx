'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function PostJobForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rate: '',
    location: '',
    track: 'LABOUR',
    categoryId: 'cm1234567890', // placeholder - should come from DB in real app
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // For now, we use a placeholder employerId
      // In a real app, this would come from the logged-in user's Employer record
      const { error: insertError } = await supabase.from('Job').insert({
        title: formData.title,
        description: formData.description,
        rate: formData.rate,
        location: formData.location,
        track: formData.track,
        categoryId: formData.categoryId,
        status: 'OPEN',
        employerId: 'cm_placeholder_employer', // Will be replaced with real logic
      })

      if (insertError) {
        setError(insertError.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/jobs')
        }, 1500)
      }
    } catch (err) {
      setError('Failed to post job. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-2xl font-semibold">Job Posted Successfully!</h2>
        <p className="mt-2 text-slate-600">Redirecting to job board...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200">
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 h-32"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rate / Budget</label>
          <input
            type="text"
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            placeholder="RM 80-120 or RM 150/day"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
            placeholder="Ampang, KL"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Track</label>
        <select
          value={formData.track}
          onChange={(e) => setFormData({ ...formData, track: e.target.value })}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
        >
          <option value="LABOUR">Labour</option>
          <option value="TECHNICAL">Technical</option>
        </select>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-emerald-700 py-3 text-white font-semibold hover:bg-emerald-800 disabled:opacity-50"
      >
        {loading ? 'Posting Job...' : 'Post Job'}
      </button>
    </form>
  )
}