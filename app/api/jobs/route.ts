import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createJob } from '@/lib/actions/jobCreation'
import { getFilteredSampleMarketplaceJobs } from '@/lib/sampleJobs'
import { previewDataEnabled, assertSameOrigin } from '@/lib/security'

export async function POST(req: Request) {
  const originGuard = assertSameOrigin(req)
  if (originGuard) return originGuard

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
    const track = body.track === 'TECHNICAL' ? 'TECHNICAL' : 'LABOUR'

    const result = await createJob({
      title: typeof body.title === 'string' ? body.title : '',
      description: typeof body.description === 'string' ? body.description : '',
      rate,
      location: typeof body.location === 'string' ? body.location : '',
      track,
      categoryId,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, details: result.details ?? null },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, jobId: result.job!.id })
  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || undefined
  const category = searchParams.get('category') || undefined
  const location = searchParams.get('location') || undefined
  const track = searchParams.get('track') as 'LABOUR' | 'TECHNICAL' | undefined
  const status = searchParams.get('status') || 'OPEN'
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50)
  const fallbackFilters = { search, category, location, track, status, limit }

  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: status as 'OPEN' | 'MATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(category && { categoryId: category }),
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(track && { track: track as 'LABOUR' | 'TECHNICAL' }),
      },
      include: {
        employer: {
          include: {
            user: { select: { name: true } },
          },
        },
        category: { select: { id: true, name: true, emoji: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    if (jobs.length === 0) {
      if (!previewDataEnabled()) {
        return NextResponse.json({ error: 'No jobs found' }, { status: 404 })
      }
      return NextResponse.json(getFilteredSampleMarketplaceJobs(fallbackFilters), {
        headers: { 'x-upahje-data-source': 'preview' },
      })
    }

    return NextResponse.json(jobs, {
      headers: { 'x-upahje-data-source': 'live' },
    })
  } catch (error) {
    console.error('Job fetch error:', error)
    if (!previewDataEnabled()) {
      return NextResponse.json(
        { error: 'Failed to fetch jobs' },
        { status: 503 },
      )
    }
    return NextResponse.json(getFilteredSampleMarketplaceJobs(fallbackFilters), {
      headers: { 'x-upahje-data-source': 'preview' },
    })
  }
}
