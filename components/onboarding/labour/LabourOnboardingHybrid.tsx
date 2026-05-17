'use client'

import { useState } from 'react'
import { LABOUR_CATEGORIES, type LabourCategoryId } from '@/lib/domain'
import { MyKadUpload } from '../MyKadUpload'
import { Zap, Clock, ArrowRight } from 'lucide-react'
import type { LabourOnboardingData } from '../shared'

interface LabourOnboardingHybridProps {
  onComplete?: (data: LabourOnboardingData) => void
  onBack?: () => void
}

export function LabourOnboardingHybrid({ onComplete, onBack }: LabourOnboardingHybridProps) {
  const [mode, setMode] = useState<'quick' | 'full'>('quick')
  const [data, setData] = useState<Partial<LabourOnboardingData>>({ categories: [], quickStart: true })

  const update = <K extends keyof LabourOnboardingData>(k: K, v: LabourOnboardingData[K]) =>
    setData(d => ({ ...d, [k]: v }))

  const toggleCat = (id: LabourCategoryId) => {
    const current = data.categories || []
    update('categories', current.includes(id) ? current.filter((x) => x !== id) : [...current, id])
  }

  // Quick path: only 4 fields then "go live"
  if (mode === 'quick') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
            <Zap className="w-3.5 h-3.5" /> QUICK START
          </div>
          <h2 className="text-2xl font-semibold">Get visible in 60 seconds</h2>
          <p className="text-sm text-gray-600 mt-1">Fill the minimum. Add full details later from your dashboard.</p>
        </div>

        <div className="bg-white border rounded-3xl p-7 space-y-5">
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-1.5">1. Your name</div>
            <input value={data.fullName || ''} onChange={e=>update('fullName',e.target.value)} className="w-full text-xl border-b pb-2 focus:outline-none" placeholder="Siti Aminah" />
          </div>
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-1.5">2. WhatsApp</div>
            <input value={data.phone || ''} onChange={e=>update('phone',e.target.value)} className="w-full text-xl border-b pb-2 focus:outline-none" placeholder="012-987 6543" />
          </div>
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-1.5">3. Main area</div>
            <input value={data.location || ''} onChange={e=>update('location',e.target.value)} className="w-full text-xl border-b pb-2 focus:outline-none" placeholder="Kajang / Cheras" />
          </div>
          <div>
            <div className="uppercase text-[10px] tracking-[1px] text-gray-500 mb-2">4. One service you do well</div>
            <div className="flex flex-wrap gap-2">
              {LABOUR_CATEGORIES.slice(0,6).map(c => (
                <button key={c.id} onClick={() => update('categories', [c.id])} className={`text-sm px-4 py-1.5 rounded-2xl border ${data.categories?.[0]===c.id ? 'bg-green-600 text-white' : ''}`}>{c.emoji} {c.name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 text-xs bg-white border p-3 rounded-2xl flex gap-2 text-gray-600">
          <Clock className="w-4 h-4 mt-px" /> You can complete the full profile (MyKad, rates, bio, more categories) anytime from your dashboard. No pressure.
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button onClick={onBack} className="py-3.5 border rounded-2xl">Back</button>
          <button 
            onClick={() => { 
              // promote to full mode or finish quick
              if (data.fullName && data.phone) {
                onComplete?.({ ...data, quickStart: true })
              } else {
                setMode('full')
              }
            }}
            disabled={!data.fullName || !data.phone}
            className="py-3.5 bg-green-600 text-white rounded-2xl font-medium flex items-center justify-center gap-2 disabled:bg-gray-300"
          >
            Go live now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button onClick={() => setMode('full')} className="text-xs text-gray-500 underline mt-4 block mx-auto">Or fill the full profile now instead</button>
        <p className="text-center text-[10px] text-gray-400 mt-3">Version D — Hybrid (quick start first, deep profile optional)</p>
      </div>
    )
  }

  // Full mode (same as a simplified stepper)
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4 flex justify-between text-sm">
        <div>Full profile mode</div>
        <button onClick={() => setMode('quick')} className="text-green-700">← Switch to quick start</button>
      </div>

      <div className="space-y-8 bg-white p-8 rounded-3xl border">
        <div>
          <div className="font-medium mb-2 text-sm text-gray-500">Full name & phone</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Full name" className="border px-4 py-3 rounded-2xl" value={data.fullName||''} onChange={e=>update('fullName',e.target.value)} />
            <input placeholder="Phone" className="border px-4 py-3 rounded-2xl" value={data.phone||''} onChange={e=>update('phone',e.target.value)} />
          </div>
        </div>

        <div>
          <div className="font-medium mb-2 text-sm text-gray-500">MyKad (required for Labour)</div>
          <MyKadUpload onUpload={() => update('myKadUploaded', true)} />
        </div>

        <div>
          <div className="font-medium mb-2 text-sm text-gray-500">Location & categories (pick 3+)</div>
          <input placeholder="Area" className="w-full border px-4 py-3 rounded-2xl mb-3" value={data.location||''} onChange={e=>update('location',e.target.value)} />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
            {LABOUR_CATEGORIES.map(c => <button key={c.id} onClick={() => toggleCat(c.id)} className={`p-2 border rounded-xl ${data.categories?.includes(c.id)?'bg-green-600 text-white':''}`}>{c.emoji} {c.name.split(' ')[0]}</button>)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Rate</div>
            <input className="w-full border px-4 py-3 rounded-2xl" placeholder="RM 40–60" value={data.rate||''} onChange={e=>update('rate',e.target.value)} />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Availability</div>
            <select className="w-full border px-4 py-3 rounded-2xl" value={data.availability||''} onChange={e=>update('availability',e.target.value)}>
              <option value="">Select...</option>
              <option>Flexible (most days)</option>
              <option>Weekdays only</option>
              <option>Weekends only</option>
            </select>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Short bio (optional but recommended)</div>
          <textarea className="w-full border p-4 rounded-2xl h-20" placeholder="Reliable, own transport, 3 years experience..." value={data.bio||''} onChange={e=>update('bio',e.target.value)} />
        </div>
      </div>

      <button onClick={() => onComplete?.(data)} className="mt-6 w-full py-4 bg-emerald-600 text-white font-semibold rounded-3xl">Create my full profile</button>
      <p className="text-center text-[10px] text-gray-400 mt-3">Version D — Hybrid (quick start + deep profile later)</p>
    </div>
  )
}
