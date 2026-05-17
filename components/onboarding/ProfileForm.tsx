'use client'

import { useState } from 'react'

export interface ProfileFormData {
  fullName: string
  phone: string
  bio: string
  rate: string
  location: string
}

interface ProfileFormProps {
  role: 'employer' | 'talent'
  track: 'LABOUR' | 'TECHNICAL'
  onComplete?: (data: ProfileFormData) => void
}

export function ProfileForm({ role, track, onComplete }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    phone: '',
    bio: '',
    rate: '',
    location: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onComplete) {
      onComplete(formData)
    }
  }

  const isLabour = track === 'LABOUR'

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="012-345 6789"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Kuala Lumpur, Ampang"
          required
        />
      </div>

      {role === 'talent' && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Rate</label>
            <input
              type="text"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
              placeholder={isLabour ? "RM 40–60 per job" : "RM 80–120 / hr"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio / About You</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 h-24"
              placeholder="Tell clients about your experience..."
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </form>
  )
}
