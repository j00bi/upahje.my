import { prisma } from './prisma'

export interface Review {
  id: string
  jobId: string
  rating: number
  comment?: string | null
  fromUserId: string
  toUserId: string
  createdAt: Date
}

export interface ReviewWithUser extends Review {
  fromUser: {
    name?: string | null
    image?: string | null
  }
}

export async function createReview(
  jobId: string,
  fromUserId: string,
  toUserId: string,
  rating: number,
  comment?: string
): Promise<Review> {
  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5')
  }

  // Check if job exists and is completed
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      employer: { include: { user: true } },
      talent: { include: { user: true } },
    },
  })

  if (!job) {
    throw new Error('Job not found')
  }

  if (job.status !== 'COMPLETED') {
    throw new Error('Cannot create review for job that is not completed')
  }

  // Check if review already exists for this job
  const existingReview = await prisma.review.findUnique({
    where: { jobId }
  })

  if (existingReview) {
    throw new Error('Review already exists for this job')
  }

  // Validate participants using the correct IDs:
  // - fromUserId / toUserId coming from the Supabase → local Prisma User bridge (User.id)
  // - Job stores specialized Employer.id / Talent.id, which have .userId back to User
  const employerUserId = job.employer?.userId
  const talentUserId = job.talent?.userId

  const isEmployerReviewingTalent = employerUserId === fromUserId && talentUserId === toUserId
  const isTalentReviewingEmployer = talentUserId === fromUserId && employerUserId === toUserId

  if (!isEmployerReviewingTalent && !isTalentReviewingEmployer) {
    throw new Error('Invalid review participants')
  }

  // Create the review
  const review = await prisma.review.create({
    data: {
      jobId,
      fromUserId,
      toUserId,
      rating,
      comment
    }
  })

  return review
}

export async function getReviewsForUser(userId: string): Promise<ReviewWithUser[]> {
  const reviews = await prisma.review.findMany({
    where: {
      toUserId: userId
    },
    include: {
      fromUser: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return reviews.map((r: ReviewWithUser) => ({
    ...r,
    rating: r.rating,
    comment: r.comment ?? undefined
  }))
}

export async function getAverageRating(userId: string): Promise<number | null> {
  const result = await prisma.review.aggregate({
    where: {
      toUserId: userId
    },
    _avg: {
      rating: true
    },
    _count: {
      rating: true
    }
  })

  if (result._count.rating === 0) {
    return null
  }

  return result._avg.rating ? Math.round(result._avg.rating * 10) / 10 : null
}

export async function getReviewStats(userId: string): Promise<{
  average: number | null
  count: number
  distribution: { [key: number]: number }
}> {
  const reviews = await prisma.review.findMany({
    where: { toUserId: userId },
    select: { rating: true }
  })

  const count = reviews.length
  if (count === 0) {
    return { average: null, count: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }
  }

  const total = reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0)
  const average = Math.round((total / count) * 10) / 10

  const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((r: { rating: number }) => {
    distribution[r.rating]++
  })

  return { average, count, distribution }
}
