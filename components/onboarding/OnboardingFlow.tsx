'use client'

import { useState } from 'react'
import { RoleSelector } from './RoleSelector'
import { TrackSelector } from './TrackSelector'
import type { Track } from '@/lib/domain'
import { LabourOnboardingStepper } from './labour/LabourOnboardingStepper'
import { LabourOnboardingCards } from './labour/LabourOnboardingCards'
import { LabourOnboardingChat } from './labour/LabourOnboardingChat'
import { LabourOnboardingHybrid } from './labour/LabourOnboardingHybrid'

import { TechnicalOnboardingStepper } from './technical/TechnicalOnboardingStepper'
import { TechnicalOnboardingShowcase } from './technical/TechnicalOnboardingShowcase'
import { TechnicalOnboardingProForm } from './technical/TechnicalOnboardingProForm'

import { EmployerOnboardingSimple } from './employer/EmployerOnboardingSimple'
import { EmployerOnboardingVisual } from './employer/EmployerOnboardingVisual'
import { EmployerOnboardingPostFirst } from './employer/EmployerOnboardingPostFirst'
import { HermesEvaluation } from './HermesEvaluation'
import type {
  EmployerOnboardingData,
  LabourOnboardingData,
  TechnicalOnboardingData,
} from './shared'

type Step = 'role' | 'track' | 'profile'

const labourVariants = [
  { id: 'A', name: 'Stepper (Wizard)', comp: 'LabourOnboardingStepper', desc: 'Classic 7-step linear wizard. Clear progress. Best for first-timers.' },
  { id: 'B', name: 'Cards (Progressive)', comp: 'LabourOnboardingCards', desc: 'Expandable visual cards. Reveal at your pace. Great on mobile.' },
  { id: 'C', name: 'Chat (Conversational)', comp: 'LabourOnboardingChat', desc: 'Feels like texting a helpful assistant. Low friction, fun.' },
  { id: 'D', name: 'Hybrid (Quick First)', comp: 'LabourOnboardingHybrid', desc: 'Go live in 60s, finish profile later. Fastest path to visibility.' },
] as const

type LabourVariantId = (typeof labourVariants)[number]['id']

const employerVariants = [
  { id: 'E1', name: 'Simple 3-step', desc: 'Classic wizard. Company → Needs → Volume' },
  { id: 'E2', name: 'Visual Picker', desc: 'See all categories first, very fast' },
  { id: 'E3', name: 'Post Job First', desc: 'Ultra-fast: post a job → account created' },
] as const

type EmployerVariantId = (typeof employerVariants)[number]['id']

const technicalVariants = [
  { id: 'A', name: 'Stepper (Guided)', desc: '6-step professional wizard. Portfolio early, skills grid, beautiful rate tiers, cert selector + review step.' },
  { id: 'B', name: 'Showcase (Accordion)', desc: 'Portfolio-first expandable sections. Full control. Ideal for designers & developers.' },
  { id: 'C', name: 'ProForm + Sidebar', desc: 'Single-page form + real-time live preview card. What employers see = exactly what you edit. Strong favorite.' },
] as const

