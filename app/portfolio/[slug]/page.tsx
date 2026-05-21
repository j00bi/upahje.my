import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioProjects } from '@/data/portfolioProjects'

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = portfolioProjects.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  // Group images by layout for masonry effect
  const mainImage = project.images[0]
  const galleryImages = project.images.slice(1)

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ─── Top Navigation ─── */}
      <div className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition-colors"
            >
              UpahJe.my
            </Link>
            <span className="text-zinc-800">/</span>
            <span className="text-xs text-zinc-400 truncate max-w-[200px]">
              {project.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-zinc-800 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 transition-colors">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {project.likes}
              </span>
            </button>
            <Link
              href={`/talent/${project.talentSlug}`}
              className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-black hover:bg-amber-400 transition-colors"
            >
              Hire {project.talentName.split(' ')[0]}
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Hero Image ─── */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-900">
            <Image
              src={mainImage}
              alt={project.title}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── Project Info ─── */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 mb-3">
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
                  {project.category}
                </span>
                <span>{project.year}</span>
              </div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {project.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Image Gallery — Behance style */}
            <div className="space-y-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Gallery
              </h2>
              <div className="space-y-6">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-xl bg-zinc-900"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} — Image ${i + 2}`}
                      width={i % 2 === 0 ? 1200 : 800}
                      height={i % 2 === 0 ? 800 : 1200}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Behance style */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Creator Card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Photographer
                </h3>
                <Link
                  href={`/talent/${project.talentSlug}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-zinc-800">
                    <Image
                      src={project.talentAvatar}
                      alt={project.talentName}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                      {project.talentName}
                    </div>
                    <div className="text-xs text-zinc-500">View Profile →</div>
                  </div>
                </Link>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-white">{project.likes}</div>
                    <div className="text-[11px] text-zinc-500">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white">{project.views}</div>
                    <div className="text-[11px] text-zinc-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white">{project.images.length}</div>
                    <div className="text-[11px] text-zinc-500">Photos</div>
                  </div>
                </div>

                <Link
                  href={`/talent/${project.talentSlug}`}
                  className="mt-5 flex h-10 w-full items-center justify-center rounded-xl bg-amber-500 text-xs font-semibold text-black hover:bg-amber-400 transition-colors"
                >
                  Hire {project.talentName.split(' ')[0]}
                </Link>
              </div>

              {/* Similar Projects */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  More from {project.talentName.split(' ')[0]}
                </h3>
                <div className="space-y-3">
                  {portfolioProjects
                    .filter((p) => p.talentSlug === project.talentSlug && p.id !== project.id)
                    .slice(0, 3)
                    .map((p) => (
                      <Link
                        key={p.id}
                        href={`/portfolio/${p.id}`}
                        className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-zinc-800/50"
                      >
                        <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                          <Image
                            src={p.coverImage}
                            alt={p.title}
                            width={80}
                            height={56}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-white truncate group-hover:text-amber-400 transition-colors">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {p.likes} likes
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-800 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} UpahJe.my — Malaysia&apos;s creative talent marketplace
          </div>
        </div>
      </footer>
    </div>
  )
}
