'use client'

import { useState } from 'react'
import { TECHNICAL_CATEGORIES, type TechnicalCategoryId, TECHNICAL_RATE_TIERS, type TechnicalRateTierId, SUGGESTED_CERTS } from '@/lib/domain'
import { ArrowLeft, ArrowRight, Award, Link as LinkIcon, ShieldCheck } from 'lucide-react'

interface TechnicalOnboardingStepperProps {
  onComplete?: (data: TechnicalOnboardingData) => void
  onBack?: () => void
}

export interface TechnicalOnboardingData {
  fullName: string
  phone: string
  portfolioLinks: string[]
  skills: TechnicalCategoryId[]
  rateTier: TechnicalRateTierId | ''
  availability: string
  certifications: string[]
  bio: string
}

const STEPS = [
  { id: 1, label: 'Basics' },
  { id: 2, label: 'Portfolio' },
  { id: 3, label: 'Skills' },
  { id: 4, label: 'Rates' },
  { id: 5, label: 'Certs & Bio' },
  { id: 6, label: 'Review' },
]

export function TechnicalOnboardingStepper({ onComplete, onBack }: TechnicalOnboardingStepperProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<TechnicalOnboardingData>>({
    skills: [],
    portfolioLinks: [],
    certifications: [],
    rateTier: '',
  })
  const [customCert, setCustomCert] = useState('')

  const updateData = (updates: Partial<TechnicalOnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const next = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      if (onComplete && isComplete(data)) {
        onComplete(data as TechnicalOnboardingData)
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

  const isComplete = (d: Partial<TechnicalOnboardingData>): boolean => {
    return !!(d.fullName && d.phone && (d.portfolioLinks?.length || 0) > 0 && (d.skills?.length || 0) > 0 && d.rateTier)
  }

  const toggleSkill = (id: TechnicalCategoryId) => {
    const current = data.skills || []
    const updated = current.includes(id)
      ? current.filter(c => c !== id)
      : [...current, id]
    updateData({ skills: updated as TechnicalCategoryId[] })
  }

  const toggleCert = (cert: string) => {
    const current = data.certifications || []
    const updated = current.includes(cert)
      ? current.filter(c => c !== cert)
      : [...current, cert]
    updateData({ certifications: updated })
  }

  const addCustomCert = () => {
    if (!customCert.trim()) return
    const val = customCert.trim()
    if (!(data.certifications || []).includes(val)) {
      updateData({ certifications: [...(data.certifications || []), val] })
    }
    setCustomCert('')
  }

  const addPortfolioLink = (platform: string, base = '') => {
    const placeholder = base || `https://${platform.toLowerCase().replace(/\s/g, '')}.com/yourhandle`
    const current = data.portfolioLinks || []
    if (!current.includes(placeholder)) {
      updateData({ portfolioLinks: [...current, placeholder] })
    }
  }

  const removePortfolioLink = (link: string) => {
    updateData({ portfolioLinks: (data.portfolioLinks || []).filter(l => l !== link) })
  }

  const updatePortfolioLink = (index: number, val: string) => {
    const updated = [...(data.portfolioLinks || [])]
    updated[index] = val
    updateData({ portfolioLinks: updated })
  }

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100
  const selectedRate = TECHNICAL_RATE_TIERS.find(t => t.id === data.rateTier)

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">💻 Technical Talent Profile</h2>
            <p className="text-sm text-gray-600">Step {currentStep} of {STEPS.length} • Professional guided flow</p>
          </div>
          <div className="text-xs px-3 py-1 bg-violet-100 text-violet-800 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Trust & Credibility
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-violet-600 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          {STEPS.map(s => (
            <div key={s.id} className={s.id === currentStep ? 'font-medium text-violet-700' : ''}>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-violet-100 p-8 min-h-[460px]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">Let&apos;s get the basics</h3>
              <p className="text-sm text-gray-600">Professional clients look for clear, verifiable contact. This powers direct outreach.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name (professional)</label>
              <input 
                type="text" 
                className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500" 
                placeholder="Alex Tan Wei Ming"
                value={data.fullName || ''}
                onChange={e => updateData({ fullName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">WhatsApp / Phone</label>
              <input 
                type="tel" 
                className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500" 
                placeholder="012-345 6789"
                value={data.phone || ''}
                onChange={e => updateData({ phone: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1.5">Clients and employers will message you here. We never share without consent.</p>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1 flex items-center gap-2"><LinkIcon className="w-5 h-5" /> Showcase your work</h3>
              <p className="text-sm text-gray-600">Portfolio links are the #1 trust signal for technical talent. Add at least 2.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['GitHub', 'LinkedIn', 'Behance', 'Dribbble', 'Personal Site'].map(p => (
                <button 
                  key={p} 
                  onClick={() => addPortfolioLink(p)}
                  className="text-xs px-3 py-1.5 border rounded-full hover:bg-violet-50 active:bg-violet-100 transition"
                >
                  + {p}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {(data.portfolioLinks || []).length === 0 && (
                <p className="text-sm text-gray-500 italic">No links yet. Use the quick-add buttons above or type your own below.</p>
              )}
              {(data.portfolioLinks || []).map((link, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input 
                    type="url" 
                    value={link} 
                    onChange={e => updatePortfolioLink(idx, e.target.value)}
                    className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-violet-500"
                    placeholder="https://..."
                  />
                  <button onClick={() => removePortfolioLink(link)} className="text-red-500 text-sm px-2">✕</button>
                </div>
              ))}
              <button 
                onClick={() => {
                  const current = data.portfolioLinks || []
                  updateData({ portfolioLinks: [...current, ''] })
                }}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                + Add another custom link
              </button>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm">
              <div className="flex gap-2">
                <ShieldCheck className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-violet-800">Pro tip</div>
                  <p className="text-violet-700 text-xs mt-0.5">Profiles with 2+ working portfolio links are shown 3–4× more often in Technical searches.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Select your core skills</h3>
            <p className="text-sm text-gray-600 mb-4">Choose all that fit. We use this for precise employer matching across Malaysia.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TECHNICAL_CATEGORIES.map(cat => {
                const selected = (data.skills || []).includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSkill(cat.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.985] ${
                      selected ? 'border-violet-600 bg-violet-50' : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
                    }`}
                  >
                    <span className="text-3xl">{cat.emoji}</span>
                    <span className="font-medium text-sm leading-tight">{cat.name}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              {(data.skills?.length || 0)} selected — broader skills = more opportunities
            </p>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-1">Choose your rate tier</h3>
              <p className="text-sm text-gray-600">Transparent pricing builds instant trust. You can adjust anytime.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TECHNICAL_RATE_TIERS.map(tier => {
                const sel = data.rateTier === tier.id
                return (
                  <button
                    key={tier.id}
                    onClick={() => updateData({ rateTier: tier.id as TechnicalRateTierId })}
                    className={`text-left p-5 rounded-2xl border-2 transition-all ${sel ? 'border-violet-600 bg-violet-50' : 'border-gray-200 hover:border-violet-200'}`}
                  >
                    <div className="font-semibold text-lg">{tier.label}</div>
                    <div className="text-violet-700 font-medium mt-1">{tier.range}</div>
                    <div className="text-xs text-gray-500 mt-1">{tier.desc}</div>
                  </button>
                )
              })}
            </div>
            {selectedRate && (
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
                Selected: <span className="font-medium text-violet-700">{selectedRate.label}</span> — {selectedRate.range}
              </div>
            )}
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-7">
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Award className="w-5 h-5" /> Certifications &amp; badges</h3>
              <p className="text-sm text-gray-600">Select any you hold. Custom ones welcome.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SUGGESTED_CERTS.map(cert => {
                const sel = (data.certifications || []).includes(cert)
                return (
                  <button
                    key={cert}
                    onClick={() => toggleCert(cert)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition ${sel ? 'bg-violet-600 text-white border-violet-600' : 'border-gray-200 hover:bg-violet-50'}`}
                  >
                    {cert}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-2">
              <input 
                value={customCert}
                onChange={e => setCustomCert(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addCustomCert() }}
                placeholder="Add custom cert (e.g. My own badge)"
                className="flex-1 border rounded-xl px-4 py-2 text-sm"
              />
              <button onClick={addCustomCert} className="px-4 rounded-xl border border-violet-200 text-violet-600 hover:bg-violet-50">Add</button>
            </div>

            {(data.certifications || []).length > 0 && (
              <div className="text-xs text-gray-500">Selected: {(data.certifications || []).join(', ')}</div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Short professional bio (2–3 sentences)</label>
              <textarea 
                className="w-full border rounded-2xl px-4 py-3 h-28 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                placeholder="Senior full-stack developer with 6 years building scalable fintech platforms for SEA startups. Specialise in Next.js + Supabase + clean design systems."
                value={data.bio || ''}
                onChange={e => updateData({ bio: e.target.value })}
              />
              <p className="text-[11px] text-gray-500 mt-1">Keep it results-focused. Clients read this first.</p>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Almost done — review your profile</h3>
            
            <div className="bg-gray-50 rounded-2xl p-5 text-sm space-y-3">
              <div><span className="text-gray-500">Name:</span> <span className="font-medium">{data.fullName || '—'}</span></div>
              <div><span className="text-gray-500">Contact:</span> {data.phone || '—'}</div>
              <div><span className="text-gray-500">Portfolio:</span> {(data.portfolioLinks || []).length} link(s)</div>
              <div><span className="text-gray-500">Skills:</span> {(data.skills || []).length} selected</div>
              <div><span className="text-gray-500">Rate:</span> {selectedRate?.label || '—'} ({selectedRate?.range})</div>
              <div><span className="text-gray-500">Certs:</span> {(data.certifications || []).length || 'None yet'}</div>
              <div className="pt-2 border-t"><span className="text-gray-500">Bio:</span><br />{data.bio || <span className="italic">No bio yet</span>}</div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-sm">
              <div className="font-medium text-emerald-800">Ready to go live?</div>
              <p className="text-emerald-700 text-xs mt-1">Your profile will be visible to employers immediately after submission. You can edit everything later from your dashboard.</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={back}
          className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={next}
          disabled={currentStep === 6 && !isComplete(data)}
          className="flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-2xl text-sm font-semibold disabled:bg-gray-300 hover:bg-violet-700 active:scale-[0.985] transition"
        >
          {currentStep === STEPS.length ? 'Publish Profile' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
