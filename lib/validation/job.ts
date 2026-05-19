export type Track = 'LABOUR' | 'TECHNICAL'
export type JobStatus = 'OPEN' | 'MATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface JobPostingFormData {
  title: string
  description: string
  rate: string
  location: string
  track: Track
  categoryId: string
}

export interface JobCreationData extends JobPostingFormData {
  employerId: string
  status: JobStatus
}

type ValidationIssue = {
  path: Array<string | number>
  message: string
}

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: ValidationIssue[] } }

function fail(issues: ValidationIssue[]): ValidationResult<never> {
  return { success: false, error: { issues } }
}

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isTrack(value: unknown): value is Track {
  return value === 'LABOUR' || value === 'TECHNICAL'
}

function isJobStatus(value: unknown): value is JobStatus {
  return value === 'OPEN' || value === 'MATCHED' || value === 'IN_PROGRESS' || value === 'COMPLETED' || value === 'CANCELLED'
}

export function validateJobPosting(data: unknown): ValidationResult<JobPostingFormData> {
  if (!data || typeof data !== 'object') {
    return fail([{ path: [], message: 'Invalid job payload' }])
  }

  const input = data as Record<string, unknown>
  const issues: ValidationIssue[] = []

  const title = getString(input.title)
  if (title.length < 3) {
    issues.push({ path: ['title'], message: 'Job title must be at least 3 characters' })
  } else if (title.length > 100) {
    issues.push({ path: ['title'], message: 'Job title must be less than 100 characters' })
  }

  const description = getString(input.description)
  if (description.length < 10) {
    issues.push({ path: ['description'], message: 'Description must be at least 10 characters' })
  } else if (description.length > 2000) {
    issues.push({ path: ['description'], message: 'Description must be less than 2000 characters' })
  }

  const rate = getString(input.rate)
  if (rate.length < 1) {
    issues.push({ path: ['rate'], message: 'Rate is required' })
  } else if (rate.length > 50) {
    issues.push({ path: ['rate'], message: 'Rate must be less than 50 characters' })
  }

  const location = getString(input.location)
  if (location.length < 2) {
    issues.push({ path: ['location'], message: 'Location must be at least 2 characters' })
  } else if (location.length > 100) {
    issues.push({ path: ['location'], message: 'Location must be less than 100 characters' })
  }

  if (!isTrack(input.track)) {
    issues.push({ path: ['track'], message: 'Track must be LABOUR or TECHNICAL' })
  }

  const categoryId = getString(input.categoryId)
  if (categoryId.length < 1) {
    issues.push({ path: ['categoryId'], message: 'Category is required' })
  }

  if (issues.length > 0) {
    return fail(issues)
  }

  return {
    success: true,
    data: {
      title,
      description,
      rate,
      location,
      track: input.track as Track,
      categoryId,
    },
  }
}

export function validateJobCreation(data: unknown): ValidationResult<JobCreationData> {
  if (!data || typeof data !== 'object') {
    return fail([{ path: [], message: 'Invalid job payload' }])
  }

  const input = data as Record<string, unknown>
  const posting = validateJobPosting(input)

  if (!posting.success) {
    return { success: false as const, error: (posting as any).error }
  }

  const employerId = getString(input.employerId)
  const issues: ValidationIssue[] = []
  if (!employerId) {
    issues.push({ path: ['employerId'], message: 'Employer ID is required' })
  }

  const status = input.status
  if (status !== undefined && !isJobStatus(status)) {
    issues.push({ path: ['status'], message: 'Invalid job status' })
  }

  if (issues.length > 0) {
    return fail(issues)
  }

  return {
    success: true,
    data: {
      ...posting.data,
      employerId,
      status: (status as JobStatus | undefined) ?? 'OPEN',
    },
  }
}

export function getValidationErrors(result: { success: boolean; error?: { issues: Array<{ path: Array<string | number>; message: string }> } }) {
  if (result.success) return {}

  const errors: Record<string, string> = {}

  if (result.error) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString()
      if (field) {
        errors[field] = issue.message
      }
    })
  }

  return errors
}
