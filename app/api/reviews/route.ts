import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createReview } from '@/lib/reviews'

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { jobId, toUserId, rating, comment } = await request.json()

    if (!jobId || !toUserId || rating === undefined) {
      return NextResponse.json(
        { error: 'Job ID, user ID, and rating are required' },
        { status: 400 }
      )
    }

    const review = await createReview(
      jobId,
      session.user.id,
      toUserId,
      rating,
      comment
    )

    return NextResponse.json({
      success: true,
      review
    })
  } catch (error) {
    console.error('Error creating review:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}