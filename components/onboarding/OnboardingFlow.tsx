'use client'

import { useState } from 'react'
import { RoleSelector } from './RoleSelector'
import { TrackSelector } from './TrackSelector'
import type { Track } from '@/lib/domain'

type Step = 'role' | 'track' | 'profile'

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<'employer' | 'talent' | null>(null)
  const [track, setTrack] = useState<Track | null>(null)

  const handleRoleSelect = (selectedRole: 'employer' | 'talent') => {
    setRole(selectedRole)
    setStep('track')
  }

  const handleTrackSelect = (selectedTrack: Track) => {
    setTrack(selectedTrack)
    setStep('profile')
  }

  const goBack = () => {
    if (step === 'track') setStep('role')
    if (step === 'profile') setStep('track')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        {['Role', 'Track', 'Profile'].map((label, index) => {
          const current =
            (index === 0 && step === 'role') ||
            (index === 1 && step === 'track') ||
            (index === 2 && step === 'profile')

          return (
            <div
              key={label}
              className={`flex flex-1 items-center gap-2 rounded-2xl border px-3 py-2 text-sm ${
                current
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
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

        {step === 'track' && role && (
          <div>
            <TrackSelector role={role} onSelect={handleTrackSelect} />
            <button
              onClick={goBack}
              className="mt-6 text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              ← Back
            </button>
          </div>
        )}

        {step === 'profile' && (
          <div className="text-center">
            <p className="mb-2 text-sm font-medium text-slate-900">
              {role === 'talent' ? 'Talent profile setup' : 'Employer profile setup'}
            </p>
            <p className="mb-4 text-sm leading-6 text-slate-600">
              Profile step coming soon. This is where Grok&apos;s Best-of-N variants will be plugged in.
            </p>
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-slate-500">
              Selected track: {track ?? 'none'}
            </p>
            <button
              onClick={goBack}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
