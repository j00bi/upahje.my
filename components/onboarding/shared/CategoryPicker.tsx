'use client'

import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'

interface CategoryPickerProps {
  track: 'LABOUR' | 'TECHNICAL' | 'BOTH'
  selected: string[]
  onChange: (selected: string[]) => void
  max?: number
  label?: string
}

export function CategoryPicker({ track, selected, onChange, max = 10 }: CategoryPickerProps) {
  const categories =
    track === 'BOTH'
      ? [...LABOUR_CATEGORIES.map(c => ({ ...c, group: 'Labour' as const })), ...TECHNICAL_CATEGORIES.map(c => ({ ...c, group: 'Technical' as const }))]
      : track === 'LABOUR'
        ? LABOUR_CATEGORIES.map(c => ({ ...c, group: 'Labour' as const }))
        : TECHNICAL_CATEGORIES.map(c => ({ ...c, group: 'Technical' as const }))

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(x => x !== id))
    } else if (selected.length < max) {
      onChange([...selected, id])
    }
  }

  const isFull = selected.length >= max

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {categories.map(cat => {
          const sel = selected.includes(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => toggle(cat.id)}
              disabled={!sel && isFull}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-sm transition ${
                sel
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <span>{cat.emoji}</span>
              <span className="whitespace-nowrap">{cat.name}</span>
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>
          {track === 'BOTH' && 'Labour + Technical categories'}
          {track === 'LABOUR' && 'Labour service categories'}
          {track === 'TECHNICAL' && 'Technical skill categories'}
        </span>
        <span>
          {selected.length}/{max}
        </span>
      </div>
    </div>
  )
}
