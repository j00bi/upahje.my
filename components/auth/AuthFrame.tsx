'use client'

import MarketplaceCanvasPanel from '@/components/ui/MarketplaceCanvasPanel'

export default function AuthFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-stretch overflow-hidden rounded-[34px] border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(11,35,24,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden p-3 lg:block">
          <MarketplaceCanvasPanel variant="auth" />
        </div>
        <div className="flex items-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
