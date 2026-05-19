'use client'

import { useState } from 'react'
import { LABOUR_CATEGORIES, type LabourCategoryId } from '@/lib/domain'

interface JobFormData {
  title: string
  description: string
  categories: LabourCategoryId[]
  location: string
  rateMin: string
  rateMax: string
}

export function PostJobForm() {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    categories: [],
    location: '',
    rateMin: '',
    rateMax: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleCategory = (id: LabourCategoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter(c => c !== id)
        : [...prev.categories, id]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Job posted successfully!')
        // TODO: Redirect to job detail or dashboard
      } else {
        alert('Failed to post job')
      }
    } catch {
      console.error('Error posting job')
      alert('Error posting job')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Need a reliable house painter"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Categories (select at least 1)</label>
        <div className="flex flex-wrap gap-2">
          {LABOUR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl border text-sm transition-all ${
                formData.categories.includes(cat.id)
                  ? 'bg-green-600 text-white border-green-600'
                  : 'border-gray-300 hover:border-green-600'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Kajang, Selangor"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Rate Min (RM)</label>
            <input
              type="number"
              value={formData.rateMin}
              onChange={e => setFormData({ ...formData, rateMin: e.target.value })}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="80"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rate Max (RM)</label>
            <input
              type="number"
              value={formData.rateMax}
              onChange={e => setFormData({ ...formData, rateMax: e.target.value })}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="150"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Job Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full border rounded-2xl px-4 py-3 h-32"
          placeholder="Describe the job requirements, timeline, and any specific skills needed..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || formData.categories.length === 0}
        className="w-full py-4 bg-green-600 text-white font-semibold rounded-3xl disabled:bg-gray-300"
      >
        {isSubmitting ? 'Posting Job...' : 'Post Job'}
      </button>
    </form>
  )
}
