export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden">
      <div className="flex-1">{children}</div>
    </div>
  )
}
