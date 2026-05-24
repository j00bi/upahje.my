'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Shield,
  UserRound,
  PlusCircle,
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
    title: 'My Jobs',
    href: '/dashboard/employer/jobs',
    icon: Briefcase,
  },
  {
    title: 'Applications',
    href: '/dashboard/employer/applications',
    icon: Users,
  },
  {
    title: 'Post Job',
    href: '/jobs/post',
    icon: PlusCircle,
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
  {
    title: 'My Applications',
    href: '/dashboard/talent/applications',
    icon: Users,
  },
  {
    title: 'Profile',
    href: '/talent/profile',
    icon: UserRound,
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
    icon: Shield,
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-green-mid" />
          <span className="font-bold text-lg text-slate-900">UpahJe.my</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-green-soft text-green-mid'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <item.icon className="h-5 w-5" />
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
  )
}
