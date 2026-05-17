// lib/matching.ts
// Layer 1: Deterministic Weighted Scorer (as defined in strategy)

export interface MatchInput {
  talentCategories: string[]
  talentLocation: string
  talentRate: string
  talentAvailability: string
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
}

export function calculateMatchScore(input: MatchInput): number {
  let score = 0
  const reasons: string[] = []

  // Category match (30%)
  if (input.talentCategories.includes(input.jobCategory)) {
    score += 30
    reasons.push('Category match')
  }

  // Location / radius (25%)
  if (input.talentLocation.toLowerCase().includes(input.jobLocation.toLowerCase())) {
    score += 25
    reasons.push('Location match')
  }

  // Rate within budget (20%)
  // TODO: Implement proper rate parsing
  score += 15
  reasons.push('Rate within range (placeholder)')

  // Availability (15%)
  if (input.talentAvailability.toLowerCase().includes('flexible')) {
    score += 15
    reasons.push('Flexible availability')
  }

  // Review score (10%)
  score += 8
  reasons.push('Good review history (placeholder)')

  return Math.min(score, 100)
}

export function rankTalents(
  talents: MatchableTalent[],
  jobInput: Partial<MatchInput>
): MatchScore[] {
  return talents
    .map((talent) => {
      const score = calculateMatchScore({
        talentCategories: talent.categories || [],
        talentLocation: talent.location || '',
        talentRate: talent.rate || '',
        talentAvailability: talent.availability || '',
        jobCategory: jobInput.jobCategory || '',
        jobLocation: jobInput.jobLocation || '',
      })

      return {
        talentId: talent.id,
        score,
        reasons: [],
      }
    })
    .sort((a, b) => b.score - a.score)
}
