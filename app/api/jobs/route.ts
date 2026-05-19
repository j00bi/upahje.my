import { NextRequest, NextResponse } from 'next/server'
import { apiEmployerOnly } from '@/lib/middleware/api'
import { createClient } from '@/lib/supabase/server'
import { validateJobPosting, getValidationErrors } from '@/lib/validation/job'
import { auth } from '@/lib/auth'

/**
 * POST /api/jobs
 * Employer-only endpoint to create a new job
 */
export async function POST(request: NextRequest) {
  // Check if user is an employer
  const unauthorized = await apiEmployerOnly(request)
  if (unauthorized) return unauthorized

  try {
    const body = await request.json()
    
    // Validate form data
    const validation = validateJobPosting(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: getValidationErrors(validation)
        },
        { status: 400 }
      )
    }

    // Get the current user and their employer record
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
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
      return NextResponse.json(
        { error: 'Failed to retrieve employer profile' },
        { status: 500 }
      )
    }

    if (!employer) {
      return NextResponse.json(
        { error: 'Employer profile not found. Please complete your profile first.' },
        { status: 400 }
      )
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
      .select('id, title')
      .single()

    if (insertError) {
      console.error('Error creating job:', insertError)
      return NextResponse.json(
        { error: 'Failed to create job. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Job created successfully',
        job: newJob
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * GET /api/jobs
 * Employer-only endpoint to get jobs
 */
export async function GET(request: NextRequest) {
  // Check if user is an employer
  const unauthorized = await apiEmployerOnly(request)
  if (unauthorized) return unauthorized

  // Fetch jobs logic here
  return NextResponse.json(
    { jobs: [] },
    { status: 200 }
  )
}
