'use client'

import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES, type LabourCategoryId, type TechnicalCategoryId } from '@/lib/domain'

interface CategoryPickerProps {
  track: 'LABOUR' | 'TECHNICAL'
  selected: string[]
  onChange: (selected: string[]) => void
  max?: number
  label?: string
}

export function CategoryPicker({ track, selected, onChange, max = 6, label }: CategoryPickerProps) {
  const categories = track === 'LABOUR' ? LABOUR_CATEGORIES : TECHNICAL_CATEGORIES
  const isSelected = (id: string) => selected.includes(id)

  const toggle = (id: string) => {
    if (isSelected(id)) {
      onChange(selected.filter(s => s !== id))
    } else {
      if (selected.length >= max) return
      onChange([...selected, id])
    }
  }

  return (
    <div>
      {label && <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {categories.map((cat) => {
          const sel = isSelected(cat.id)
          const color = track === 'LABOUR' ? 'green' : 'purple'
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              disabled={!sel && selected.length >= max}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all active:scale-[0.985] text-sm ${
                sel 
                  ? `border-${color}-600 bg-${color}-50` 
                  : 'border-gray-200 hover:border-gray-300 disabled:opacity-50'
              }`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="font-medium leading-tight">{cat.name}</span>
            </button>
          )
        })}
      </div>
      <div className="text-[11px] text-gray-500 mt-2">
        {selected.length} / {max} selected {max < 10 && '(max recommended)'}
      </div>
    </div>
  )
}

export type { LabourCategoryId, TechnicalCategoryId }
