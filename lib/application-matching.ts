export interface ApplicationMatchInput {
  jobTrack: string
  talentTrack?: string | null
  jobCategoryId: string
  talentCategoryIds: string[]
  jobLocation?: string | null
  talentState?: string | null
  talentArea?: string | null
  kycStatus?: string | null
}

export interface ApplicationMatchResult {
  score: number
  reasons: string[]
}

function normalized(value?: string | null) {
  return value?.trim().toLocaleLowerCase('en-MY') ?? ''
}

function hasLocationOverlap(
  jobLocation?: string | null,
  talentState?: string | null,
  talentArea?: string | null,
) {
  const job = normalized(jobLocation)
  if (!job) return false

  return [talentState, talentArea]
    .map(normalized)
    .filter(Boolean)
    .some((location) => job.includes(location) || location.includes(job))
}

export function scoreApplicationMatch(
  input: ApplicationMatchInput,
): ApplicationMatchResult {
  let score = 0
  const reasons: string[] = []

  if (input.talentTrack === input.jobTrack) {
    score += 35
    reasons.push('Track matches')
  }

  if (input.talentCategoryIds.includes(input.jobCategoryId)) {
    score += 35
    reasons.push('Category matches')
  }

  if (hasLocationOverlap(input.jobLocation, input.talentState, input.talentArea)) {
    score += 15
    reasons.push('Location aligns')
  }

  if (input.kycStatus === 'VERIFIED') {
    score += 15
    reasons.push('MyKad verified')
  } else if (input.kycStatus === 'SUBMITTED') {
    score += 8
    reasons.push('MyKad submitted')
  }

  return { score, reasons }
}

export function parseApplicationAction(value: unknown) {
  return value === 'ACCEPT' || value === 'REJECT' || value === 'WITHDRAW'
    ? value
    : null
}
