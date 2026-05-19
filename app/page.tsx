import Image from 'next/image'

export default function Welcome() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafcfb]">
      <div className="flex flex-col items-center gap-8 px-6">
        {/* Kimi-rendered handshake-in-U logo */}
        <Image
          src="/logo.svg"
          alt="UpahJe"
          className="h-56 w-auto md:h-72"
          width={320}
          height={320}
          />

        {/* Extremely minimal — logo only, as requested */}
        <div className="text-center">
          <p className="text-[11px] font-medium tracking-[0.2em] text-slate-400">
            UP AH JE
          </p>
        </div>
      </div>

      {/* Subtle entry point — click anywhere to continue */}
      <a
        href="/onboarding"
        className="absolute inset-0"
        aria-label="Enter UpahJe"
      />
    </main>
  )
}
