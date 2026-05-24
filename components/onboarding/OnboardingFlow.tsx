'use client'

import { useState } from 'react'
import { RoleSelector } from './RoleSelector'
import type { Track } from '@/lib/domain'
import { LabourOnboardingHybrid } from './labour/LabourOnboardingHybrid'
import { TechnicalOnboardingShowcase } from './technical/TechnicalOnboardingShowcase'
import { EmployerOnboardingSimple } from './employer/EmployerOnboardingSimple'
import type {
  EmployerOnboardingData,
  LabourOnboardingData,
  TechnicalOnboardingData,
} from './shared'

type Step = 'role' | 'track' | 'profile'

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<'employer' | 'talent' | null>(null)
  const [track, setTrack] = useState<Track | null>(null)

  const handleRoleSelect = (selectedRole: 'employer' | 'talent') => {
    setRole(selectedRole)
    if (selectedRole === 'employer') {
      setStep('profile')
    } else {
      setStep('track')
    }
  }

  const handleTrackSelect = (selectedTrack: Track) => {
    setTrack(selectedTrack)
    setStep('profile')
  }

  const goBack = () => {
    if (step === 'track') setStep('role')
    if (step === 'profile') {
      setStep(role === 'employer' ? 'role' : 'track')
    }
  }

  const handleProfileComplete = async (profileData: LabourOnboardingData | TechnicalOnboardingData) => {
    console.log('[Onboarding] Profile completed:', track, profileData)

    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'TALENT',
          track: track,
          variant: track === 'LABOUR' ? 'D' : 'B',
          data: profileData,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Profile saved successfully:', result)
        window.location.href = '/dashboard/talent'
      } else {
        const error = await response.json()
        alert(`Failed to save profile: ${error.error || 'Unknown error'}`)
      }
    } catch {
      console.error('Error saving profile:')
      alert('Something went wrong while saving your profile. Please try again.')
    }
  }

  const handleEmployerComplete = async (empData: EmployerOnboardingData) => {
    console.log('[Onboarding] Employer profile:', empData)

    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'EMPLOYER',
          variant: 'E1',
          data: empData,
        }),
      })

      if (response.ok) {
        window.location.href = '/dashboard/employer'
      } else {
        const error = await response.json()
        alert(`Error: ${error.message || 'Failed to save profile'}`)
      }
    } catch {
      console.error('Error saving profile:')
      alert('An error occurred while saving your profile. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        {(role === 'employer' ? ['Role', 'Profile'] : ['Role', 'Track', 'Profile']).map((label, index) => {
          const current =
            (index === 0 && step === 'role') ||
            (index === 1 && role === 'employer' && step === 'profile') ||
            (index === 1 && step === 'track') ||
            (index === 2 && step === 'profile')

          return (
            <div
              key={label}
              className={`flex flex-1 items-center gap-2 rounded-2xl border px-3 py-2 text-sm ${
                current
                  ? 'border-teal-500/30 bg-teal-50 text-teal-700'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-900 shadow-sm">
                {index + 1}
              </span>
              <span className="font-medium">{label}</span>
            </div>
          )
        })}
      </div>

      <div className="rounded-[1.25rem] border border-slate-200 bg-white/80 p-5">
        {step === 'role' && <RoleSelector onSelect={handleRoleSelect} />}

        {step === 'track' && role === 'talent' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose your category</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleTrackSelect('LABOUR')}
                className="p-6 rounded-3xl border-2 text-left transition hover:border-teal-400 active:scale-[0.985] border-slate-200 hover:bg-teal-50"
              >
                <span className="text-3xl block mb-2">🛠️</span>
                <div className="font-semibold">Labour</div>
                <div className="text-sm text-slate-600">Offer services like cleaning, gardening, delivery, etc.</div>
              </button>
              <button
                onClick={() => handleTrackSelect('TECHNICAL')}
                className="p-6 rounded-3xl border-2 text-left transition hover:border-violet-400 active:scale-[0.985] border-slate-200 hover:bg-violet-50"
              >
                <span className="text-3xl block mb-2">💻</span>
                <div className="font-semibold">Technical</div>
                <div className="text-sm text-slate-600">Offer skills like web dev, design, marketing, writing</div>
              </button>
            </div>
            <button onClick={goBack} className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-700">
              ← Back
            </button>
          </div>
        )}

        {/* === LABOUR TALENT — Winner D (Hybrid/Quick First) === */}
        {step === 'profile' && track === 'LABOUR' && role === 'talent' && (
          <LabourOnboardingHybrid onComplete={handleProfileComplete} onBack={goBack} />
        )}

        {/* === TECHNICAL TALENT — Winner B+A (Showcase + Stepper hybrid) === */}
        {step === 'profile' && track === 'TECHNICAL' && role === 'talent' && (
          <TechnicalOnboardingShowcase onComplete={handleProfileComplete} onBack={goBack} />
        )}

        {/* === EMPLOYER — Winner E1 (Simple 3-step) === */}
        {step === 'profile' && role === 'employer' && (
          <EmployerOnboardingSimple onComplete={handleEmployerComplete} onBack={goBack} />
        )}
      </div>
    </div>
  )
}
