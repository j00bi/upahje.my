import type { Track } from "@/lib/domain"
import Link from 'next/link'
import { slugify } from '@/lib/slug'

interface TalentCardProps {
  name: string
  track: Track
  location: string
  rate: string
  availability: string
  categories: string[]
  score?: number
  verified?: boolean
  averageRating?: number | null
  reviewCount?: number
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
  averageRating,
  reviewCount,
  onContact,
  onViewProfile,
}: TalentCardProps) {
  const isLabour = track === 'LABOUR'
  const accent = isLabour ? 'green' : 'purple'
  const hasReviews = averageRating !== undefined && averageRating !== null && averageRating > 0

  return (
    <div className="group border rounded-3xl p-5 hover:shadow-lg transition-all bg-white active:scale-[0.985]" style={{ borderColor: 'rgba(14, 15, 12, 0.08)' }}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-semibold text-lg flex items-center gap-2" style={{ color: 'var(--color-ink)' }}>
            {name}
            {verified && <span className="badge badge-verified text-[10px] leading-none">✓ Verified</span>}
          </div>
          <div className="text-sm mt-0.5" style={{ color: 'var(--color-body)' }}>{location}</div>
        </div>
        {score !== undefined && (
          <div className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'var(--color-teal-soft)', color: 'var(--color-teal-deep)' }}>
            {score}% match
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4 min-h-[22px]">
        {categories.slice(0, 4).map((cat, i) => (
          <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal-deep)' }}>
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-5">
        <div>
          <div className="text-[10px] font-medium" style={{ color: 'var(--color-mute)' }}>Rate</div>
          <div className="font-semibold" style={{ color: 'var(--color-ink)' }}>{rate}</div>
        </div>
        <div>
          <div className="text-[10px] font-medium" style={{ color: 'var(--color-mute)' }}>Availability</div>
          <div className="font-semibold flex items-center gap-1" style={{ color: 'var(--color-ink)' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: availability.toLowerCase().includes('week') ? 'var(--color-teal-mid)' : 'var(--color-amber-mid)' }} />
            {availability}
          </div>
        </div>
      </div>

      {averageRating !== undefined && (
        <div className="mb-4 flex items-center gap-2">
          {hasReviews ? (
            <>
              <div className="flex text-amber-500">
                {'★'.repeat(Math.round(averageRating || 0))}
                {'☆'.repeat(5 - Math.round(averageRating || 0))}
              </div>
              <span className="text-sm" style={{ color: 'var(--color-body)' }}>
                {averageRating?.toFixed(1)} ({reviewCount || 0} reviews)
              </span>
            </>
          ) : (
            <span className="text-xs" style={{ color: 'var(--color-mute)' }}>New to UpahJe</span>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {onViewProfile ? (
          <button
            onClick={onViewProfile}
            className="flex-1 py-2.5 text-sm border rounded-2xl font-medium hover:bg-gray-50 transition text-center"
            style={{ borderColor: 'rgba(14, 15, 12, 0.1)', color: 'var(--color-ink)' }}
          >
            View Profile
          </button>
        ) : (
          <Link
            href={`/talent/${slugify(name)}`}
            className="flex-1 py-2.5 text-sm border rounded-2xl font-medium hover:bg-gray-50 transition text-center"
            style={{ borderColor: 'rgba(14, 15, 12, 0.1)', color: 'var(--color-ink)' }}
          >
            View Profile
          </Link>
        )}
        <button
          onClick={onContact}
          className="flex-1 py-2.5 rounded-2xl text-sm font-medium transition text-white hover:-translate-y-0.5 hover:shadow-md"
          style={{
            backgroundColor: isLabour ? 'var(--color-green-mid)' : 'var(--color-teal-mid)',
          }}
        >
          Hubungi
        </button>
      </div>
    </div>
  )
}
