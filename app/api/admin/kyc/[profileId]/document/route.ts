import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { getUserWithRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createAdminClient } from '@/lib/supabase/admin'

const KYC_BUCKET = 'kyc-documents'
const SIGNED_URL_TTL_SECONDS = 300

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const { user, role } = await getUserWithRole()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { profileId } = await params

    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { kycFileUrl: true },
    })

    if (!profile || !profile.kycFileUrl) {
      return NextResponse.json({ error: 'No KYC document on file.' }, { status: 404 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase.storage
      .from(KYC_BUCKET)
      .createSignedUrl(profile.kycFileUrl, SIGNED_URL_TTL_SECONDS)

    if (error || !data?.signedUrl) {
      console.error('KYC signed URL error:', error)
      return NextResponse.json({ error: 'Failed to generate document URL' }, { status: 500 })
    }

    return NextResponse.json({ signedUrl: data.signedUrl, expiresIn: SIGNED_URL_TTL_SECONDS })
  } catch (error) {
    console.error('Admin KYC document error:', error)
    return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 })
  }
}
