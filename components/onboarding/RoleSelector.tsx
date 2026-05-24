'use client'

import { useState } from 'react'
import type { Role } from '@/lib/domain'

interface RoleSelectorProps {
  onSelect: (role: Role) => void
}

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  const [selected, setSelected] = useState<Role | null>(null)

  const handleSelect = (role: Role) => {
    setSelected(role)
    onSelect(role)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {/* Employer Card */}
      <button
        onClick={() => handleSelect('employer')}
        className={`p-6 rounded-xl border-2 text-left transition-all ${
          selected === 'employer'
            ? 'border-blue-600 bg-blue-50'
            : 'border-slate-200 hover:border-blue-300'
        }`}
      >
        <div className="text-3xl mb-3">🏢</div>
        <div className="font-semibold text-lg">Employer / Client</div>
        <div className="text-sm text-slate-600 mt-1">
          I need to hire talent for jobs and services
        </div>
      </button>

      {/* Talent Card */}
      <button
        onClick={() => handleSelect('talent')}
        className={`p-6 rounded-xl border-2 text-left transition-all ${
          selected === 'talent'
            ? 'border-neutral-900 bg-neutral-50'
            : 'border-slate-200 hover:border-neutral-400'
        }`}
      >
        <div className="text-3xl mb-3">👷</div>
        <div className="font-semibold text-lg">Talent / Freelancer</div>
        <div className="text-sm text-slate-600 mt-1">
          I want to offer my services and find work
        </div>
      </button>
    </div>
  )
}
