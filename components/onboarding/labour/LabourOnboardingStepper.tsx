'use client'

import { useState } from 'react'
import { MyKadUpload } from '../MyKadUpload'
import type { LabourCategoryId } from '@/lib/domain'
import { CategoryPicker } from '../shared'
import { ArrowLeft, ArrowRight, Check, Shield } from 'lucide-react'

interface LabourOnboardingStepperProps {
  onComplete?: (data: LabourOnboardingData) => void
  onBack?: () => void
}

export interface LabourOnboardingData {
  fullName: string
  phone: string
  myKadUploaded: boolean
  location: string
  categories: LabourCategoryId[]
  rate: string
  availability: string
  bio: string
}

const STEPS = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'MyKad Verification' },
  { id: 3, label: 'Location' },
  { id: 4, label: 'Services' },
  { id: 5, label: 'Rate & Availability' },
  { id: 6, label: 'About You' },
  { id: 7, label: 'Review & Finish' },
]

export function LabourOnboardingStepper({ onComplete, onBack }: LabourOnboardingStepperProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<LabourOnboardingData>>({
    categories: [],
    myKadUploaded: false,
  })

  const updateData = (updates: Partial<LabourOnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const next = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      if (onComplete && isComplete(data)) {
        onComplete(data as LabourOnboardingData)
      }
    }
  }

  const back = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else if (onBack) {
      onBack()
    }
  }

  const isComplete = (d: Partial<LabourOnboardingData>): boolean => {
    return !!(d.fullName && d.phone && d.location && (d.categories?.length || 0) > 0 && d.rate && d.availability)
  }



  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Labour Talent Profile</h2>
            <p className="text-sm text-gray-600">Step {currentStep} of {STEPS.length} • Traditional wizard</p>
          </div>
          <div className="text-xs px-3 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
            <Shield className="w-3 h-3" /> Trust & Safety
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          {STEPS.map(s => (
            <div key={s.id} className={s.id === currentStep ? 'font-medium text-green-700' : ''}>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border p-8 min-h-[420px]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">Let&apos;s start with the basics</h3>
              <p className="text-sm text-gray-600">We&apos;ll use this to create your public profile and for job matches.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name (as in MyKad)</label>
              <input 
                type="text" 
                className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                placeholder="Ahmad bin Hassan"
                value={data.fullName || ''}
                onChange={e => updateData({ fullName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">WhatsApp / Phone Number</label>
              <input 
                type="tel" 
                className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                placeholder="012-345 6789"
                value={data.phone || ''}
                onChange={e => updateData({ phone: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1.5">Clients will contact you here. We never share without consent.</p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">Verify your identity</h3>
              <p className="text-sm text-gray-600">Labour roles require MyKad verification for safety and trust. This is required before you can accept jobs.</p>
            </div>
            <MyKadUpload onUpload={() => updateData({ myKadUploaded: true })} />
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
              <div className="flex gap-2">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-green-800">Your privacy is protected</div>
                  <ul className="mt-1 text-green-700 space-y-0.5 text-xs list-disc list-inside">
                    <li>Only used for one-time verification (PDPA compliant)</li>
                    <li>Never shown publicly or to clients</li>
                    <li>Stored encrypted, deleted after 90 days if not needed</li>
                  </ul>
                </div>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-green-600" defaultChecked />
              I consent to MyKad verification for trust & safety purposes
            </label>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">Where are you based?</h3>
              <p className="text-sm text-gray-600">We prioritize local matches (KL + Selangor first). Accurate location = more jobs.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Primary Area / District</label>
              <input 
                type="text" 
                className="w-full border rounded-xl px-4 py-3 text-lg" 
                placeholder="Ampang, Kuala Lumpur"
                value={data.location || ''}
                onChange={e => updateData({ location: e.target.value })}
              />
            </div>
            <div className="text-xs text-gray-500">
              Examples: Bangsar, Petaling Jaya, Shah Alam, Cheras, Subang Jaya
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">What services can you offer?</h3>
            <p className="text-sm text-gray-600 mb-4">Select all that apply. You can change these later.</p>
            <CategoryPicker
              track="LABOUR"
              selected={data.categories || []}
              onChange={(sel) => updateData({ categories: sel as LabourCategoryId[] })}
            />
            <p className="text-xs text-center text-gray-500 mt-4">
              { (data.categories?.length || 0) } selected — more categories = more opportunities
            </p>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">Set your rates & availability</h3>
              <p className="text-sm text-gray-600">Be realistic. Clients filter by price and speed.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Typical Rate (example: RM 40–60 per job)</label>
              <input 
                type="text" 
                className="w-full border rounded-xl px-4 py-3" 
                placeholder="RM 50 / job or RM 35–45/hr"
                value={data.rate || ''}
                onChange={e => updateData({ rate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Availability</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Weekdays only', 'Weekends only', 'Flexible (most days)'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => updateData({ availability: opt })}
                    className={`p-4 rounded-2xl border-2 text-sm font-medium transition ${data.availability === opt ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">Tell clients about yourself</h3>
              <p className="text-sm text-gray-600">Short bio helps you stand out. Mention experience, tools, or why clients choose you.</p>
            </div>
            <textarea 
              className="w-full h-40 border rounded-2xl p-4 resize-y" 
              placeholder="5+ years doing house cleaning and gardening in KL area. I bring my own equipment and always arrive on time."
              value={data.bio || ''}
              onChange={e => updateData({ bio: e.target.value })}
            />
            <div className="text-xs text-gray-500">Tip: 2–4 sentences. Honest profiles get 3× more contacts.</div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Almost there!</h3>
              <p className="text-gray-600 mt-1">Review your details before creating your profile.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-sm space-y-4">
              <div><span className="text-gray-500">Name:</span> <span className="font-medium">{data.fullName || '—'}</span></div>
              <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{data.phone || '—'}</span></div>
              <div><span className="text-gray-500">Location:</span> <span className="font-medium">{data.location || '—'}</span></div>
              <div><span className="text-gray-500">Services:</span> <span className="font-medium">{data.categories?.length || 0} selected</span></div>
              <div><span className="text-gray-500">Rate:</span> <span className="font-medium">{data.rate || '—'}</span></div>
              <div><span className="text-gray-500">Available:</span> <span className="font-medium">{data.availability || '—'}</span></div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-sm text-blue-800">
              By creating this profile you agree to our <a href="#" className="underline">Community Guidelines</a> and consent to background checks for high-trust jobs.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button 
          onClick={back}
          className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button 
          onClick={next}
          disabled={currentStep === 2 && !data.myKadUploaded}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium px-8 py-3 rounded-2xl transition active:scale-[0.985]"
        >
          {currentStep === STEPS.length ? 'Create Profile' : 'Continue'} 
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-4">Version A — Stepper (traditional 7-step wizard)</p>
    </div>
  )
}
