'use client'

import { useEffect, useState } from 'react'

const feedItems = [
  { type: 'job', text: 'Photographer needed for wedding in Shah Alam', budget: 'RM 2,500', time: '2m ago', img: 1 },
  { type: 'job', text: 'Aircond repair — KLCC area', budget: 'RM 180', time: '5m ago', img: 2 },
  { type: 'done', text: 'Logo design completed for Kopitiam Kita', budget: 'RM 650', time: '8m ago', img: 3 },
  { type: 'joined', text: 'New videographer joined — Danial Harith', budget: '', time: '12m ago', img: 4 },
  { type: 'job', text: 'Videographer for product launch in PJ', budget: 'RM 1,200', time: '15m ago', img: 5 },
  { type: 'done', text: 'Website completed for Boutique Amira', budget: 'RM 3,800', time: '22m ago', img: 6 },
  { type: 'job', text: 'Electrician needed — Bangi area', budget: 'RM 250', time: '28m ago', img: 7 },
  { type: 'joined', text: 'New graphic designer joined — Syafiq R.', budget: '', time: '35m ago', img: 8 },
  { type: 'job', text: 'Content creator for Ramadan campaign', budget: 'RM 1,800', time: '42m ago', img: 9 },
  { type: 'done', text: 'Home renovation photos delivered', budget: 'RM 900', time: '50m ago', img: 10 },
  { type: 'job', text: 'Admin assistant — data entry, 2 weeks', budget: 'RM 1,500', time: '1h ago', img: 11 },
  { type: 'job', text: 'MUA for bridal trial in Kajang', budget: 'RM 350', time: '1h ago', img: 12 },
  { type: 'done', text: 'Product photoshoot completed', budget: 'RM 600', time: '1h ago', img: 13 },
  { type: 'joined', text: 'New web developer joined — Amir H.', budget: '', time: '1h ago', img: 14 },
]

export default function LiveJobFeed() {
  const [visible, setVisible] = useState(6)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => Math.min(prev + 1, feedItems.length))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--color-mute)' }}>
          Live Activity
        </span>
      </div>

      {feedItems.slice(0, visible).map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-xl transition-all duration-500 animate-fade-in-up"
          style={{
            animationDelay: `${i * 0.05}s`,
            backgroundColor: 'var(--color-canvas)',
            border: '1px solid rgba(14, 15, 12, 0.05)',
          }}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://i.pravatar.cc/80?img=${item.img})` }}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-snug" style={{ color: 'var(--color-ink)' }}>
              {item.text}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {item.budget && (
                <span
                  className={`text-xs font-semibold ${
                    item.type === 'done'
                      ? 'text-emerald-600'
                      : item.type === 'joined'
                      ? 'text-blue-600'
                      : ''
                  }`}
                  style={item.type === 'job' ? { color: 'var(--color-green-mid)' } : {}}
                >
                  {item.budget}
                </span>
              )}
              <span className="text-xs" style={{ color: 'var(--color-mute)' }}>
                {item.time}
              </span>
            </div>
          </div>

          {/* Type badge */}
          <span
            className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
              item.type === 'job'
                ? 'bg-emerald-50 text-emerald-700'
                : item.type === 'done'
                ? 'bg-neutral-100 text-neutral-600'
                : 'bg-blue-50 text-blue-600'
            }`}
          >
            {item.type === 'job' ? 'Job' : item.type === 'done' ? 'Done' : 'New'}
          </span>
        </div>
      ))}

      {visible < feedItems.length && (
        <div
          className="text-center text-xs font-medium py-2 animate-pulse"
          style={{ color: 'var(--color-mute)' }}
        >
          Loading more activity...
        </div>
      )}
    </div>
  )
}
