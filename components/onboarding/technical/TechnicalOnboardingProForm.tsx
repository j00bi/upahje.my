'use client'

import { useState } from 'react'
import { TECHNICAL_CATEGORIES, TECHNICAL_RATE_TIERS, SUGGESTED_CERTS, type TechnicalCategoryId } from '@/lib/domain'
import { CategoryPicker, TalentProfilePreview } from '../shared'
import { Award, Check } from 'lucide-react'
import type { TechnicalOnboardingData } from '../shared'

interface TechnicalOnboardingProFormProps {
  onComplete?: (data: TechnicalOnboardingData) => void
  onBack?: () => void
}

export function TechnicalOnboardingProForm({ onComplete, onBack }: TechnicalOnboardingProFormProps) {
  const [data, setData] = useState<Partial<TechnicalOnboardingData>>({
    skills: [],
    portfolioLinks: [],
    certifications: [],
    rateTier: '',
    availability: 'Flexible (most days)',
  })
  const [newLink, setNewLink] = useState('')
  const [customCertInput, setCustomCertInput] = useState('')

  const update = <K extends keyof TechnicalOnboardingData>(key: K, value: TechnicalOnboardingData[K]) =>
    setData(prev => ({ ...prev, [key]: value }))

  const addLink = () => {
    if (!newLink.trim()) return
    const cur = data.portfolioLinks || []
    if (!cur.includes(newLink.trim())) {
      update('portfolioLinks', [...cur, newLink.trim()])
    }
    setNewLink('')
  }

  const removeLink = (l: string) => update('portfolioLinks', (data.portfolioLinks || []).filter((x: string) => x !== l))

  const addCustomCert = () => {
    if (!customCertInput.trim()) return
    const val = customCertInput.trim()
    if (!(data.certifications || []).includes(val)) update('certifications', [...(data.certifications || []), val])
    setCustomCertInput('')
  }

  const toggleCert = (cert: string) => {
    const current = data.certifications || []
    update('certifications', current.includes(cert) ? current.filter((x: string) => x !== cert) : [...current, cert])
  }

  const selectedTier = TECHNICAL_RATE_TIERS.find(t => t.id === data.rateTier)
  const canPublish = data.fullName && data.phone && (data.portfolioLinks?.length || 0) >= 1 && (data.skills?.length || 0) >= 1 && data.rateTier

  const previewName = data.fullName || 'Your Name'
  const previewSkills = (data.skills || [])
    .map((id): string | undefined => TECHNICAL_CATEGORIES.find(c => c.id === id)?.name)
    .filter((name): name is string => typeof name === 'string')
  const selectedCategories = (data.skills || [])
    .map((id): (typeof TECHNICAL_CATEGORIES)[number] | undefined => TECHNICAL_CATEGORIES.find(c => c.id === id))
    .filter((item): item is (typeof TECHNICAL_CATEGORIES)[number] => Boolean(item))
  const previewRate = selectedTier ? `${selectedTier.label} • ${selectedTier.range}` : 'Select a tier'

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline text-xs tracking-[1px] font-semibold bg-violet-100 text-violet-700 px-3 py-px rounded">PRO EXPERIENCE</div>
        <h2 className="text-2xl font-semibold mt-2">One-page professional form with live preview</h2>
        <p className="text-sm text-gray-600 mt-1">What you see on the right is exactly what employers will see. Edit live.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* FORM (left) */}
        <div className="lg:col-span-3 space-y-8 bg-white border border-violet-100 rounded-3xl p-7">
          {/* Basics */}
          <div>
            <div className="uppercase tracking-widest text-[10px] text-violet-600 mb-2 font-medium">1. Identity</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input value={data.fullName || ''} onChange={e=>update('fullName', e.target.value)} placeholder="Full name" className="border rounded-2xl px-5 py-3 text-lg" />
              <input value={data.phone || ''} onChange={e=>update('phone', e.target.value)} placeholder="WhatsApp number" className="border rounded-2xl px-5 py-3 text-lg" />
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <div className="uppercase tracking-widest text-[10px] text-violet-600 mb-2 font-medium flex items-center gap-2">2. Portfolio Links <span className="normal-case text-[10px] font-normal text-gray-500">(minimum 1 required)</span></div>
            <div className="flex gap-2 mb-2">
              <input value={newLink} onChange={e=>setNewLink(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addLink()} placeholder="https://github.com/you or https://yourportfolio.com" className="flex-1 border rounded-2xl px-4 py-2.5 text-sm" />
              <button onClick={addLink} className="px-5 rounded-2xl bg-violet-600 text-white text-sm font-medium">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(data.portfolioLinks || []).map((l: string, i: number) => (
                <div key={i} className="text-xs bg-violet-50 border border-violet-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                  {l.slice(0, 38)}{l.length > 38 ? '…' : ''} <button onClick={() => removeLink(l)} className="text-violet-400 hover:text-red-500">×</button>
                </div>
              ))}
              {(data.portfolioLinks || []).length === 0 && <div className="text-xs text-gray-400">Add at least one link above (GitHub, personal site, LinkedIn, etc.)</div>}
            </div>
          </div>

          {/* Skills - using shared CategoryPicker */}
          <div>
            <div className="uppercase tracking-widest text-[10px] text-violet-600 mb-2 font-medium">3. Skills (select all that apply)</div>
            <CategoryPicker
              track="TECHNICAL"
              selected={data.skills || []}
              onChange={(sel) => update('skills', sel as TechnicalCategoryId[])}
              max={7}
            />
          </div>

          {/* Rate Tiers */}
          <div>
            <div className="uppercase tracking-widest text-[10px] text-violet-600 mb-2 font-medium">4. Your rate tier</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TECHNICAL_RATE_TIERS.map(t => (
                <button key={t.id} onClick={() => update('rateTier', t.id)} className={`p-4 rounded-2xl border text-left transition ${data.rateTier === t.id ? 'ring-1 ring-violet-600 border-violet-600 bg-violet-50' : 'border-gray-200'}`}>
                  <div className="font-semibold">{t.label}</div>
                  <div className="text-sm text-violet-600">{t.range}</div>
                  <div className="text-xs text-gray-500">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Certs + Bio */}
          <div className="space-y-6">
            <div>
              <div className="uppercase tracking-widest text-[10px] text-violet-600 mb-2 font-medium flex items-center gap-2">5. Certifications <Award className="w-3.5 h-3.5" /></div>
              <div className="flex flex-wrap gap-2 mb-3">
              {SUGGESTED_CERTS.map(c => {
                const sel = (data.certifications || []).includes(c)
                return <button key={c} onClick={() => toggleCert(c)} className={`text-xs px-3 py-1 rounded-full border transition ${sel ? 'bg-violet-700 text-white border-violet-700' : 'border-gray-300 hover:bg-violet-50'}`}>{c}</button>
              })}
              </div>
              <div className="flex gap-2">
                <input value={customCertInput} onChange={e=>setCustomCertInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addCustomCert()} placeholder="Add custom certification" className="flex-1 text-sm border rounded-2xl px-4 py-2" />
                <button onClick={addCustomCert} className="border px-4 rounded-2xl text-sm">Add</button>
              </div>
            </div>

            <div>
              <div className="uppercase tracking-widest text-[10px] text-violet-600 mb-1.5 font-medium">6. Short professional bio</div>
              <textarea value={data.bio || ''} onChange={e=>update('bio', e.target.value)} placeholder="I build delightful, high-performance web apps for ambitious Southeast Asian teams. Previously at ... " className="w-full h-24 border rounded-2xl px-4 py-3 text-sm" />
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW SIDEBAR (right) - using shared TalentProfilePreview */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <div className="uppercase tracking-[1px] text-[10px] text-violet-500 mb-2 font-semibold pl-1">LIVE PREVIEW — What employers will see</div>
            
              <TalentProfilePreview
                name={previewName}
                location="Malaysia"
                track="TECHNICAL"
                rate={previewRate}
                availability={data.availability}
                bio={data.bio}
                skills={previewSkills}
                categories={selectedCategories.map(({ emoji, name }) => ({ emoji, name }))}
                portfolio={data.portfolioLinks || []}
                certs={data.certifications || []}
              />

            <div className="text-[10px] text-center text-gray-500 mt-3">Live preview. This will become the public talent profile.</div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex gap-3 mt-8 max-w-2xl mx-auto">
        <button onClick={onBack} className="flex-1 py-3.5 border rounded-2xl text-sm font-medium">← Back to track</button>
        <button 
          disabled={!canPublish}
          onClick={() => onComplete?.({ ...data, proForm: true, previewReady: true })}
          className="flex-1 py-3.5 bg-violet-600 text-white disabled:bg-gray-300 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          Publish &amp; Go Live <Check className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
