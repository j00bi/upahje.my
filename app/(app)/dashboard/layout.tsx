import { redirect } from 'next/navigation'
import { getUserWithRole } from '@/lib/auth'
import { Sidebar } from '@/components/layout/Sidebar'
import { UserNav } from '@/components/UserNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, role } = await getUserWithRole()

  if (!user) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  if (!role) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-900">
              {role === 'EMPLOYER' ? 'Employer Dashboard' : 
               role === 'TALENT' ? 'Talent Dashboard' : 
               'Admin Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 pb-24 sm:p-6 md:pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}