type TechnicalVariantId = (typeof technicalVariants)[number]['id']

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<'employer' | 'talent' | null>(null)
  const [track, setTrack] = useState<Track | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<LabourVariantId | TechnicalVariantId>('D')
  const [employerVariant, setEmployerVariant] = useState<EmployerVariantId | null>(null)

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
    if (step === 'profile') {
      setStep('track')
      setSelectedVariant(null)
      setEmployerVariant(null)
    }
  }

  const handleProfileComplete = (profileData: LabourOnboardingData | TechnicalOnboardingData) => {
    console.log('[Best-of-N] Labour profile completed via variant:', selectedVariant, profileData)
    alert(`✅ Labour ${selectedVariant} variant captured!\n\nIn production this would create the Talent + Profile records via Prisma/Supabase and redirect to the dashboard.`)
  }

  const handleEmployerComplete = (empData: EmployerOnboardingData) => {
    console.log('[Best-of-N] Employer profile via', employerVariant, empData)
    alert(`✅ Employer flow ${employerVariant} captured! Company: ${empData.company || empData.jobTitle}\n\nWould create Employer + first Job (if fast path) and go to dashboard.`)
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

        {/* === LABOUR TALENT (Best-of-N live preview) === */}
        {step === 'profile' && track === 'LABOUR' && role === 'talent' && (
          <div>
            <div className="text-center mb-6">
              <div className="inline text-xs font-semibold tracking-[1px] bg-green-100 text-green-800 px-3 py-px rounded">BEST-OF-N PREVIEW</div>
              <h3 className="text-xl font-semibold mt-2">Choose your preferred Labour onboarding experience</h3>
              <p className="text-sm text-gray-600 mt-1">Hermes + Grok will pick the winner. Click any card to preview the full flow.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {labourVariants.map(v => (
                <button 
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`text-left p-5 rounded-3xl border-2 transition-all hover:border-green-600 active:scale-[0.985] ${selectedVariant === v.id ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="font-semibold text-lg flex items-baseline gap-2">{v.name} <span className="text-xs font-mono text-green-700">v{v.id}</span></div>
                  <div className="text-sm text-gray-600 mt-1 leading-snug">{v.desc}</div>
                </button>
              ))}
            </div>

            {/* Live Preview Area */}
            <div className="border-t pt-8">
              {!selectedVariant && (
                <p className="text-center text-sm text-gray-500">Select a variant above to try the live flow →</p>
              )}
              {selectedVariant === 'A' && <LabourOnboardingStepper onComplete={handleProfileComplete} onBack={goBack} />}
              {selectedVariant === 'B' && <LabourOnboardingCards onComplete={handleProfileComplete} onBack={goBack} />}
              {selectedVariant === 'C' && <LabourOnboardingChat onComplete={handleProfileComplete} onBack={goBack} />}
              {selectedVariant === 'D' && <LabourOnboardingHybrid onComplete={handleProfileComplete} onBack={goBack} />}
            </div>

            {/* Hermes Evaluation Panel (Track B - parallel work) */}
            <div className="mt-8 pt-6 border-t">
              <div className="text-[10px] uppercase tracking-[1px] text-amber-600 font-medium mb-2">For Hermes — Evaluation Surface (Work in Progress)</div>
              <HermesEvaluation />
            </div>
          </div>
        )}

        {/* === EMPLOYER (Best-of-N live preview) === */}
        {step === 'profile' && role === 'employer' && (
          <div>
            <div className="text-center mb-6">
              <div className="inline text-xs font-semibold tracking-[1px] bg-blue-100 text-blue-800 px-3 py-px rounded">BEST-OF-N • EMPLOYER</div>
              <h3 className="text-xl font-semibold mt-2">Choose how you want to start hiring</h3>
              <p className="text-sm text-gray-600">Short flows optimized for busy clients.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {employerVariants.map(v => (
                <button key={v.id} onClick={() => setEmployerVariant(v.id)} className={`p-4 rounded-3xl border-2 text-left text-sm transition ${employerVariant === v.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                  <div className="font-semibold">{v.name}</div>
                  <div className="text-gray-600 text-xs mt-0.5">{v.desc}</div>
                </button>
              ))}
            </div>

            {!employerVariant && <p className="text-center text-sm text-gray-500">Select a flow above to preview →</p>}
            {employerVariant === 'E1' && <EmployerOnboardingSimple onComplete={handleEmployerComplete} onBack={goBack} />}
            {employerVariant === 'E2' && <EmployerOnboardingVisual onComplete={handleEmployerComplete} onBack={goBack} />}
            {employerVariant === 'E3' && <EmployerOnboardingPostFirst onComplete={handleEmployerComplete} onBack={goBack} />}
          </div>
        )}

        {/* TECHNICAL Talent Best-of-N (Task 1.2 — 3 professional variants) */}
        {step === 'profile' && track === 'TECHNICAL' && role === 'talent' && (
          <div>
            <div className="text-center mb-6">
              <div className="inline text-xs font-semibold tracking-[1px] bg-violet-100 text-violet-800 px-3 py-px rounded">BEST-OF-N PREVIEW • TASK 1.2</div>
              <h3 className="text-xl font-semibold mt-2">Choose your preferred Technical Talent onboarding</h3>
              <p className="text-sm text-gray-600 mt-1">Professional tone focused on portfolio, multi-select skills, rate tiers &amp; certifications. Live previews.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {technicalVariants.map(v => (
                <button 
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`text-left p-5 rounded-3xl border-2 transition-all hover:border-violet-600 active:scale-[0.985] ${selectedVariant === v.id ? 'border-violet-600 bg-violet-50' : 'border-gray-200'}`}
                >
                  <div className="font-semibold text-lg flex items-baseline gap-2">{v.name} <span className="text-xs font-mono text-violet-700">v{v.id}</span></div>
                  <div className="text-sm text-gray-600 mt-1.5 leading-snug">{v.desc}</div>
                </button>
              ))}
            </div>

            {/* Live Technical Preview */}
            <div className="border-t pt-8">
              {!selectedVariant && (
                <p className="text-center text-sm text-gray-500">Select a Technical variant above to preview the live flow →</p>
              )}
              {selectedVariant === 'A' && <TechnicalOnboardingStepper onComplete={handleProfileComplete} onBack={goBack} />}
              {selectedVariant === 'B' && <TechnicalOnboardingShowcase onComplete={handleProfileComplete} onBack={goBack} />}
              {selectedVariant === 'C' && <TechnicalOnboardingProForm onComplete={handleProfileComplete} onBack={goBack} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
