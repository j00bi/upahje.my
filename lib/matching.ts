// lib/matching.ts
// Layer 1: Deterministic Weighted Scorer

export interface MatchInput {
  talentCategories: string[]
  talentLocation: string
  talentRate: string
  talentAvailability: string
  talentReviewAvg?: number | null
  talentReviewCount?: number
  jobCategory: string
  jobLocation: string
  jobBudget?: string
}

export interface MatchScore {
  talentId: string
  score: number
  reasons: string[]
}

export interface MatchableTalent {
  id: string
  categories?: string[]
  location?: string
  rate?: string
  availability?: string
  reviewAvg?: number | null
  reviewCount?: number
}

/**
 * Parse a Malaysian Ringgit rate string into a numeric value.
 * Handles formats like: "RM 80", "RM 80/hr", "RM 80-120", "RM 1,200/day", "RM 45-60/job"
 * Returns the midpoint for ranges, or the single value.
 */
export function parseRate(rateStr: string): number | null {
  if (!rateStr) return null

  // Remove "RM" prefix, commas, and trim
  const cleaned = rateStr.replace(/RM/gi, '').replace(/,/g, '').trim()

  // Try to match a range like "80-120" or "80 - 120"
  const rangeMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/)
  if (rangeMatch) {
    const low = parseFloat(rangeMatch[1])
    const high = parseFloat(rangeMatch[2])
    return (low + high) / 2
  }

  // Try to match a single number
  const singleMatch = cleaned.match(/(\d+(?:\.\d+)?)/)
  if (singleMatch) {
    return parseFloat(singleMatch[1])
  }

  return null
}

/**
 * Determine if talent rate fits within a job budget.
 * Returns a score from 0-20 based on how well the rate matches.
 */
function scoreRateFit(talentRate: string, jobBudget?: string): { score: number; reason: string } {
  const talentVal = parseRate(talentRate)
  const budgetVal = jobBudget ? parseRate(jobBudget) : null

  // If we can't parse either value, give partial credit
  if (talentVal === null || budgetVal === null) {
    return { score: 10, reason: 'Rate information incomplete' }
  }

  // Perfect fit: talent rate is at or below budget
  if (talentVal <= budgetVal) {
    return { score: 20, reason: 'Rate within budget' }
  }

  // Slightly over (within 20%): partial credit
  const overagePercent = ((talentVal - budgetVal) / budgetVal) * 100
  if (overagePercent <= 20) {
    return { score: 12, reason: 'Rate slightly above budget' }
  }

  // Significantly over budget
  if (overagePercent <= 50) {
    return { score: 6, reason: 'Rate above budget' }
  }

  return { score: 2, reason: 'Rate significantly exceeds budget' }
}

/**
 * Score based on real review data.
 * Returns 0-10 based on average rating and review count.
 */
function scoreReviews(avgRating: number | null | undefined, reviewCount: number | undefined): { score: number; reason: string } {
  if (!avgRating || !reviewCount || reviewCount === 0) {
    return { score: 3, reason: 'New talent (no reviews yet)' }
  }

  // Base score from rating (0-8 points)
  const ratingScore = Math.min(8, Math.round((avgRating / 5) * 8))

  // Bonus for volume (0-2 points)
  const volumeBonus = reviewCount >= 10 ? 2 : reviewCount >= 5 ? 1 : 0

  const total = Math.min(10, ratingScore + volumeBonus)
  return {
    score: total,
    reason: `${avgRating.toFixed(1)}★ from ${reviewCount} review${reviewCount > 1 ? 's' : ''}`,
  }
}

/**
 * Check location match using simple substring/city containment.
 * Handles Malaysian location patterns like "Ampang, Kuala Lumpur" vs "Kuala Lumpur".
 */
function scoreLocation(talentLocation: string, jobLocation: string): { score: number; reason: string } {
  if (!talentLocation || !jobLocation) {
    return { score: 10, reason: 'Location not specified' }
  }

  const tLoc = talentLocation.toLowerCase().trim()
  const jLoc = jobLocation.toLowerCase().trim()

  // Exact or substring match
  if (tLoc.includes(jLoc) || jLoc.includes(tLoc)) {
    return { score: 25, reason: 'Same area' }
  }

  // Check if they share a state/city (e.g. both mention "Selangor" or "Kuala Lumpur")
  const tParts = tLoc.split(/[,\s]+/)
  const jParts = jLoc.split(/[,\s]+/)
  const shared = tParts.filter((p) => p.length > 3 && jParts.includes(p))

  if (shared.length > 0) {
    return { score: 18, reason: 'Same region' }
  }

  return { score: 5, reason: 'Different area' }
}

export function calculateMatchScore(input: MatchInput): { score: number; reasons: string[] } {
  const reasons: string[] = []
  let score = 0

  // Category match (30%)
  if (input.talentCategories.some((c) => c.toLowerCase() === input.jobCategory.toLowerCase())) {
    score += 30
    reasons.push('Category match')
  } else {
    // Partial match: check if any category contains the job category as substring
    const partialMatch = input.talentCategories.some(
      (c) => c.toLowerCase().includes(input.jobCategory.toLowerCase()) || input.jobCategory.toLowerCase().includes(c.toLowerCase())
    )
    if (partialMatch) {
      score += 15
      reasons.push('Related category')
    }
  }

  // Location (25%)
  const locResult = scoreLocation(input.talentLocation, input.jobLocation)
  score += locResult.score
  reasons.push(locResult.reason)

  // Rate fit (20%)
  const rateResult = scoreRateFit(input.talentRate, input.jobBudget)
  score += rateResult.score
  reasons.push(rateResult.reason)

  // Availability (15%)
  const avail = input.talentAvailability.toLowerCase()
  if (avail.includes('flexible')) {
    score += 15
    reasons.push('Flexible availability')
  } else if (avail.includes('weekday') || avail.includes('weekend')) {
    score += 10
    reasons.push('Partial availability')
  } else if (avail.includes('project')) {
    score += 8
    reasons.push('Project-based availability')
  } else {
    score += 5
    reasons.push('Limited availability')
  }

  // Review score (10%)
  const reviewResult = scoreReviews(input.talentReviewAvg, input.talentReviewCount)
  score += reviewResult.score
  reasons.push(reviewResult.reason)

  return { score: Math.min(score, 100), reasons }
}

export function rankTalents(
  talents: MatchableTalent[],
  jobInput: Partial<MatchInput>
): MatchScore[] {
  return talents
    .map((talent) => {
      const { score, reasons } = calculateMatchScore({
        talentCategories: talent.categories || [],
        talentLocation: talent.location || '',
        talentRate: talent.rate || '',
        talentAvailability: talent.availability || '',
        talentReviewAvg: talent.reviewAvg,
        talentReviewCount: talent.reviewCount,
        jobCategory: jobInput.jobCategory || '',
        jobLocation: jobInput.jobLocation || '',
        jobBudget: jobInput.jobBudget,
      })

      return { talentId: talent.id, score, reasons }
    })
    .sort((a, b) => b.score - a.score)
}
