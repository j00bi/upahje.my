import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-canvas-soft)] px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6" style={{ borderColor: 'rgba(14, 15, 12, 0.08)' }}>
          <span className="section-label inline-flex rounded-full bg-blue-100 px-3 py-1 text-blue-800">
            Onboarding
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Build the right marketplace profile first.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Clients and workers should not start with the same form. Pick the role,
            then only ask for the details that make the next step useful.
          </p>

          <div className="mt-6 space-y-3">
            {[
              ['Role', 'Employer or talent path'],
              ['Track', 'Labour quick-start or technical showcase'],
              ['Profile', 'Minimum details first, depth later'],
            ].map(([label, text]) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <span className="w-16 shrink-0 font-black text-blue-700">{label}</span>
                <span className="text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <OnboardingFlow />
        </div>
      </section>
    </main>
  )
}
