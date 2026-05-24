'use client'

import { useState } from 'react'
import { CategoryPicker } from '../shared'
import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'
import { Zap, Clock, ArrowRight } from 'lucide-react'
import type { EmployerOnboardingData } from '../shared'

interface EmployerOnboardingSimpleProps {
  onComplete?: (data: EmployerOnboardingData) => void
  onBack?: () => void
}

export function EmployerOnboardingSimple({ onComplete, onBack }: EmployerOnboardingSimpleProps) {
  const [mode, setMode] = useState<'quick' | 'full'>('quick')
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Partial<EmployerOnboardingData>>({
    labourCategories: [],
    techCategories: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = <K extends keyof EmployerOnboardingData>(k: K, v: EmployerOnboardingData[K]) => {
    setData(d => ({ ...d, [k]: v }))
    if (errors[k]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[k]
        return newErrors
      })
    }
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}
    if (currentStep === 1) {
      if (!data.company?.trim()) newErrors.company = 'Company name is required'
      if (!data.contactName?.trim()) newErrors.contactName = 'Contact name is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const next = () => {
    if (!validateStep(step)) return
    if (step < 3) {
      setStep(step + 1)
    } else {
      onComplete?.(data)
    }
  }

  const back = () => {
    setErrors({})
    if (step > 1) {
      setStep(step - 1)
    } else {
      onBack?.()
    }
  }

  // Quick path: just company + name, submit immediately
  if (mode === 'quick') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-black mb-3">
            <Zap className="w-3.5 h-3.5" /> QUICK START
          </div>
          <h2 className="text-2xl font-semibold">Start hiring in 60 seconds</h2>
          <p className="text-sm text-slate-600 mt-1">Fill the minimum. Complete your company profile later.</p>
        </div>

        <div className="bg-white border rounded-3xl p-7 space-y-5">
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-1.5">Company name</div>
            <input
              value={data.company || ''}
              onChange={e => update('company', e.target.value)}
              className="w-full text-xl border-b pb-2 focus:outline-none"
              placeholder="e.g. Kedai Kopi KL"
            />
          </div>
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-1.5">Your name / PIC</div>
            <input
              value={data.contactName || ''}
              onChange={e => update('contactName', e.target.value)}
              className="w-full text-xl border-b pb-2 focus:outline-none"
              placeholder="Ali bin Ahmad"
            />
          </div>
        </div>

        <div className="mt-5 text-xs bg-white border p-3 rounded-2xl flex gap-2 text-slate-600">
          <Clock className="w-4 h-4 mt-px" />
          You can add company details and post jobs from your dashboard. No rush.
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button onClick={onBack} className="py-3.5 border rounded-2xl">Back</button>
          <button
            onClick={() => onComplete?.({ ...data })}
            disabled={!data.company || !data.contactName}
            className="py-3.5 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 disabled:bg-gray-300"
          >
            Go live now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button onClick={() => setMode('full')} className="text-xs font-bold text-gray-500 underline mt-4 block mx-auto">
          Or complete full company profile instead
        </button>
      </div>
    )
  }

  // Full path: 3-step form
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <div>Employer • Full Setup</div>
          <div>Step {step}/3</div>
        </div>
        <div className="h-1 bg-gray-200 rounded"><div className="h-1 bg-blue-600 rounded" style={{width: `${(step/3)*100}%`}} /></div>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-xl mb-1">Tell us about your company</h3>
            <p className="text-sm text-gray-600">This helps talents know who they&apos;re working with.</p>
          </div>
          <div>
            <input
              placeholder="Company name"
              className={`w-full border rounded-2xl px-5 py-3.5 text-lg ${errors.company ? 'border-red-500' : ''}`}
              value={data.company || ''}
              onChange={e => update('company', e.target.value)}
            />
            {errors.company && <p className="text-red-500 text-sm mt-1 ml-1">{errors.company}</p>}
          </div>
          <div>
            <input
              placeholder="Your name / PIC"
              className={`w-full border rounded-2xl px-5 py-3.5 ${errors.contactName ? 'border-red-500' : ''}`}
              value={data.contactName || ''}
              onChange={e => update('contactName', e.target.value)}
            />
            {errors.contactName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.contactName}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-semibold text-xl mb-2">What kind of work do you usually need?</h3>
          <p className="text-sm text-gray-600 mb-4">Select all that apply. We will show you the right talent pool.</p>
          <CategoryPicker
            track="BOTH"
            selected={[...(data.labourCategories || []), ...(data.techCategories || [])]}
            onChange={(sel) => {
              const labourIds = sel.filter(id => LABOUR_CATEGORIES.some(c => c.id === id))
              const techIds = sel.filter(id => TECHNICAL_CATEGORIES.some(c => c.id === id))
              update('labourCategories', labourIds)
              update('techCategories', techIds)
            }}
            max={8}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h3 className="font-semibold text-xl">Almost ready to post your first job</h3>
          <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl text-sm">
            You&apos;ll be able to post jobs immediately after this. We recommend starting with 1-2 clear job posts so talents can see your activity.
          </div>
          <div>
            <label className="text-sm text-gray-500">Rough monthly hiring volume (optional)</label>
            <select className="w-full border rounded-2xl px-5 py-3 mt-1" value={data.volume || ''} onChange={e => update('volume', e.target.value)}>
              <option value="">Select...</option>
              <option>1–2 jobs per month</option>
              <option>3–5 jobs per month</option>
              <option>6+ jobs per month (regular hirer)</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button onClick={back} className="flex-1 py-3 border rounded-2xl">Back</button>
        <button
          onClick={next}
          disabled={step === 1 && (!data.company || !data.contactName)}
          className="flex-1 py-3 bg-blue-600 text-white font-black rounded-2xl disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {step === 3 ? 'Create Employer Account' : 'Continue'}
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-3">Step 3 of 3 — You're ready to hire</p>
    </div>
  )
}
