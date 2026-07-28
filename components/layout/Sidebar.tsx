'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Shield
} from 'lucide-react'

interface SidebarProps {
  role?: 'TALENT' | 'EMPLOYER' | 'ADMIN'
}

const employerNavItems = [
  {
    title: 'Overview',
    href: '/dashboard/employer',
    icon: LayoutDashboard,
  },
  {
    title: 'Post Job',
    href: '/jobs/post',
    icon: Briefcase,
  },
  {
    title: 'Find Talents',
    href: '/talent',
    icon: Users,
  },
]

const talentNavItems = [
  {
    title: 'Overview',
    href: '/dashboard/talent',
    icon: LayoutDashboard,
  },
  {
    title: 'Find Jobs',
    href: '/jobs',
    icon: Briefcase,
  },
]

const adminNavItems = [
  {
    title: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'KYC Review',
    href: '/admin/kyc',
    icon: Users,
  },
]

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  
  // Determine which nav items to show based on role
  const navItems = role === 'EMPLOYER' ? employerNavItems :
                   role === 'TALENT' ? talentNavItems :
                   role === 'ADMIN' ? adminNavItems :
                   employerNavItems // default fallback

  return (
    <>
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-mid" aria-hidden="true" />
            <span className="font-bold text-lg text-slate-900">UpahJe.my</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-green-soft text-green-mid'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="text-xs text-slate-500 px-3">
            <p>© 2026 UpahJe.my</p>
            <p className="mt-1">Malaysian Freelance Marketplace</p>
          </div>
        </div>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid border-t border-slate-200 bg-white/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"
        style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
        aria-label="Dashboard navigation"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-2 text-[11px] font-medium',
                isActive ? 'bg-green-soft text-green-mid' : 'text-slate-600'
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
