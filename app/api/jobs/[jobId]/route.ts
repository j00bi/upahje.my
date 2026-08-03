import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSampleMarketplaceJob } from '@/lib/sampleJobs'
import { previewDataEnabled } from '@/lib/security'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params

    if (previewDataEnabled()) {
      const previewJob = getSampleMarketplaceJob(jobId)
      if (previewJob) {
        return NextResponse.json(previewJob, {
          headers: { 'x-upahje-data-source': 'preview' },
        })
      }
    }

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

    return NextResponse.json(job, {
      headers: { 'x-upahje-data-source': 'live' },
    })
  } catch (error) {
    console.error('Job fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 503 })
  }
}
