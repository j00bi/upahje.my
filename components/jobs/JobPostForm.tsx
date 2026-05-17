'use client'

import { useState } from 'react'

export interface JobPostData {
  title: string
  description: string
  category: string
  location: string
  budget: string
  track: 'LABOUR' | 'TECHNICAL'
}

interface JobPostFormProps {
  onSubmit?: (data: JobPostData) => void
}

export function JobPostForm({ onSubmit }: JobPostFormProps) {
  const [formData, setFormData] = useState<JobPostData>({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    track: 'LABOUR' as 'LABOUR' | 'TECHNICAL',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Need grass cutter this weekend"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 h-24"
          placeholder="Details about the job..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Rumah & Taman"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Ampang, KL"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Budget</label>
        <input
          type="text"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="RM 80 - 120"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
      >
        Post Job
      </button>
    </form>
  )
}
