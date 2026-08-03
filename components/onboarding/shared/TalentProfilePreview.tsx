'use client'

import type { Track } from '@/lib/domain'

interface TalentProfilePreviewProps {
  name?: string
  location?: string
  track?: Track
  rate?: string
  availability?: string
  bio?: string
  skills?: string[]
  categories?: { emoji: string; name: string }[]
  portfolio?: string[]
  certs?: string[]
  variant?: 'compact' | 'full'
}

export function TalentProfilePreview({
  name = 'Your Name',
  location = 'Kuala Lumpur',
  track = 'TECHNICAL',
  rate = 'RM 80–120 / hr',
  availability = 'Flexible',
  bio = 'Add a short professional bio...',
  skills = [],
  categories = [],
  portfolio = [],
  certs = [],
  variant = 'full',
}: TalentProfilePreviewProps) {
  const accent = track === 'LABOUR'
    ? {
        header: 'bg-green-50',
        icon: 'bg-green-200',
        chip: 'bg-green-100 text-green-800',
        footer: 'text-green-700',
        emoji: '👷',
        label: 'Labour Talent',
      }
    : track === 'PHOTOGRAPHY'
      ? {
          header: 'bg-amber-50',
          icon: 'bg-amber-100',
          chip: 'bg-amber-100 text-amber-900',
          footer: 'text-amber-800',
          emoji: '📸',
          label: 'Photography Talent',
        }
      : {
          header: 'bg-purple-50',
          icon: 'bg-purple-200',
          chip: 'bg-purple-100 text-purple-800',
          footer: 'text-purple-700',
          emoji: '💻',
          label: 'Technical Talent',
        }

  return (
    <div className={`border rounded-3xl overflow-hidden bg-white ${variant === 'compact' ? 'text-sm' : ''}`}>
      {/* Header */}
      <div className={`border-b p-5 ${accent.header}`}>
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${accent.icon}`}>
            {accent.emoji}
          </div>
          <div>
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-gray-600 text-sm">{location}</div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Rate & Availability */}
        <div className="flex gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">Rate</div>
            <div className="font-medium">{rate}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">Available</div>
            <div className="font-medium">{availability}</div>
          </div>
        </div>

        {/* Categories / Skills */}
        {categories.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">Services</div>
            <div className="flex flex-wrap gap-1.5">
              {categories.slice(0, 4).map((c, i) => (
                <span key={i} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${accent.chip}`}>
                  {c.emoji} {c.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills (Technical) */}
        {skills.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">Skills</div>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 6).map((s, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio links */}
        {portfolio.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Portfolio</div>
            <div className="text-xs text-blue-600 space-x-2">
              {portfolio.slice(0, 2).map((p, i) => (
                <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Portfolio link {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Certs */}
        {certs.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Certifications</div>
            <div className="text-xs flex flex-wrap gap-1">
              {certs.slice(0, 3).map((c, i) => <span key={i} className="bg-amber-100 text-amber-700 px-1.5 py-px rounded">{c}</span>)}
            </div>
          </div>
        )}

        {/* Bio */}
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">About</div>
          <p className="text-sm text-gray-600 line-clamp-3">{bio}</p>
        </div>
      </div>

      <div className={`flex items-center gap-2 border-t bg-gray-50 px-5 py-3 text-[10px] ${accent.footer}`}>
        {accent.label} • Profile preview
      </div>
    </div>
  )
}
