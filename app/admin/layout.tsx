import { protectAdminRoute } from '@/lib/protect'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await protectAdminRoute()
  return children
}
