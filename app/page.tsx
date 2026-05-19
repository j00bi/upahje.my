import Link from 'next/link'
import Image from 'next/image'
import { PortfolioGrid } from '@/components/portfolio'
import { portfolioProjects } from '@/data/portfolioProjects'

const featuredPhotographers = [
  { name: 'Aina Razali', specialty: 'Wedding & Portrait', location: 'Kuala Lumpur', rate: 'RM 250–500 / hr', rating: 4.9, reviews: 24, image: 'https://picsum.photos/seed/aina/400/500' },
  { name: 'Danial Harith', specialty: 'Event & Product', location: 'Penang', rate: 'RM 180–350 / hr', rating: 4.7, reviews: 18, image: 'https://picsum.photos/seed/danial/400/500' },
  { name: 'Sharifah Nur', specialty: 'Pre-Wedding & Creative', location: 'Shah Alam', rate: 'RM 300–600 / hr', rating: 4.8, reviews: 31, image: 'https://picsum.photos/seed/sharifah/400/500' },
]

const photographyJobs = [
  { title: 'Wedding Photographer', location: 'Kuala Lumpur', rate: 'RM 1,500–3,000', type: 'Wedding' },
  { title: 'Event Photographer — Corporate Dinner', location: 'Petaling Jaya', rate: 'RM 500–1,000', type: 'Event' },
  { title: 'Pre-Wedding Photoshoot', location: 'Penang', rate: 'RM 800–2,000', type: 'Pre-Wedding' },
  { title: 'Product Photographer', location: 'Shah Alam', rate: 'RM 200–400', type: 'Product' },
]

const howItWorks = [
  { icon: '📸', title: 'Browse Portfolios', desc: 'View photographers\' work, compare styles, and read reviews from past clients.' },
  { icon: '📅', title: 'Book & Brief', desc: 'Send your event details, get a quote, and secure your booking with a deposit.' },
  { icon: '💳', title: 'Pay on Delivery', desc: 'Pay securely via FPX or DuitNow. Release payment when you\'re happy with the photos.' },
]

const trustBadges = [
  { text: 'Portfolio Verified', icon: '✅' },
  { text: 'FPX / DuitNow', icon: '💳' },
  { text: 'Escrow Protection', icon: '🛡️' },
  { text: '🇲🇾 Malaysian Photographers', icon: '🇲🇾' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-black text-white">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:px-6 sm:pt-32 lg:px-8">
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-400">
            📸 Malaysia's Photography Marketplace — Now Open
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hire Malaysia's Best{' '}
            <span className="text-amber-400">Wedding & Event</span>{' '}
            Photographers
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Browse verified photographer portfolios, compare styles and rates, and book
            the perfect photographer for your wedding, event, or photoshoot — all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/jobs"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-amber-500 px-8 text-sm font-semibold text-black shadow-sm transition-all hover:bg-amber-400 sm:w-auto"
            >
              Browse Photographers
            </Link>
            <Link
              href="/jobs/post"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 px-8 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 sm:w-auto"
            >
              Post a Photography Job
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {trustBadges.map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-800"
              >
                {b.icon} {b.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Photographers ─── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Photographers</h2>
            <p className="mt-2 text-sm text-zinc-500">Top-rated talent near you</p>
          </div>
          <Link href="/talent/aina-photography" className="hidden text-sm font-medium text-amber-400 hover:text-amber-300 sm:inline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPhotographers.map((p) => (
            <Link
              key={p.name}
              href={`/talent/${p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{p.name}</h3>
                    <p className="text-sm text-zinc-400">{p.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-amber-400">{p.rate}</div>
                    <div className="text-xs text-zinc-500">{p.location}</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-amber-400">{'★'.repeat(Math.round(p.rating))}</span>
                  <span>{p.rating} ({p.reviews} reviews)</span>
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
          Find and book the perfect photographer in three simple steps.
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

      {/* ─── Available Photography Jobs ─── */}
      <section className="bg-zinc-900/50 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Available Photography Jobs
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                From weddings to product shoots
              </p>
            </div>
            <Link
              href="/jobs"
              className="hidden text-sm font-medium text-amber-400 hover:text-amber-300 sm:inline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {photographyJobs.map((job) => (
              <div
                key={job.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-amber-500/20 hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-amber-400">
                  {job.type}
                </span>
                <h3 className="mt-3 font-semibold text-white">{job.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{job.location}</p>
                <p className="mt-3 text-sm font-medium text-amber-400">{job.rate}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/jobs" className="text-sm font-medium text-amber-400 hover:text-amber-300">
              View all jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Portfolio Showcase — Behance-style ─── */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <PortfolioGrid
          projects={portfolioProjects.slice(0, 6)}
          title="Real Work from Real Photographers"
          subtitle="Browse portfolios, compare styles, and find your perfect match"
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
            Ready to book your photographer?
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Browse Malaysia's best wedding, event, and portrait photographers. Free to browse, secure to book.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/jobs"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-amber-500 px-8 text-sm font-semibold text-black shadow-sm transition-all hover:bg-amber-400 sm:w-auto"
            >
              Find a Photographer
            </Link>
            <Link
              href="/jobs/post"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 px-8 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 sm:w-auto"
            >
              I'm a Photographer — Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
