'use client'

import { useState } from 'react'
import { MyKadUpload } from '../MyKadUpload'
import type { LabourCategoryId } from '@/lib/domain'
import { CategoryPicker } from '../shared'
import { Check, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import type { LabourOnboardingData } from '../shared'

interface LabourOnboardingCardsProps {
  onComplete?: (data: LabourOnboardingData) => void
  onBack?: () => void
}

export function LabourOnboardingCards({ onComplete, onBack }: LabourOnboardingCardsProps) {
  const [expanded, setExpanded] = useState<string>('basics')
  const [data, setData] = useState<Partial<LabourOnboardingData>>({
    categories: [],
    myKadUploaded: false,
  })

  const sections = [
    { id: 'basics', label: 'Basics', icon: '👤' },
    { id: 'verify', label: 'Verification', icon: '🪪' },
    { id: 'where', label: 'Where you work', icon: '📍' },
    { id: 'what', label: 'What you do', icon: '🛠️' },
    { id: 'price', label: 'Rates & Time', icon: '💰' },
    { id: 'story', label: 'Your story', icon: '✍️' },
  ]

  const toggle = (id: string) => {
    setExpanded(expanded === id ? '' : id)
  }

  const update = <K extends keyof LabourOnboardingData>(k: K, v: LabourOnboardingData[K]) =>
    setData(d => ({ ...d, [k]: v }))



  const canFinish = data.fullName && data.phone && data.location && (data.categories?.length > 0)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Build your profile</h2>
        <p className="text-gray-600 text-sm mt-1">Card style • Reveal one section at a time • Mobile friendly</p>
      </div>

      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = expanded === sec.id
          const isDone = 
            (sec.id === 'basics' && data.fullName && data.phone) ||
            (sec.id === 'verify' && data.myKadUploaded) ||
            (sec.id === 'where' && data.location) ||
            (sec.id === 'what' && data.categories?.length > 0) ||
            (sec.id === 'price' && data.rate && data.availability) ||
            (sec.id === 'story' && data.bio)

          return (
            <div key={sec.id} className="border rounded-3xl overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => toggle(sec.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 active:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3 text-lg">
                  <span>{sec.icon}</span>
                  <span className="font-semibold">{sec.label}</span>
                  {isDone && <Check className="w-4 h-4 text-green-600" />}
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isOpen && (
                <div className="px-6 pb-7 pt-1 border-t bg-white">
                  {sec.id === 'basics' && (
                    <div className="space-y-4 pt-2">
                      <input type="text" placeholder="Full name" className="w-full border rounded-2xl px-5 py-3.5 text-lg" value={data.fullName || ''} onChange={e => update('fullName', e.target.value)} />
                      <input type="tel" placeholder="Phone / WhatsApp" className="w-full border rounded-2xl px-5 py-3.5 text-lg" value={data.phone || ''} onChange={e => update('phone', e.target.value)} />
                    </div>
                  )}

                  {sec.id === 'verify' && (
                    <div className="pt-3">
                      <MyKadUpload onUpload={() => update('myKadUploaded', true)} />
                      <div className="mt-4 bg-amber-50 p-4 rounded-2xl text-xs text-amber-800 flex gap-2">
                        <Shield className="w-4 h-4 mt-px flex-shrink-0" /> 
                        MyKad is mandatory for all Labour listings. We verify once. Your data stays private.
                      </div>
                    </div>
                  )}

                  {sec.id === 'where' && (
                    <div className="pt-2">
                      <input type="text" placeholder="Your main area (e.g. Cheras, KL)" className="w-full border rounded-2xl px-5 py-3.5 text-lg" value={data.location || ''} onChange={e => update('location', e.target.value)} />
                      <div className="text-[11px] mt-3 text-gray-500">We match you to nearby jobs first. KL & Selangor currently supported.</div>
                    </div>
                  )}

                  {sec.id === 'what' && (
                    <div className="pt-2">
                      <div className="grid grid-cols-2 gap-2.5">
                        {LABOUR_CATEGORIES.map(c => {
                          const sel = (data.categories || []).includes(c.id)
                          return (
                            <button key={c.id} onClick={() => toggleCat(c.id)} className={`px-4 py-3 rounded-2xl border flex gap-2 text-sm items-center transition ${sel ? 'bg-green-600 text-white border-green-600' : 'hover:bg-gray-50'}`}>
                              <span>{c.emoji}</span> <span className="font-medium text-left leading-none pt-0.5">{c.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {sec.id === 'price' && (
                    <div className="space-y-4 pt-2">
                      <input type="text" placeholder="Your rate e.g. RM45/job" className="w-full border rounded-2xl px-5 py-3.5" value={data.rate || ''} onChange={e => update('rate', e.target.value)} />
                      <div className="flex flex-wrap gap-2">
                        {['Weekdays', 'Weekends', 'Flexible'].map(a => (
                          <button key={a} onClick={() => update('availability', a)} className={`px-4 py-2 rounded-2xl text-sm border ${data.availability === a ? 'bg-green-600 text-white' : ''}`}>{a}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {sec.id === 'story' && (
                    <div className="pt-1">
                      <textarea placeholder="I have 4 years experience in house cleaning and simple gardening..." className="w-full h-28 border rounded-2xl p-4 text-sm" value={data.bio || ''} onChange={e => update('bio', e.target.value)} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={onBack} className="flex-1 py-3.5 border rounded-2xl font-medium text-gray-600">Back to role</button>
        <button 
          onClick={() => onComplete?.(data)} 
          disabled={!canFinish}
          className="flex-1 py-3.5 bg-emerald-600 text-white font-semibold rounded-2xl disabled:bg-gray-300"
        >
          Save & Continue
        </button>
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-4">Version B — Card-based progressive disclosure (visual, expandable sections)</p>
    </div>
  )
}
