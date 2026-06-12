import { prisma } from './prisma'

export interface RecentJob {
  id: string
  title: string
  location: string | null
  rate: string | null
  categoryName: string
  categoryEmoji: string | null
  status: string
  createdAt: string
}

/**
 * Fetch the most recently posted jobs for the live activity feed.
 */
export async function getRecentJobs(limit = 5): Promise<RecentJob[]> {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      category: true,
    },
  })

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    location: job.location,
    rate: job.rate,
    categoryName: job.category?.name ?? 'Uncategorized',
    categoryEmoji: job.category?.emoji ?? null,
    status: job.status,
    createdAt: job.createdAt.toISOString(),
  }))
}
