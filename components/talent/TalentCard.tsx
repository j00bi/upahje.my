import type { Track } from "@/lib/domain"

interface TalentCardProps {
  name: string
  track: Track
  location: string
  rate: string
  availability: string
  categories: string[]
  score?: number
  onContact?: () => void
}

export function TalentCard({
  name,
  track,
  location,
  rate,
  availability,
  categories,
  score,
  onContact,
}: TalentCardProps) {
  const isLabour = track === 'LABOUR'

  return (
    <div className="border rounded-xl p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-semibold text-lg">{name}</div>
          <div className="text-sm text-gray-500">{location}</div>
        </div>
        {score !== undefined && (
          <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            {score}% match
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {categories.slice(0, 3).map((cat, i) => (
          <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
            {cat}
          </span>
        ))}
      </div>

      <div className="flex justify-between text-sm mb-4">
        <div>
          <span className="text-gray-500">Rate</span>
          <div className="font-medium">{rate}</div>
        </div>
        <div>
          <span className="text-gray-500">Availability</span>
          <div className="font-medium">{availability}</div>
        </div>
      </div>

      <button
        onClick={onContact}
        className={`w-full py-2 rounded-lg font-medium transition ${
          isLabour 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        Hubungi Talent
      </button>
    </div>
  )
}
