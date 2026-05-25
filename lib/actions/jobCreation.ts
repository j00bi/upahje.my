import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'
import { validateJobPosting, getValidationErrors, JobPostingFormData } from '@/lib/validation/job'
import type { Track } from '@prisma/client'

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

  const { user, employer } = await getUserWithRole()
  if (!user) {
    return {
      success: false,
      error: 'Authentication required',
    }
  }

  if (!employer) {
    return {
      success: false,
      error: 'Employer profile not found. Please complete your profile first.',
    }
  }

  const category = await resolveJobCategory(validation.data.categoryId, validation.data.track)
  if (!category) {
    return {
      success: false,
      error: 'Selected category is not available',
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
        categoryId: category.id,
        employerId: employer.id,
        status: 'OPEN',
      },
      select: {
        id: true,
        title: true,
        description: true,
        rate: true,
        location: true,
        track: true,
        status: true,
        createdAt: true,
      },
    })

    return {
      success: true,
      job: newJob,
    }
  } catch (error) {
    console.error('Error creating job:', error)
    return {
      success: false,
      error: 'Failed to create job. Please try again.',
    }
  }
}

async function resolveJobCategory(categoryId: string, track: Track) {
  const existingById = await prisma.category.findUnique({
    where: { id: categoryId },
  })

  if (existingById) return existingById

  const catalog = track === 'LABOUR' ? LABOUR_CATEGORIES : TECHNICAL_CATEGORIES
  const catalogCategory = catalog.find((category) => category.id === categoryId)

  if (!catalogCategory) return null

  const existingByName = await prisma.category.findUnique({
    where: { name: catalogCategory.name },
  })

  if (existingByName) return existingByName

  return prisma.category.create({
    data: {
      id: catalogCategory.id,
      name: catalogCategory.name,
      track,
      emoji: catalogCategory.emoji,
    },
  })
}

/**
 * Server-side action to get employer ID for the current user
 * @returns Object with employerId or error
 */
export async function getCurrentEmployerId() {
  const { user, employer } = await getUserWithRole()
  if (!user) {
    return {
      success: false,
      error: 'Authentication required',
    }
  }

  if (!employer) {
    try {
      const newEmployer = await prisma.employer.create({
        data: {
          userId: user.id,
          company: null,
        },
        select: { id: true },
      })

      return {
        success: true,
        employerId: newEmployer.id,
      }
    } catch (error) {
      console.error('Error creating employer:', error)
      return {
        success: false,
        error: 'Failed to create employer profile',
      }
    }
  }

  return {
    success: true,
    employerId: employer.id,
  }
}
