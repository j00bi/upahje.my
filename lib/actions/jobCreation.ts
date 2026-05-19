import { createClient } from '@/lib/supabase/server'
import { auth } from '@/lib/auth'
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

  const supabase = await createClient()

  // Find employer record for this user
  const { data: employer, error: selectError } = await supabase
    .from('Employer')
    .select('id')
    .eq('userId', session.user.id)
    .single()

  if (selectError && selectError.code !== 'PGRST116') {
    console.error('Error fetching employer:', selectError)
    return {
      success: false,
      error: 'Failed to retrieve employer profile',
    }
  }

  if (!employer) {
    return {
      success: false,
      error: 'Employer profile not found. Please complete your profile first.',
    }
  }

  // Create the job
  const { data: newJob, error: insertError } = await supabase
    .from('Job')
    .insert({
      title: validation.data.title,
      description: validation.data.description,
      rate: validation.data.rate,
      location: validation.data.location,
      track: validation.data.track,
      categoryId: validation.data.categoryId,
      employerId: employer.id,
      status: 'OPEN',
    })
    .select('id, title, description, rate, location, track, status, createdAt')
    .single()

  if (insertError) {
    console.error('Error creating job:', insertError)
    return {
      success: false,
      error: 'Failed to create job. Please try again.',
    }
  }

  return {
    success: true,
    job: newJob,
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

  const supabase = await createClient()

  // Find employer record for this user
  const { data: employer, error: selectError } = await supabase
    .from('Employer')
    .select('id')
    .eq('userId', session.user.id)
    .single()

  if (selectError && selectError.code !== 'PGRST116') {
    console.error('Error fetching employer:', selectError)
    return {
      success: false,
      error: 'Failed to retrieve employer profile',
    }
  }

  if (!employer) {
    // Create employer record if it doesn't exist
    const { data: newEmployer, error: insertError } = await supabase
      .from('Employer')
      .insert({
        userId: session.user.id,
        company: null,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('Error creating employer:', insertError)
      return {
        success: false,
        error: 'Failed to create employer profile',
      }
    }

    return {
      success: true,
      employerId: newEmployer.id,
    }
  }

  return {
    success: true,
    employerId: employer.id,
  }
}
