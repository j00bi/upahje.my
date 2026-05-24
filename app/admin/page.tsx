import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Admin Dashboard</h1>
        <div className="grid gap-4">
          {[
            { href: '/admin/kyc', emoji: '🪪', label: 'KYC Review', desc: 'Review and verify talent MyKad submissions' },
            { href: '/admin/jobs', emoji: '💼', label: 'Jobs', desc: 'Manage job postings' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-4 hover:border-teal-400 hover:shadow-md transition-all"
            >
              <span className="text-4xl">{item.emoji}</span>
              <div>
                <div className="font-semibold text-slate-900 text-lg">{item.label}</div>
                <div className="text-sm text-slate-500">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}