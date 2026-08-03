import { auth } from '@/lib/auth'
import PostJobExperience from './PostJobExperience'

export const dynamic = 'force-dynamic'

export default async function PostJobPage() {
  const session = await auth()

  return <PostJobExperience session={session} />
}
