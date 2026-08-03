import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { validateJobPosting, getValidationErrors, JobPostingFormData } from '@/lib/validation/job'

/**
 * Server-side action to create a new job
 * @param formData - The job posting form data
 * @returns Object with success status, job data, or error details
 */
export async function createJob(formData: JobPostingFormData) {
  // Validate form data
  const validation = validateJobPosting(formData)
  if (!validation.success) {
    return {
      success: false,
      error: 'Validation failed',
      details: getValidationErrors(validation),
    }
  }

  // Get the current user and their employer record
  const session = await auth()
  if (!session?.user?.id) {
    return {
      success: false,
      error: 'Authentication required',
    }
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { role: true },
  })

  if (!profile || profile.role !== 'EMPLOYER') {
    return {
      success: false,
      error: 'Only employers can post jobs.',
    }
  }

  const employer = await prisma.employer.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  })

  if (!employer) {
    return {
      success: false,
      error: 'Employer profile not found. Please complete your profile first.',
    }
  }

  try {
    const newJob = await prisma.job.create({
      data: {
        title: validation.data.title,
        description: validation.data.description,
        rate: validation.data.rate,
        location: validation.data.location,
        track: validation.data.track,
        categoryId: validation.data.categoryId,
        employerId: employer.id,
        status: 'OPEN',
      },
      select: { id: true, title: true, description: true, rate: true, location: true, track: true, status: true, createdAt: true },
    })

    return {
      success: true,
      job: newJob,
    }
  } catch (insertError) {
    console.error('Error creating job:', insertError)
    return {
      success: false,
      error: 'Failed to create job. Please try again.',
    }
  }
}

/**
 * Server-side action to get employer ID for the current user
 * @returns Object with employerId or error
 */
export async function getCurrentEmployerId() {
  const session = await auth()
  if (!session?.user?.id) {
    return {
      success: false,
      error: 'Authentication required',
    }
  }

  const existing = await prisma.employer.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  })

  if (existing) {
    return {
      success: true,
      employerId: existing.id,
    }
  }

  try {
    const created = await prisma.employer.create({
      data: {
        userId: session.user.id,
        company: null,
      },
      select: { id: true },
    })

    return {
      success: true,
      employerId: created.id,
    }
  } catch (insertError) {
    console.error('Error creating employer:', insertError)
    return {
      success: false,
      error: 'Failed to create employer profile',
    }
  }
}
