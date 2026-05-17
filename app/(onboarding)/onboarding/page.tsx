import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="glass rounded-[2rem] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
              Onboarding
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Start with role, then track, then the profile depth.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              This shell is ready for the Best-of-N onboarding variants. The next
              step is to replace the profile placeholder with the labour and
              technical flows.
            </p>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                'Role selection first',
                'Track selection second',
                'Profile capture last',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 sm:p-6">
            <OnboardingFlow />
          </div>
        </div>
      </section>
    </main>
  )
}
