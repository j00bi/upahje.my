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

type OnboardingFlowProps = {
  initialRole?: 'employer' | 'talent' | null
  nextPath?: string
}

export function OnboardingFlow({
  initialRole = null,
  nextPath = '/dashboard',
}: OnboardingFlowProps) {
  const [step, setStep] = useState<Step>(
    initialRole === 'employer'
      ? 'profile'
      : initialRole === 'talent'
        ? 'track'
        : 'role',
  )
  const [role, setRole] = useState<'employer' | 'talent' | null>(initialRole)
  const [track, setTrack] = useState<Track | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const finishAuthentication = () => {
    const completeUrl = new URL('/auth/complete', window.location.origin)
    completeUrl.searchParams.set('next', nextPath)
    window.location.href = `${completeUrl.pathname}${completeUrl.search}`
  }

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
    if (!track || submitting) return
    setSubmitting(true)
    setSubmitError(null)
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
        finishAuthentication()
      } else {
        const error = await response.json()
        setSubmitError(error.error || 'Failed to save profile')
      }
    } catch {
      setSubmitError('Something went wrong while saving your profile. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEmployerComplete = async (empData: EmployerOnboardingData) => {
    if (submitting) return
    setSubmitting(true)
    setSubmitError(null)
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
        finishAuthentication()
      } else {
        const error = await response.json()
        setSubmitError(error.error || 'Failed to save profile')
      }
    } catch {
      setSubmitError('An error occurred while saving your profile. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {submitError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {submitError}
        </div>
      )}
      {submitting && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
          Saving your profile…
        </div>
      )}
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
                  ? 'border-green-mid/30 bg-green-soft text-green-mid'
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
                className="p-6 rounded-3xl border-2 text-left transition hover:border-green-mid/40 active:scale-[0.985] border-slate-200 hover:bg-green-soft"
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
