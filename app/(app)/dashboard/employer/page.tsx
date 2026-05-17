import { JobCard } from '@/components/jobs/JobCard'

export default function EmployerDashboard() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="glass rounded-[2rem] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">
              Employer dashboard
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Post jobs, review matches, and keep the trust layer visible.
            </h1>
            <p className="text-sm leading-6 text-slate-600">
              This shell is intentionally lightweight until auth and matching are wired in.
            </p>
          </div>
          <button className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800">
            Post New Job
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="glass rounded-[1.75rem] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Your Active Jobs</h2>
              <p className="text-sm text-slate-600">Current postings and their status.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <JobCard
              id="job-1"
              title="Need grass cutter this weekend"
              category="Rumah & Taman"
              location="Ampang, KL"
              budget="RM 80 - 120"
              status="Open"
              postedDate="2 days ago"
            />
            <JobCard
              id="job-2"
              title="Weekly house cleaning"
              category="Cucian & Dobi"
              location="Bangsar, KL"
              budget="RM 150 / visit"
              status="IN_PROGRESS"
              postedDate="1 week ago"
            />
          </div>
        </article>

        <aside className="glass rounded-[1.75rem] p-6">
          <h2 className="text-lg font-semibold text-slate-950">Recent Matches</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Matched talents will appear here once the matching layer is connected.
          </p>
          <div className="mt-5 space-y-3">
            {[
              "Trust score and verification badges",
              "Matching explanation and rate fit",
              "Quick contact and shortlist actions",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}
