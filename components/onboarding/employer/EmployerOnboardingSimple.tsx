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

const INDUSTRIES = [
  'Food & Beverage', 'Retail & E-commerce', 'Technology & IT',
  'Construction & Property', 'Education & Training', 'Healthcare & Wellness',
  'Creative & Media', 'Logistics & Transport', 'Hospitality & Tourism',
  'Finance & Insurance', 'Manufacturing', 'Other',
]

const SIZES = [
  'Just me (solo)',
  '2–10 (micro)',
  '11–50 (small)',
  '51–200 (medium)',
  '201+ (large)',
]

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
    if (step < 4) {
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
          <div className="inline-flex items-center gap-1.5 bg-green-soft text-green-forest px-3 py-1 rounded-full text-xs font-black mb-3">
            <Zap className="w-3.5 h-3.5" /> QUICK START
          </div>
          <h2 className="text-2xl font-black">Start hiring in 60 seconds</h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">Fill the minimum. Complete your company profile later.</p>
        </div>

        <div className="bg-white border rounded-3xl p-7 space-y-5">
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-1.5 font-bold">Company name</div>
            <input
              value={data.company || ''}
              onChange={e => update('company', e.target.value)}
              className="w-full text-xl border-b pb-2 focus:outline-none font-bold"
              placeholder="e.g. Kedai Kopi KL"
            />
          </div>
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-1.5 font-bold">Your name / PIC</div>
            <input
              value={data.contactName || ''}
              onChange={e => update('contactName', e.target.value)}
              className="w-full text-xl border-b pb-2 focus:outline-none font-bold"
              placeholder="Ali bin Ahmad"
            />
          </div>
        </div>

        <div className="mt-5 text-xs bg-white border p-3 rounded-2xl flex gap-2 text-slate-600 font-medium">
          <Clock className="w-4 h-4 mt-px" />
          You can add company details and post jobs from your dashboard. No rush.
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button onClick={onBack} className="py-3.5 border rounded-2xl font-bold">Back</button>
          <button
            onClick={() => onComplete?.({ ...data })}
            disabled={!data.company || !data.contactName}
            className="py-3.5 bg-green-mid text-white rounded-2xl font-black flex items-center justify-center gap-2 disabled:bg-gray-300"
          >
            Go live now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button onClick={() => setMode('full')} className="text-xs font-bold text-slate-500 underline mt-4 block mx-auto">
          Or complete full company profile instead
        </button>
      </div>
    )
  }

  // Full path: 4-step form (step 4 = optional job posting)
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-500 mb-1 font-bold">
          <div>Employer • Full Setup</div>
          <div>Step {step}/4</div>
        </div>
        <div className="h-1 bg-gray-200 rounded"><div className="h-1 bg-green-mid rounded" style={{width: `${(step/4)*100}%`}} /></div>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-black text-xl mb-1">Tell us about your company</h3>
            <p className="text-sm text-slate-600 font-medium">This helps talents know who they&apos;re working with.</p>
          </div>
          <div>
            <input
              placeholder="Company name"
              className={`w-full border rounded-2xl px-5 py-3.5 text-lg font-bold ${errors.company ? 'border-red-500' : ''}`}
              value={data.company || ''}
              onChange={e => update('company', e.target.value)}
            />
            {errors.company && <p className="text-red-500 text-sm mt-1 ml-1 font-bold">{errors.company}</p>}
          </div>
          <div>
            <input
              placeholder="Your name / PIC"
              className={`w-full border rounded-2xl px-5 py-3.5 font-bold ${errors.contactName ? 'border-red-500' : ''}`}
              value={data.contactName || ''}
              onChange={e => update('contactName', e.target.value)}
            />
            {errors.contactName && <p className="text-red-500 text-sm mt-1 ml-1 font-bold">{errors.contactName}</p>}
          </div>
          <div>
            <input
              placeholder="Company location (e.g. Kuala Lumpur)"
              className="w-full border rounded-2xl px-5 py-3.5 font-bold"
              value={data.location || ''}
              onChange={e => update('location', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <select
                className="w-full border rounded-2xl px-5 py-3.5 font-bold text-sm"
                value={data.industry || ''}
                onChange={e => update('industry', e.target.value)}
              >
                <option value="">Industry</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <select
                className="w-full border rounded-2xl px-5 py-3.5 font-bold text-sm"
                value={data.companySize || ''}
                onChange={e => update('companySize', e.target.value)}
              >
                <option value="">Company size</option>
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-black text-xl mb-2">What kind of work do you usually need?</h3>
          <p className="text-sm text-slate-600 mb-4 font-medium">Select all that apply. We will show you the right talent pool.</p>
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
          <h3 className="font-black text-xl">Almost ready to post your first job</h3>
          <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl text-sm font-medium">
            You&apos;ll be able to post jobs immediately after this. We recommend starting with 1-2 clear job posts so talents can see your activity.
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 font-bold block">Rough monthly hiring volume (optional)</label>
            <select className="w-full border rounded-2xl px-5 py-3 font-bold" value={data.volume || ''} onChange={e => update('volume', e.target.value)}>
              <option value="">Select...</option>
              <option>1–2 jobs per month</option>
              <option>3–5 jobs per month</option>
              <option>6+ jobs per month (regular hirer)</option>
            </select>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="font-black text-xl">Post your first job?</h3>
              <p className="text-sm text-slate-600 font-medium mt-1">Skip this and do it later from your dashboard.</p>
            </div>
            <span className="text-xs bg-green-soft text-green-forest px-3 py-1 rounded-full font-bold">Optional</span>
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-1 font-bold block">Job title</label>
            <input
              placeholder="e.g. Cleaner needed in Cheras"
              className="w-full border rounded-2xl px-5 py-3.5 font-bold"
              value={data.jobTitle || ''}
              onChange={e => update('jobTitle', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 font-bold block">Budget</label>
              <input
                placeholder="RM 200–400"
                className="w-full border rounded-2xl px-5 py-3 font-bold"
                value={data.budget || ''}
                onChange={e => update('budget', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 font-bold block">When needed</label>
              <select
                className="w-full border rounded-2xl px-5 py-3 font-bold text-sm"
                value={data.when || ''}
                onChange={e => update('when', e.target.value)}
              >
                <option value="">Select...</option>
                <option>This week</option>
                <option>Next week</option>
                <option>This month</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.fastPost || false}
              onChange={e => update('fastPost', e.target.checked)}
              className="w-5 h-5 accent-green-mid rounded"
            />
            <span className="text-sm font-bold text-slate-700">Post to all matching categories at once</span>
          </label>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button onClick={back} className="flex-1 py-3 border rounded-2xl font-bold">Back</button>
        <button
          onClick={next}
          disabled={step === 1 && (!data.company || !data.contactName)}
          className="flex-1 py-3 bg-green-mid text-white font-black rounded-2xl disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {step === 4 && data.jobTitle
            ? 'Create Account & Post Job'
            : step === 3 && !data.jobTitle
              ? 'Create Employer Account'
              : 'Continue'}
        </button>
      </div>
      <p className="text-center text-[10px] text-slate-400 mt-3 font-bold">Step {data.jobTitle ? 4 : 3} of 4 — You&apos;re ready to hire</p>
    </div>
  )
}
