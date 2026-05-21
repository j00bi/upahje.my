'use client'

import { TECHNICAL_RATE_TIERS, type TechnicalRateTierId } from '@/lib/domain'

interface RateTierSelectorProps {
  selected?: TechnicalRateTierId
  onChange: (tier: TechnicalRateTierId) => void
}

export function RateTierSelector({ selected, onChange }: RateTierSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {TECHNICAL_RATE_TIERS.map((tier) => {
        const isSel = selected === tier.id
        return (
          <button
            key={tier.id}
            type="button"
            onClick={() => onChange(tier.id)}
            className={`text-left p-4 rounded-2xl border-2 transition ${isSel ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}`}
          >
            <div className="flex justify-between items-baseline">
              <div>
                <div className="font-semibold">{tier.label}</div>
                <div className="text-xs text-gray-500">{tier.desc}</div>
              </div>
              <div className="font-mono text-sm text-purple-700">{tier.range}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
