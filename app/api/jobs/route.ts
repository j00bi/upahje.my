import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createJob } from '@/lib/actions/jobCreation'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const categories = Array.isArray(body.categories) ? body.categories : []
    const categoryId = typeof body.categoryId === 'string' && body.categoryId.trim()
      ? body.categoryId.trim()
      : typeof categories[0] === 'string'
        ? categories[0]
        : ''
    const rateMin = typeof body.rateMin === 'string' ? body.rateMin.trim() : ''
    const rateMax = typeof body.rateMax === 'string' ? body.rateMax.trim() : ''
    const rate = rateMin && rateMax
      ? `RM${rateMin} - RM${rateMax}`
      : rateMin || rateMax || 'Negotiable'

    const result = await createJob({
      title: typeof body.title === 'string' ? body.title : '',
      description: typeof body.description === 'string' ? body.description : '',
      rate,
      location: typeof body.location === 'string' ? body.location : '',
      track: 'LABOUR',
      categoryId,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, details: result.details ?? null },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, jobId: result.job.id })
  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: 'OPEN' },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Job fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}
