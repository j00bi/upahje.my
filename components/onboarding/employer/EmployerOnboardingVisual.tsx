'use client'

import { useState } from 'react'
import { CategoryPicker } from '../shared'
import type { EmployerOnboardingData } from '../shared'

interface Props {
  onComplete?: (data: EmployerOnboardingData) => void
  onBack?: () => void
}

export function EmployerOnboardingVisual({ onComplete, onBack }: Props) {
  const [data, setData] = useState<Partial<EmployerOnboardingData>>({ needs: [] })
  const update = <K extends keyof EmployerOnboardingData>(k: K, v: EmployerOnboardingData[K]) =>
    setData(d => ({ ...d, [k]: v }))

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">What do you need help with most?</h3>
        <p className="text-sm text-gray-600">Pick the categories you hire for. You can change this anytime.</p>
      </div>

      <CategoryPicker
        track="BOTH"
        selected={data.needs || []}
        onChange={(sel) => update('needs', sel)}
        max={8}
        label="Pick the categories you hire for"
      />

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
