import NavBar from '@/components/layout/NavBar'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden">
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
