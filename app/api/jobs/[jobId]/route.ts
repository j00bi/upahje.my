import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        employer: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
        category: { select: { id: true, name: true, emoji: true } },
      },
    })

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Job fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 })
  }
}