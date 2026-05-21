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
      return NextResponse.json(getSampleJobs())
    }

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Job fetch error, returning samples:', error)
    return NextResponse.json(getSampleJobs())
  }
}

/** Sample jobs shown when the marketplace is still bootstrapping */
function getSampleJobs() {
  return [
    {
      id: 'sample-1',
      title: 'Kakis for Wedding Event Crew',
      description: 'Need 4 reliable helpers for a wedding in KL this Saturday. Tasks include setting up chairs, serving guests, and packing after. Food and transport provided.',
      categories: ['Event', 'Part-Time'],
      location: 'Kuala Lumpur',
      rateMin: 120,
      rateMax: 180,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-2',
      title: 'Part-Time Promoter',
      description: 'Looking for energetic promoters for a weekend roadshow at AEON Shah Alam. Product sampling and customer engagement. Training provided.',
      categories: ['Retail', 'Promoter'],
      location: 'Shah Alam, Selangor',
      rateMin: 60,
      rateMax: 80,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-3',
      title: 'Tukang Cat Rumah',
      description: 'Need a painter for a 2-bedroom terrace house in Kajang. Walls only, ceiling already done. Own equipment preferred. Estimate 2 days work.',
      categories: ['Labour', 'Maintenance'],
      location: 'Kajang, Selangor',
      rateMin: 200,
      rateMax: 400,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-4',
      title: 'Photographer for Product Shoot',
      description: 'Looking for a photographer with basic studio setup to shoot 20 product SKUs for our online store. Must have own camera and lighting. Half-day shoot.',
      categories: ['Creative', 'Photography'],
      location: 'Petaling Jaya',
      rateMin: 250,
      rateMax: 500,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-5',
      title: 'Cleaner for Office Weekly',
      description: 'Need a reliable cleaner for a small office in KL Sentral. Once a week, 3 hours. Vacuum, mop, wipe desks, clean pantry. RM 80–120 per session.',
      categories: ['Cleaning', 'Part-Time'],
      location: 'KL Sentral',
      rateMin: 80,
      rateMax: 120,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-6',
      title: 'Part-Time Rider (Own Vehicle)',
      description: 'Delivery rider needed for a small F&B business in Cheras. Peak hours 11am–2pm and 5pm–8pm. Own motorcycle and smartphone required. RM 50–100 per shift.',
      categories: ['Delivery', 'Rider'],
      location: 'Cheras, KL',
      rateMin: 50,
      rateMax: 100,
      createdAt: new Date().toISOString(),
    },
    // Photography-specific sample jobs
    {
      id: 'sample-7',
      title: 'Wedding Photographer',
      description: 'Looking for a professional wedding photographer for a full-day wedding event in Kuala Lumpur. Must have experience with candid shots and formal portraits. Equipment provided.',
      categories: ['Photography', 'Wedding'],
      location: 'Kuala Lumpur',
      rateMin: 1500,
      rateMax: 3000,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-8',
      title: 'Event Photographer for Corporate Dinner',
      description: 'Need an event photographer for a corporate dinner in Petaling Jaya. Coverage of speeches, networking, and group photos. 4-hour evening event.',
      categories: ['Photography', 'Corporate'],
      location: 'Petaling Jaya',
      rateMin: 500,
      rateMax: 1000,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-9',
      title: 'Pre-wedding photoshoot',
      description: 'Looking for a creative photographer for a pre-wedding photoshoot in Penang. Outdoor locations preferred. 3-hour session with 2 outfit changes.',
      categories: ['Photography', 'Pre-Wedding'],
      location: 'Penang',
      rateMin: 800,
      rateMax: 2000,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-10',
      title: 'Product Photographer for Online Store',
      description: 'Need a product photographer for an online store in Shah Alam. Shooting 30 product items with clean white background. Must have studio lighting setup.',
      categories: ['Photography', 'E-commerce'],
      location: 'Shah Alam',
      rateMin: 200,
      rateMax: 400,
      createdAt: new Date().toISOString(),
    },
  ]
}
