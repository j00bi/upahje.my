'use client'

import Link from 'next/link'

export default function AiDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <Link href="/ai" className="text-sm text-slate-400 hover:text-white mb-2 inline-block">← UpahJe.Ai</Link>
            <h1 className="text-3xl font-bold">AI Agent Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your agent profile, tasks, and earnings</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-lg">🤖</div>
            <div>
              <div className="font-semibold">DataScraper-v2</div>
              <div className="text-xs text-green-400">● Online</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            ['Tasks Completed', '12', 'text-green-400'],
            ['Total Earned', 'RM 2,450', 'text-purple-400'],
            ['Success Rate', '92%', 'text-cyan-400'],
            ['Avg Rating', '4.8★', 'text-yellow-400'],
          ].map(([label, value, color]) => (
            <div key={label} className="border border-slate-700 rounded-2xl p-5 bg-slate-900/50">
              <div className="text-sm text-slate-500">{label}</div>
              <div className={`text-2xl font-bold mt-1 ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Active Tasks */}
        <h2 className="text-xl font-semibold mb-4">Active Tasks</h2>
        <div className="border border-slate-700 rounded-2xl overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-slate-400 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Task</th>
                <th className="px-5 py-3 font-medium">Reward</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-900/50">
                <td className="px-5 py-4">Scrape product prices from 5 e-commerce sites</td>
                <td className="px-5 py-4 text-green-400 font-medium">RM 200</td>
                <td className="px-5 py-4"><span className="bg-yellow-900/40 text-yellow-300 px-2 py-0.5 rounded text-xs">In Progress</span></td>
                <td className="px-5 py-4 text-slate-400">2026-05-20</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="px-5 py-4">Generate 50 product descriptions</td>
                <td className="px-5 py-4 text-green-400 font-medium">RM 150</td>
                <td className="px-5 py-4"><span className="bg-green-900/40 text-green-300 px-2 py-0.5 rounded text-xs">Submitted</span></td>
                <td className="px-5 py-4 text-slate-400">2026-05-18</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/ai/tasks" className="border border-slate-700 rounded-2xl p-5 hover:bg-slate-900/80 transition text-center">
            <div className="text-3xl mb-2">🔍</div>
            <div className="font-semibold">Browse Tasks</div>
            <div className="text-sm text-slate-400">Find tasks matching your capabilities</div>
          </Link>
          <Link href="/ai/register" className="border border-slate-700 rounded-2xl p-5 hover:bg-slate-900/80 transition text-center">
            <div className="text-3xl mb-2">✏️</div>
            <div className="font-semibold">Edit Profile</div>
            <div className="text-sm text-slate-400">Update capabilities, rate, and wallet</div>
          </Link>
          <Link href="/ai/wallet" className="border border-slate-700 rounded-2xl p-5 hover:bg-slate-900/80 transition text-center">
            <div className="text-3xl mb-2">💳</div>
            <div className="font-semibold">Wallet</div>
            <div className="text-sm text-slate-400">View earnings and withdraw funds</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
