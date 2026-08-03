'use client'

import { useState } from 'react'
import { CategoryPicker } from '../shared'
import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'
import type { EmployerOnboardingData } from '../shared'

interface EmployerOnboardingSimpleProps {
  onComplete?: (data: EmployerOnboardingData) => void
  onBack?: () => void
}

export function EmployerOnboardingSimple({ onComplete, onBack }: EmployerOnboardingSimpleProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Partial<EmployerOnboardingData>>({
    labourCategories: [],
    techCategories: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = <K extends keyof EmployerOnboardingData>(k: K, v: EmployerOnboardingData[K]) => {
    setData(d => ({ ...d, [k]: v }))
    // Clear error when user starts typing
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
      if (!data.email?.trim()) {
        newErrors.email = 'Business email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
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

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <div>Employer • Quick Setup</div>
          <div>Step {step}/3</div>
        </div>
        <div className="h-1 bg-gray-200 rounded"><div className="h-1 bg-green-mid rounded" style={{width: `${(step/3)*100}%`}} /></div>
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
          <div>
            <input
              placeholder="Business email"
              type="email"
              className={`w-full border rounded-2xl px-5 py-3.5 ${errors.email ? 'border-red-500' : ''}`}
              value={data.email || ''}
              onChange={e => update('email', e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
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
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl text-sm">
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
          disabled={step === 1 && (!data.company || !data.contactName || !data.email)}
          className="flex-1 py-3 bg-green-mid text-white font-medium rounded-2xl disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {step === 3 ? 'Create Employer Account' : 'Continue'}
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-3">Step 3 of 3 — You&apos;re ready to hire</p>
    </div>
  )
}
