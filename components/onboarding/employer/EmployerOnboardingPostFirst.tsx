'use client'

import { useState } from 'react'
import type { EmployerOnboardingData } from '../shared'

interface Props {
  onComplete?: (data: EmployerOnboardingData) => void
  onBack?: () => void
}

export function EmployerOnboardingPostFirst({ onComplete, onBack }: Props) {
  const [data, setData] = useState<Partial<EmployerOnboardingData>>({})
  const update = <K extends keyof EmployerOnboardingData>(k: K, v: EmployerOnboardingData[K]) =>
    setData(d => ({ ...d, [k]: v }))

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="inline bg-blue-100 text-blue-700 text-xs px-3 py-0.5 rounded-full">FASTEST PATH</div>
        <h3 className="text-xl font-semibold mt-2">Post your first job in under 2 minutes</h3>
        <p className="text-sm text-gray-600">We&apos;ll create your employer profile automatically from this job.</p>
      </div>

      <div className="bg-white border rounded-3xl p-7 space-y-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Job title</div>
          <input placeholder="e.g. Need 2 house cleaners this Saturday" className="w-full text-lg border-b pb-2 focus:outline-none" value={data.jobTitle || ''} onChange={e => update('jobTitle', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Budget</div>
            <input placeholder="RM 150–200" className="w-full border rounded-2xl px-4 py-2.5" value={data.budget || ''} onChange={e => update('budget', e.target.value)} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">When</div>
            <input placeholder="This weekend" className="w-full border rounded-2xl px-4 py-2.5" value={data.when || ''} onChange={e => update('when', e.target.value)} />
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Your company / name</div>
          <input placeholder="Ahmad / My Cafe KL" className="w-full border rounded-2xl px-4 py-2.5" value={data.company || ''} onChange={e => update('company', e.target.value)} />
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-2xl">
          After posting you&apos;ll get a simple employer dashboard. You can add full company details, logo, and payment method later.
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex-1 py-3 border rounded-2xl">Back to role</button>
        <button onClick={() => onComplete?.({ ...data, fastPost: true })} disabled={!data.jobTitle || !data.company} className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-2xl disabled:bg-gray-300">
          Post job &amp; create account
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-3">Version C — Post-first ultra fast (for people who just want to hire now)</p>
    </div>
  )
}
