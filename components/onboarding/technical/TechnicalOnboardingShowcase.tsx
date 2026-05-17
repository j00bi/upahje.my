'use client'

import { useState } from 'react'
import { TECHNICAL_CATEGORIES, TECHNICAL_RATE_TIERS, SUGGESTED_CERTS } from '@/lib/domain'
import { Check, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react'
import type { TechnicalOnboardingData } from '../shared'

interface TechnicalOnboardingShowcaseProps {
  onComplete?: (data: TechnicalOnboardingData) => void
  onBack?: () => void
}

export function TechnicalOnboardingShowcase({ onComplete, onBack }: TechnicalOnboardingShowcaseProps) {
  const [expanded, setExpanded] = useState<string>('portfolio')
  const [data, setData] = useState<Partial<TechnicalOnboardingData>>({
    skills: [],
    portfolioLinks: [],
    certifications: [],
    rateTier: '',
  })
  const [customCert, setCustomCert] = useState('')

  const sections = [
    { id: 'basics', label: 'Professional basics', icon: '👤' },
    { id: 'portfolio', label: 'Portfolio & Links', icon: '🔗' },
    { id: 'skills', label: 'Expertise & Skills', icon: '🧠' },
    { id: 'pricing', label: 'Pricing & Availability', icon: '💎' },
    { id: 'certs', label: 'Credentials', icon: '🏅' },
    { id: 'bio', label: 'Professional story', icon: '✍️' },
  ]

  const toggle = (id: string) => {
    setExpanded(expanded === id ? '' : id)
  }

  const update = <K extends keyof TechnicalOnboardingData>(key: K, value: TechnicalOnboardingData[K]) =>
    setData(prev => ({ ...prev, [key]: value }))

  const toggleSkill = (id: (typeof TECHNICAL_CATEGORIES)[number]['id']) => {
    const cur = data.skills || []
    update('skills', cur.includes(id) ? cur.filter((c: string) => c !== id) : [...cur, id])
  }

  const toggleCert = (cert: string) => {
    const cur = data.certifications || []
    update('certifications', cur.includes(cert) ? cur.filter((c: string) => c !== cert) : [...cur, cert])
  }

  const addCustomCert = () => {
    if (!customCert.trim()) return
    const val = customCert.trim()
    if (!(data.certifications || []).includes(val)) {
      update('certifications', [...(data.certifications || []), val])
    }
    setCustomCert('')
  }

  const addPortfolio = (platform: string) => {
    const link = `https://${platform.toLowerCase().replace(/\s/g,'')}.com/yourhandle`
    const cur = data.portfolioLinks || []
    if (!cur.includes(link)) update('portfolioLinks', [...cur, link])
  }

  const updatePortfolio = (idx: number, val: string) => {
    const updated = [...(data.portfolioLinks || [])]
    updated[idx] = val
    update('portfolioLinks', updated)
  }

  const removePortfolio = (link: string) => {
    update('portfolioLinks', (data.portfolioLinks || []).filter((l: string) => l !== link))
  }

  const canFinish = data.fullName && data.phone && (data.portfolioLinks?.length || 0) >= 1 && (data.skills?.length || 0) >= 1 && data.rateTier

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Build your expert brand</h2>
        <p className="text-gray-600 text-sm mt-1">Portfolio-first • Reveal sections at your pace • Built for technical pros</p>
      </div>

      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = expanded === sec.id
          const isDone = 
            (sec.id === 'basics' && data.fullName && data.phone) ||
            (sec.id === 'portfolio' && (data.portfolioLinks?.length || 0) > 0) ||
            (sec.id === 'skills' && (data.skills?.length || 0) > 0) ||
            (sec.id === 'pricing' && data.rateTier) ||
            (sec.id === 'certs' && (data.certifications?.length || 0) > 0) ||
            (sec.id === 'bio' && data.bio)

          return (
            <div key={sec.id} className="border border-violet-100 rounded-3xl overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => toggle(sec.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-violet-50/50 active:bg-violet-50 transition"
              >
                <div className="flex items-center gap-3 text-lg">
                  <span>{sec.icon}</span>
                  <span className="font-semibold">{sec.label}</span>
                  {isDone && <Check className="w-4 h-4 text-violet-600" />}
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isOpen && (
                <div className="px-6 pb-7 pt-2 border-t bg-white">
                  {sec.id === 'basics' && (
                    <div className="space-y-4 pt-2">
                      <input type="text" placeholder="Full professional name" className="w-full border rounded-2xl px-5 py-3.5 text-lg" value={data.fullName || ''} onChange={e => update('fullName', e.target.value)} />
                      <input type="tel" placeholder="WhatsApp / Direct phone" className="w-full border rounded-2xl px-5 py-3.5 text-lg" value={data.phone || ''} onChange={e => update('phone', e.target.value)} />
                    </div>
                  )}

                  {sec.id === 'portfolio' && (
                    <div className="pt-3 space-y-4">
                      <div className="text-sm text-gray-600">Add links to GitHub, LinkedIn, personal site, Behance, etc. Clients judge technical talent by real work.</div>
                      
                      <div className="flex flex-wrap gap-2">
                        {['GitHub','LinkedIn','Behance','Personal Site'].map(p => (
                          <button key={p} onClick={() => addPortfolio(p)} className="text-xs px-3 py-1 rounded-full border hover:bg-violet-100 transition">+ {p}</button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {(data.portfolioLinks || []).map((link: string, i: number) => (
                          <div key={i} className="flex gap-2">
                            <input value={link} onChange={e => updatePortfolio(i, e.target.value)} className="flex-1 border rounded-xl px-4 py-2 text-sm" />
                            <button onClick={() => removePortfolio(link)} className="text-red-400 px-1">✕</button>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => update('portfolioLinks', [...(data.portfolioLinks || []), ''])} className="text-violet-600 text-sm font-medium">+ Add custom link</button>

                      <div className="mt-2 bg-violet-50 p-3 rounded-2xl text-xs flex gap-2 text-violet-700">
                        <ShieldCheck className="w-4 h-4 mt-px" /> Strong portfolio links = higher ranking in Technical searches and direct employer invites.
                      </div>
                    </div>
                  )}

                  {sec.id === 'skills' && (
                    <div className="pt-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {TECHNICAL_CATEGORIES.map(cat => {
                          const sel = (data.skills || []).includes(cat.id)
                          return (
                            <button key={cat.id} onClick={() => toggleSkill(cat.id)} className={`p-3 text-left rounded-2xl border text-sm flex gap-2 items-center transition ${sel ? 'border-violet-600 bg-violet-50' : 'border-gray-200'}`}>
                              <span className="text-xl">{cat.emoji}</span> {cat.name}
                            </button>
                          )
                        })}
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-3">{(data.skills || []).length} skills selected</p>
                    </div>
                  )}

                  {sec.id === 'pricing' && (
                    <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TECHNICAL_RATE_TIERS.map(t => {
                        const sel = data.rateTier === t.id
                        return (
                          <button key={t.id} onClick={() => update('rateTier', t.id)} className={`p-4 rounded-2xl border text-left transition ${sel ? 'border-violet-600 bg-violet-50' : 'border-gray-200'}`}>
                            <div className="font-semibold">{t.label}</div>
                            <div className="text-violet-600 text-sm">{t.range}</div>
                            <div className="text-[11px] text-gray-500">{t.desc}</div>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {sec.id === 'certs' && (
                    <div className="pt-3 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_CERTS.map(c => {
                          const sel = (data.certifications || []).includes(c)
                          return <button key={c} onClick={() => toggleCert(c)} className={`px-3 py-1 text-xs rounded-full border ${sel ? 'bg-violet-600 text-white' : ''}`}>{c}</button>
                        })}
                      </div>
                      <div className="flex gap-2">
                        <input value={customCert} onChange={e=>setCustomCert(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addCustomCert()} placeholder="Add your own credential" className="flex-1 border rounded-xl px-3 py-2 text-sm" />
                        <button onClick={addCustomCert} className="border px-4 rounded-xl text-violet-600">Add</button>
                      </div>
                    </div>
                  )}

                  {sec.id === 'bio' && (
                    <div className="pt-2">
                      <textarea 
                        placeholder="Results-driven product designer with 7 years in B2B SaaS. Led design for 3 funded startups in KL &amp; Singapore..."
                        className="w-full h-28 border rounded-2xl px-5 py-4 text-sm"
                        value={data.bio || ''} 
                        onChange={e => update('bio', e.target.value)} 
                      />
                      <p className="text-xs text-gray-500 mt-2">Keep it concise and achievement-oriented. This appears on your public talent card.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={onBack} className="flex-1 py-3.5 border rounded-2xl text-sm font-medium">Back</button>
        <button 
          onClick={() => onComplete?.({ ...data, showcaseStyle: true })}
          disabled={!canFinish}
          className="flex-1 py-3.5 bg-violet-600 disabled:bg-gray-300 text-white rounded-2xl font-semibold text-sm"
        >
          Publish Technical Profile
        </button>
      </div>
    </div>
  )
}
