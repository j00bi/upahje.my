import Link from 'next/link'

const categories = [
  { slug: 'photography', label: 'Photography', emoji: '📷' },
  { slug: 'videography', label: 'Videography', emoji: '🎬' },
  { slug: 'content-creator', label: 'Content Creator', emoji: '✍️' },
  { slug: 'photo-editor', label: 'Photo Editor', emoji: '🎨' },
  { slug: 'graphic-design', label: 'Graphic Design', emoji: '🖼️' },
  { slug: 'makeup-artist', label: 'Makeup Artist', emoji: '💄' },
  { slug: 'wedding-planner', label: 'Wedding Planner', emoji: '💒' },
]

export default function CategoryNav() {
  return (
    <div 
      className="sticky top-0 z-40 border-b"
      style={{ 
        backgroundColor: 'var(--color-canvas)',
        borderColor: 'var(--color-canvas-soft)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo */}
          <Link href="/" className="font-display-md flex-shrink-0" style={{ color: 'var(--color-ink)' }}>
            UpahJe.my
          </Link>

          {/* Center: Category Pills */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="filter-tab whitespace-nowrap"
              >
                {cat.emoji} {cat.label}
              </Link>
            ))}
          </div>

          {/* Right: Auth */}
          <div className="flex items-center gap-3">
            <Link href="/jobs" className="nav-link hidden sm:block">Find Work</Link>
            <Link href="/talent" className="nav-link hidden sm:block">Find Talent</Link>
            <Link href="/auth/login" className="nav-link">Sign In</Link>
            <button 
              className="btn-primary text-sm py-2 px-4"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-ink)' }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile: Horizontal scroll categories */}
        <div className="lg:hidden flex gap-2 pb-3 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="filter-tab whitespace-nowrap text-xs py-1 px-3"
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}