'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function PostJobForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [employerId, setEmployerId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rate: '',
    location: '',
    track: 'LABOUR',
    categoryId: 'cm_placeholder_category',
  })

  // Get current user's employer record
  useEffect(() => {
    const fetchEmployer = async () => {
      const supabase = createClient()
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Find employer record for this user
      const { data: employer } = await supabase
        .from('Employer')
        .select('id')
        .eq('userId', user.id)
        .single()

      if (employer) {
        setEmployerId(employer.id)
      } else {
        // If no employer record exists, we'll use a placeholder for now
        // In a real app, we would create one during onboarding
        setEmployerId('cm_placeholder_employer')
      }
    }

    fetchEmployer()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!employerId) {
      setError('Please complete your employer profile first.')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from('Job').insert({
        title: formData.title,
        description: formData.description,
        rate: formData.rate,
        location: formData.location,
        track: formData.track,
        categoryId: formData.categoryId,
        status: 'OPEN',
        employerId: employerId,
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
        disabled={loading || !employerId}
        className="w-full rounded-full bg-emerald-700 py-3 text-white font-semibold hover:bg-emerald-800 disabled:opacity-50"
      >
        {loading ? 'Posting Job...' : 'Post Job'}
      </button>

      {!employerId && (
        <p className="text-xs text-center text-slate-500">
          Loading your employer profile...
        </p>
      )}
    </form>
  )
}