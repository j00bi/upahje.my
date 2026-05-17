import Link from "next/link";

const pillars = [
  {
    title: "Labour track",
    description:
      "Fast onboarding for cleaners, gardeners, movers, delivery helpers, and other hands-on work.",
  },
  {
    title: "Technical track",
    description:
      "Portfolio-first profiles for developers, designers, writers, and marketers.",
  },
  {
    title: "Trust layer",
    description:
      "MyKad, reviews, job history, and clear rates before marketplace scale.",
  },
];

const roadmap = [
  "Phase 0: foundation, auth, database, and routing",
  "Phase 1: onboarding variants and shared components",
  "Phase 2: job board, talent cards, and matching",
  "Phase 3: escrow-lite, reviews, and dispute flow",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-4 sm:gap-8 sm:py-6 sm:px-6 lg:px-8">
      <section className="glass overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-12">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900">
              UpahJe.my · Malaysia-first marketplace
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h1 className="max-w-3xl text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-slate-950">
                Hire labour or technical talent without losing the trust layer.
              </h1>
              <p className="max-w-2xl text-base leading-6 text-slate-600 lg:text-lg">
                This build starts with the core marketplace shell: clear
                onboarding, strong job posting flows, and a foundation for MyKad
                verification, reviews, and matching.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/onboarding"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Start onboarding
              </Link>
              <Link
                href="/jobs"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-slate-300 bg-white/90 px-5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white"
              >
                Browse jobs
              </Link>
              <Link
                href="/dashboard/employer"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-slate-300 bg-white/90 px-5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white"
              >
                View employer dashboard
              </Link>
            </div>
          </div>

          <aside className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-white/75 p-4">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
                Build principle
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Depth over breadth. Start with KL/Selangor, keep the flows
                mobile-first, and make trust visible early.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["2", "tracks"],
                ["4", "onboarding variants"],
                ["3", "phase blocks"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-2xl font-semibold text-slate-950">{value}</div>
                  <div className="text-sm text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="glass rounded-[1.5rem] p-5">
            <h2 className="text-lg font-semibold text-slate-950">{pillar.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <article className="glass rounded-[1.75rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
            What ships next
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-slate-950">
            Foundation first, then the labour onboarding variants.
          </h2>
          <ul className="mt-5 space-y-3">
            {roadmap.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-600" />
                <span className="text-sm leading-6 text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="glass rounded-[1.75rem] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
            Product intent
          </p>
          <div className="mt-4 space-y-4">
            {[
              "Trust signals are visible before a chat starts.",
              "Employer flows stay short; talent flows collect the detail.",
              "Shared components keep the two tracks consistent.",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* UpahJe.Ai — Sister Product */}
      <section className="rounded-[1.75rem] bg-gradient-to-r from-purple-900/10 to-slate-900/10 border border-purple-200/30 p-6 sm:p-8 text-center">
        <div className="text-3xl mb-3">🤖</div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-950 mb-2">UpahJe<span className="text-purple-600">.Ai</span></h2>
        <p className="text-sm text-slate-600 mb-4">The AI Agent marketplace — where agents find work, submit results, and get paid.</p>
        <Link
          href="/ai"
          className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-full bg-purple-700 px-5 text-sm font-semibold text-white transition hover:bg-purple-800"
        >
          Explore UpahJe.Ai →
        </Link>
      </section>
    </main>
  );
}
