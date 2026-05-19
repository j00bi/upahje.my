import Link from 'next/link'
import Image from 'next/image'
import { PortfolioGrid } from '@/components/portfolio'
import { portfolioProjects } from '@/data/portfolioProjects'
import { MARKETPLACE_CATEGORIES } from '@/lib/categories'

const featuredTalent = [
  { name: 'Aina Razali', category: '📸 Photography', specialty: 'Wedding & Portrait', location: 'Kuala Lumpur', rate: 'RM 250–500 / hr', rating: 4.9, reviews: 24, image: 'https://picsum.photos/seed/aina/400/500', slug: 'aina-photography' },
  { name: 'Danial Harith', category: '📸 Photography', specialty: 'Event & Product', location: 'Penang', rate: 'RM 180–350 / hr', rating: 4.7, reviews: 18, image: 'https://picsum.photos/seed/danial/400/500', slug: 'danial-studio' },
  { name: 'Sharifah Nur', category: '📸 Photography', specialty: 'Pre-Wedding & Creative', location: 'Shah Alam', rate: 'RM 300–600 / hr', rating: 4.8, reviews: 31, image: 'https://picsum.photos/seed/sharifah/400/500', slug: 'sharifah-lens' },
]

const howItWorks = [
  { icon: '👀', title: 'Browse Portfolios', desc: 'View work from Malaysia\'s top creative talent. Compare styles, portfolios, and reviews — all in one place.' },
  { icon: '💬', title: 'Connect & Brief', desc: 'Send your project details, get a quote, and agree on deliverables. No hidden fees.' },
  { icon: '🔒', title: 'Pay Securely', desc: 'Pay via FPX or DuitNow. Funds are held securely until you\'re happy with the work.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-black text-white">
      {/* ─── Hero — Marketplace ─── */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-400">
            🇲🇾 Malaysia's Creative Talent Marketplace
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find & Hire{' '}
            <span className="text-amber-400">Creative Talent</span>{' '}
            in Malaysia
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Browse verified portfolios of photographers, videographers, content creators, 
            editors, makeup artists, and more. See their work, compare rates, book securely.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/categories/photography"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-amber-500 px-8 text-sm font-semibold text-black shadow-sm transition-all hover:bg-amber-400 sm:w-auto"
            >
              Browse Talent
            </Link>
            <Link
              href="/jobs/post"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 px-8 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 sm:w-auto"
            >
              Post a Job
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-800">✅ Portfolio Verified</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-800">💳 FPX / DuitNow</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-800">🛡️ Escrow Protection</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-800">🇲🇾 Malaysian Talent</span>
          </div>
        </div>
      </section>

      {/* ─── Category Strip ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {MARKETPLACE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-amber-500/30 hover:bg-zinc-900 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <span className="text-2xl transition-transform group-hover:scale-110">{cat.emoji}</span>
              <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">{cat.name}</span>
              <span className="text-[10px] text-zinc-600">{cat.nameMs}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Talent ─── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Talent</h2>
            <p className="mt-2 text-sm text-zinc-500">Top-rated creatives near you</p>
          </div>
          <Link href="/categories/photography" className="hidden text-sm font-medium text-amber-400 hover:text-amber-300 sm:inline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTalent.map((t) => (
            <Link
              key={t.name}
              href={`/talent/${t.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{t.name}</h3>
                    <p className="text-xs text-zinc-400">{t.category} · {t.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-amber-400">{t.rate}</div>
                    <div className="text-xs text-zinc-500">{t.location}</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-amber-400">{'★'.repeat(Math.round(t.rating))}</span>
                  <span>{t.rating} ({t.reviews} reviews)</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-500">
          Find and hire creative talent in three simple steps.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {howItWorks.map((step, i) => (
            <div
              key={step.title}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-amber-500/20 hover:bg-zinc-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-xl">
                {step.icon}
              </div>
              <div className="text-sm font-semibold tracking-wider text-amber-400">
                0{i + 1}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Portfolio Showcase — Behance-style ─── */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <PortfolioGrid
          projects={portfolioProjects.slice(0, 6)}
          title="Featured Projects"
          subtitle="See what Malaysia's creatives are producing"
          showFilters={true}
        />
      </section>

      {/* ─── Testimonial ─── */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-4xl text-amber-400">"</div>
            <p className="mt-2 text-lg leading-relaxed text-zinc-300">
              Found our wedding photographer on UpahJe in under a day. We viewed portfolios,
              compared packages, and booked Aina — she was amazing. The deposit via FPX
              was seamless too.
            </p>
            <div className="mt-6">
              <div className="text-sm font-semibold text-white">— Sarah & Amir</div>
              <div className="text-xs text-zinc-500">Wedding, Kuala Lumpur</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-zinc-800 bg-gradient-to-b from-black to-[#0a0a0a] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to find your creative talent?
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Browse portfolios, compare rates, and book securely — all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/categories/photography"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-amber-500 px-8 text-sm font-semibold text-black shadow-sm transition-all hover:bg-amber-400 sm:w-auto"
            >
              Browse Talent
            </Link>
            <Link
              href="/jobs/post"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 px-8 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 sm:w-auto"
            >
              I'm a Creative — Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
