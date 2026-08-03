import Link from 'next/link'

export default function PayPage({ params }: { params: { jobId: string } }) {
  return (
    <div className="min-h-[70vh] bg-neutral-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl"
          aria-hidden="true"
        >
          🔒
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
          Payment unavailable
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-950">
          No payment has been created
        </h1>
        <p className="mt-4 leading-7 text-neutral-600">
          UpahJe will enable payment only after the selected talent and final
          project amount are confirmed from a recorded agreement. This job does
          not yet have a payment-ready agreement.
        </p>

        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
          We never calculate a charge from a public budget range or ask you to
          pay using placeholder job details.
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/jobs/${params.jobId}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
          >
            Return to job
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}
