'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { validateJobPosting, getValidationErrors } from '@/lib/validation/job'

export default function PostJobForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [employerId, setEmployerId] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rate: '',
    location: '',
    track: 'LABOUR' as 'LABOUR' | 'TECHNICAL',
    categoryId: 'cm_placeholder_category',
  })

  // Get current user's employer record, creating one if it doesn't exist
  useEffect(() => {
    const fetchOrCreateEmployer = async () => {
      const supabase = createClient()

      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        setError('Please log in to post a job.')
        return
      }

      const { user } = await response.json()
      if (!user?.id) {
        setError('Please log in to post a job.')
        return
      }

      // Find employer record for this user
      const { data: employer, error: selectError } = await supabase
        .from('Employer')
        .select('id')
        .eq('userId', user.id)
        .single()

      if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = no rows returned
        setError('Failed to load employer profile. Please try again.')
        return
      }

      if (employer) {
        setEmployerId(employer.id)
      } else {
        // Create employer record if it doesn't exist
        const { data: newEmployer, error: insertError } = await supabase
          .from('Employer')
          .insert({
            userId: user.id,
            company: null,
          })
          .select('id')
          .single()

        if (insertError) {
          setError('Failed to create employer profile. Please try again.')
          return
        }

        if (newEmployer) {
          setEmployerId(newEmployer.id)
        }
      }
    }

    fetchOrCreateEmployer()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    // Clear validation error for this field when user starts typing
    setValidationErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setValidationErrors({})

    if (!employerId) {
      setError('Please complete your employer profile first.')
      setLoading(false)
      return
    }

    // Client-side validation
    const validation = validateJobPosting(formData)
    if (!validation.success) {
      const errors = getValidationErrors(validation)
      setValidationErrors(errors)
      setError('Please fix the validation errors below.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.details) {
          // Server-side validation errors
          setValidationErrors(result.details)
          setError('Please fix the validation errors below.')
        } else {
          setError(result.error || 'Failed to post job. Please try again.')
        }
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/jobs')
      }, 1500)
    } catch {
      setError('Failed to post job. Please check your connection and try again.')
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
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`w-full rounded-xl border px-4 py-2.5 ${
            validationErrors.title ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="e.g., House Cleaning, Web Development"
          required
        />
        {validationErrors.title && (
          <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className={`w-full rounded-xl border px-4 py-2.5 h-32 ${
            validationErrors.description ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="Describe the job requirements, responsibilities, and any specific skills needed..."
          required
        />
        {validationErrors.description && (
          <p className="mt-1 text-sm text-red-500">{validationErrors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rate / Budget</label>
          <input
            type="text"
            value={formData.rate}
            onChange={(e) => handleInputChange('rate', e.target.value)}
            placeholder="RM 80-120 or RM 150/day"
            className={`w-full rounded-xl border px-4 py-2.5 ${
              validationErrors.rate ? 'border-red-500' : 'border-slate-300'
            }`}
            required
          />
          {validationErrors.rate && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.rate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Ampang, KL"
            className={`w-full rounded-xl border px-4 py-2.5 ${
              validationErrors.location ? 'border-red-500' : 'border-slate-300'
            }`}
            required
          />
          {validationErrors.location && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.location}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Track</label>
        <select
          value={formData.track}
          onChange={(e) => handleInputChange('track', e.target.value)}
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
        className="w-full rounded-full bg-emerald-700 py-3 text-white font-semibold hover:bg-emerald-800 disabled:opacity-50 transition-colors"
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
