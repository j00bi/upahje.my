import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 sm:gap-6 px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
      <section className="glass rounded-[2rem] p-4 sm:p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-3 sm:space-y-4">
            <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-900">
              Onboarding
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950">
              Start with role, then track, then the profile depth.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Choose your path — whether you're hiring or looking for work.
            </p>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                'Pick your role — employer or talent',
                'Choose your work category',
                'Complete your profile',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 p-3 sm:p-4 text-sm text-slate-700">
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
