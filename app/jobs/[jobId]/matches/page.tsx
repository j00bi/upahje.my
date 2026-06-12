import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { TalentCard } from '@/components/talent/TalentCard'
import { rankTalents } from '@/lib/matching'
import { getAverageRating } from '@/lib/reviews'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: { jobId: string }
}

export default async function MatchesPage({ params }: Props) {
  const job = await prisma.job.findUnique({
    where: { id: params.jobId },
    include: {
      category: true,
      employer: { include: { user: true } },
    },
  })

  if (!job) {
    notFound()
  }

  // Fetch talents that have categories matching the job's category
  const talents = await prisma.talent.findMany({
    where: {
      categories: {
        some: { categoryId: job.categoryId },
      },
    },
    include: {
      user: true,
      categories: { include: { category: true } },
    },
  })

  // Calculate match scores
  const talentsWithScores = rankTalents(
    talents.map((t) => ({
      id: t.id,
      categories: t.categories.map((tc) => tc.category.name),
      location: t.user.name ?? '',
      rate: t.rate ?? '',
      availability: t.availability ?? '',
    })),
    {
      jobCategory: job.category?.name ?? '',
      jobLocation: job.location ?? '',
      jobBudget: job.rate ?? undefined,
    }
  )

  // Get ratings for each talent
  const talentRatings = await Promise.all(
    talents.map(async (t) => ({
      talentId: t.id,
      rating: await getAverageRating(t.userId),
    }))
  )

  const ratingsMap = new Map(talentRatings.map((r) => [r.talentId, r.rating]))

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas-soft)' }}>
      {/* Header */}
      <header className="border-b" style={{ backgroundColor: 'var(--color-canvas)', borderColor: 'rgba(14, 15, 12, 0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link
            href="/jobs"
            className="text-sm font-medium mb-3 inline-flex items-center gap-1 hover:gap-2 transition-all"
            style={{ color: 'var(--color-green-mid)' }}
          >
            ← Back to Jobs
          </Link>
          <h1 className="font-display-xl" style={{ color: 'var(--color-ink-deep)' }}>
            Talent Matches
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-body)' }}>
            Showing matched talent for: <span className="font-semibold">{job.title}</span>
          </p>
          {job.location && (
            <p className="mt-1 text-xs" style={{ color: 'var(--color-mute)' }}>
              📍 {job.location}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Results summary */}
        <p className="text-sm mb-6" style={{ color: 'var(--color-body)' }}>
          {talentsWithScores.length} talent{talentsWithScores.length !== 1 ? 's' : ''} matched
        </p>

        {talentsWithScores.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {talentsWithScores.map((scored) => {
              const talent = talents.find((t) => t.id === scored.talentId)
              if (!talent) return null

              return (
                <TalentCard
                  key={talent.id}
                  name={talent.user.name ?? 'Unnamed'}
                  track={talent.track as any}
                  location={talent.user.name ?? ''}
                  rate={talent.rate ?? 'Negotiable'}
                  availability={talent.availability ?? 'Flexible'}
                  categories={talent.categories.map((tc) => tc.category.name)}
                  score={scored.score}
                  verified={talent.verified}
                  averageRating={ratingsMap.get(talent.id)}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: 'var(--color-canvas)', border: '1px solid rgba(14, 15, 12, 0.06)' }}>
            <div className="text-3xl mb-3">🔍</div>
            <p className="font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
              No matching talent yet
            </p>
            <p className="text-sm max-w-xs mx-auto" style={{ color: 'var(--color-mute)' }}>
              Talent matching this job category will appear here once they register.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
