import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import CategoryNav from '@/components/navigation/CategoryNav'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
      {/* Navigation */}
      <nav className="nav-bar" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
            UpahJe.my
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/jobs" className="nav-link">Find Work</Link>
            <Link href="/talent" className="nav-link">Find Talent</Link>
            <Link href="/categories" className="nav-link">Categories</Link>
            <Link href="/auth/login" className="nav-link">Sign In</Link>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Category Navigation */}
      <div className="border-b" style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'var(--color-canvas-soft)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
          <Link href="/categories/photography" className="filter-tab whitespace-nowrap">📷 Photography</Link>
          <Link href="/categories/videography" className="filter-tab whitespace-nowrap">🎬 Videography</Link>
          <Link href="/categories/content-creator" className="filter-tab whitespace-nowrap">✍️ Content Creator</Link>
          <Link href="/categories/photo-editor" className="filter-tab whitespace-nowrap">🎨 Photo Editor</Link>
          <Link href="/categories/graphic-design" className="filter-tab whitespace-nowrap">🖼️ Graphic Design</Link>
          <Link href="/categories/makeup-artist" className="filter-tab whitespace-nowrap">💄 Makeup Artist</Link>
          <Link href="/categories/wedding-planner" className="filter-tab whitespace-nowrap">💒 Wedding Planner</Link>
        </div>
      </div>

      {/* Hero Band */}
      <section className="hero-band">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <p className="text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: 'var(--color-body)' }}>
                Malaysia's Creative Marketplace
              </p>
              <h1 className="font-display-mega mb-6" style={{ color: 'var(--color-ink)' }}>
                Find the perfect<br />creative talent.
              </h1>
              <p className="text-xl mb-8" style={{ color: 'var(--color-body)' }}>
                Connect with photographers, videographers, designers, and more. 
                Post a job, browse portfolios, hire with confidence.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="btn-primary text-lg px-8 py-4">
                  Post a Job — It's Free
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Browse Talent
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D', 'E'].map((initial, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{ 
                        backgroundColor: ['#9fe870', '#ffc091', '#38c8ff', '#c5edab', '#ffd11a'][i],
                        color: 'var(--color-ink)',
                        border: '2px solid var(--color-canvas-soft)'
                      }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <p style={{ color: 'var(--color-body)' }}>
                  <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>2,500+</span> creative professionals
                </p>
              </div>
            </div>

            {/* Currency Converter Card - repurposed as Job Stats Card */}
            <div className="card-content shadow-elevated" style={{ border: '1px solid var(--color-ink)' }}>
              <h3 className="font-display-md mb-6" style={{ color: 'var(--color-ink)' }}>
                Quick Job Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--color-canvas-soft)' }}>
                  <span style={{ color: 'var(--color-body)' }}>Active Jobs</span>
                  <span className="font-display-sm" style={{ color: 'var(--color-ink)' }}>248</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--color-canvas-soft)' }}>
                  <span style={{ color: 'var(--color-body)' }}>Posted Today</span>
                  <span className="font-display-sm" style={{ color: 'var(--color-ink)' }}>12</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--color-canvas-soft)' }}>
                  <span style={{ color: 'var(--color-body)' }}>Avg. Response Time</span>
                  <span className="font-display-sm" style={{ color: 'var(--color-positive)' }}>2 hours</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span style={{ color: 'var(--color-body)' }}>Completed Projects</span>
                  <span className="font-display-sm" style={{ color: 'var(--color-ink)' }}>1,847</span>
                </div>
              </div>
              <Link href="/jobs" className="btn-primary w-full mt-6 text-center block">
                View All Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="content-band">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-display-xl mb-2" style={{ color: 'var(--color-ink)' }}>
                Explore Categories
              </h2>
              <p style={{ color: 'var(--color-body)' }}>
                Find talent across 7 creative verticals
              </p>
            </div>
            <Link href="/categories" className="btn-tertiary">
              View All Categories
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '📷', name: 'Photography', count: 423, desc: 'Events, portraits, products' },
              { emoji: '🎬', name: 'Videography', count: 287, desc: 'Events, ads, social content' },
              { emoji: '✍️', name: 'Content Creator', count: 356, desc: 'Blog, social, copywriting' },
              { emoji: '🎨', name: 'Photo Editor', count: 198, desc: 'Retouching, color grading' },
              { emoji: '🖼️', name: 'Graphic Design', count: 412, desc: 'Branding, logos, print' },
              { emoji: '💄', name: 'Makeup Artist', count: 156, desc: 'Events, bridal, studio' },
              { emoji: '💒', name: 'Wedding Planner', count: 89, desc: 'Coordination, styling' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/categories/${cat.name.toLowerCase().replace(' ', '-')}`}
                className="card-feature-sage p-6 hover:shadow-elevated transition-all group"
                style={{ textDecoration: 'none' }}
              >
                <span className="text-4xl mb-4 block">{cat.emoji}</span>
                <h3 className="font-display-md mb-1" style={{ color: 'var(--color-ink)' }}>{cat.name}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--color-body)' }}>{cat.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-primary-hover)' }}>
                    {cat.count} talents
                  </span>
                  <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-ink)' }}>
                    Browse →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Talent Section */}
      <section className="hero-band">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-display-xl mb-2" style={{ color: 'var(--color-ink)' }}>
                Featured Talent
              </h2>
              <p style={{ color: 'var(--color-body)' }}>
                Top-rated professionals ready to help
              </p>
            </div>
            <Link href="/talent" className="btn-tertiary">
              View All Talent
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Aina Razali', role: 'Photographer', location: 'Kuala Lumpur', rate: 'RM 800/day', rating: 4.9, initials: 'AR', color: '#9fe870' },
              { name: 'Danial Harith', role: 'Videographer', location: 'Petaling Jaya', rate: 'RM 1,200/day', rating: 4.8, initials: 'DH', color: '#ffc091' },
              { name: 'Sharifah Nur', role: 'Content Creator', location: ' Shah Alam', rate: 'RM 600/day', rating: 4.9, initials: 'SN', color: '#38c8ff' },
            ].map((talent) => (
              <div key={talent.name} className="card-content hover:shadow-elevated transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ backgroundColor: talent.color, color: 'var(--color-ink)' }}
                  >
                    {talent.initials}
                  </div>
                  <div>
                    <h3 className="font-display-sm" style={{ color: 'var(--color-ink)' }}>{talent.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--color-body)' }}>{talent.role}</p>
                    <p className="text-xs" style={{ color: 'var(--color-mute)' }}>{talent.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-positive">★ {talent.rating}</span>
                  <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>{talent.rate}</span>
                </div>
                <button className="btn-secondary w-full">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="content-band">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-ink)' }}>
              How It Works
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-body)' }}>
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Post Your Job', desc: 'Describe what you need — event coverage, brand photos, video content. Be specific about your budget and timeline.' },
              { step: '02', title: 'Compare Proposals', desc: 'Receive quotes from verified professionals. Browse portfolios, check reviews, and message directly to clarify details.' },
              { step: '03', title: 'Hire & Pay Securely', desc: 'Agree on terms, track progress, and release payment upon completion. Our escrow protects both parties.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-ink)' }}
                >
                  {item.step}
                </div>
                <h3 className="font-display-md mb-2" style={{ color: 'var(--color-ink)' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-body)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="hero-band-dark">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display-xl mb-4" style={{ color: 'var(--color-primary)' }}>
            Ready to get started?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-canvas-soft)' }}>
            Join thousands of businesses and creatives using UpahJe.my
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary text-lg px-8 py-4" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-ink)' }}>
              Post a Job — Free
            </button>
            <button className="btn-secondary text-lg px-8 py-4" style={{ backgroundColor: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}