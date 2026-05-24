'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LabourProfileForm } from '@/components/profile/LabourProfileForm'

export default function TalentProfilePage() {
  const router = useRouter()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    // Check auth status first
    fetch('/api/auth/role')
      .then(r => {
        if (r.status === 401) {
          router.push('/auth/signin?callbackUrl=/talent/profile')
          return null
        }
        return r.json()
      })
      .then(data => {
        if (!data) return
        // Fetch current profile data
        return fetch('/api/profile/talent')
      })
      .then(r => r?.json())
      .then(data => {
        if (data) {
          setInitialData(data)
        }
        setAuthLoading(false)
        setLoading(false)
      })
      .catch(() => {
        setAuthLoading(false)
        setLoading(false)
      })
  }, [router])

  const handleSave = async (data: any) => {
    const res = await fetch('/api/profile/talent', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to save')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-900">
            Profile
          </span>
          <h1 className="text-2xl font-semibold text-slate-900 mt-3">
            Edit Your Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update your details to get more job offers.
          </p>
        </div>

        <LabourProfileForm
          initialData={initialData}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}
