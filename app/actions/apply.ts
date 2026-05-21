'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function applyToJob(jobId: string, message: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'You must be logged in to apply' }
  }

  const { error } = await supabase
    .from('Application')
    .insert({
      jobId,
      applicantId: user.id,
      message: message || null,
      status: 'PENDING',
    })

  if (error) {
    console.error('Apply error:', error)
    return { success: false, error: 'Failed to submit application' }
  }

  revalidatePath(`/jobs/${jobId}`)
  return { success: true }
}
