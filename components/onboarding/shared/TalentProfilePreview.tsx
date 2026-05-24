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
  const isLabour = track === 'LABOUR'
  const accent = isLabour ? 'teal' : 'amber'

  return (
    <div className={`border rounded-3xl overflow-hidden bg-white ${variant === 'compact' ? 'text-sm' : ''}`}>
      {/* Header */}
      <div className={`p-5 bg-${accent}-50 border-b`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-${accent}-200 flex items-center justify-center text-2xl`}>
            {isLabour ? '👷' : '💻'}
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
                <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-${accent}-100 text-${accent}-800 text-xs`}>
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
                <a key={i} href={p} target="_blank" className="hover:underline">Link {i+1}</a>
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

      <div className={`px-5 py-3 bg-gray-50 text-[10px] text-gray-500 border-t flex items-center gap-2 ${isLabour ? 'text-teal-700' : 'text-amber-700'}`}>
        {isLabour ? 'Labour Talent' : 'Technical Talent'} • Profile preview
      </div>
    </div>
  )
}
