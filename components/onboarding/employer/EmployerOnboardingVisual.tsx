'use client'

import { useState } from 'react'
import { TECHNICAL_CATEGORIES, LABOUR_CATEGORIES } from '@/lib/domain'
import type { EmployerOnboardingData } from '../shared'

interface Props {
  onComplete?: (data: EmployerOnboardingData) => void
  onBack?: () => void
}

export function EmployerOnboardingVisual({ onComplete, onBack }: Props) {
  const [data, setData] = useState<Partial<EmployerOnboardingData>>({ needs: [] })
  const update = <K extends keyof EmployerOnboardingData>(k: K, v: EmployerOnboardingData[K]) =>
    setData(d => ({ ...d, [k]: v }))

  const allCategories = [
    ...LABOUR_CATEGORIES.map(c => ({...c, track: 'LABOUR'})),
    ...TECHNICAL_CATEGORIES.map(c => ({...c, track: 'TECHNICAL'}))
  ]

  const toggle = (id: string) => {
    const cur = data.needs || []
    update('needs', cur.includes(id) ? cur.filter((x: string) => x !== id) : [...cur, id])
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">What do you need help with most?</h3>
        <p className="text-sm text-gray-600">Pick the categories you hire for. You can change this anytime.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {allCategories.map(cat => {
          const selected = data.needs?.includes(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => toggle(cat.id)}
              className={`group p-5 rounded-3xl border-2 text-left transition flex flex-col ${selected ? 'border-blue-600 bg-blue-50' : 'hover:border-blue-200 active:bg-blue-50'}`}
            >
              <span className="text-4xl mb-3">{cat.emoji}</span>
              <span className="font-medium leading-tight">{cat.name}</span>
              <span className="text-[10px] text-gray-500 mt-1">{cat.track}</span>
            </button>
          )
        })}
      </div>

      <div className="space-y-4">
        <input placeholder="Company name" className="w-full border rounded-2xl px-5 py-3" value={data.company || ''} onChange={e => update('company', e.target.value)} />
        <input placeholder="Your name" className="w-full border rounded-2xl px-5 py-3" value={data.contact || ''} onChange={e => update('contact', e.target.value)} />
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="flex-1 py-3 border rounded-2xl">Back</button>
        <button onClick={() => onComplete?.(data)} disabled={!data.company || !data.needs?.length} className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-medium disabled:bg-gray-300">
          Start hiring on UpahJe
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-3">Version B — Visual category-first (very fast for busy clients)</p>
    </div>
  )
}
