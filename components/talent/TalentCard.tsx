import type { Track } from "@/lib/domain"
import Link from 'next/link'

interface TalentCardProps {
  name: string
  track: Track
  location: string
  rate: string
  availability: string
  categories: string[]
  score?: number
  verified?: boolean
  onContact?: () => void
  onViewProfile?: () => void
}

export function TalentCard({
  name,
  track,
  location,
  rate,
  availability,
  categories,
  score,
  verified,
  onContact,
  onViewProfile,
}: TalentCardProps) {
  const isLabour = track === 'LABOUR'
  const accent = isLabour ? 'green' : 'purple'

  return (
    <div className="group border rounded-3xl p-5 hover:shadow-lg transition-all bg-white active:scale-[0.985]">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-semibold text-lg flex items-center gap-2">
            {name}
            {verified && <span className="text-emerald-500 text-xs">✓</span>}
          </div>
          <div className="text-sm text-gray-500">{location}</div>
        </div>
        {score !== undefined && (
          <div className={`text-xs px-2.5 py-0.5 rounded-full bg-${accent}-100 text-${accent}-700 font-medium`}>
            {score}% match
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4 min-h-[22px]">
        {categories.slice(0, 4).map((cat, i) => (
          <span key={i} className="text-[11px] bg-gray-100 px-2.5 py-0.5 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-5">
        <div>
          <div className="text-[10px] text-gray-500">Rate</div>
          <div className="font-medium">{rate}</div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500">Availability</div>
          <div className="font-medium">{availability}</div>
        </div>
      </div>

      <div className="flex gap-2">
        {onViewProfile ? (
          <button
            onClick={onViewProfile}
            className="flex-1 py-2.5 text-sm border rounded-2xl font-medium hover:bg-gray-50 transition text-center"
          >
            View Profile
          </button>
        ) : (
          <Link
            href={`/talent/${name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex-1 py-2.5 text-sm border rounded-2xl font-medium hover:bg-gray-50 transition text-center"
          >
            View Profile
          </Link>
        )}
        <button
          onClick={onContact}
          className={`flex-1 py-2.5 rounded-2xl text-sm font-medium transition text-white bg-${accent}-600 hover:bg-${accent}-700`}
        >
          Hubungi
        </button>
      </div>
    </div>
  )
}
