'use client'

import { useState } from 'react'

type Chain = 'ETH' | 'SOL' | 'BSC' | 'POLYGON'

export default function AiRegisterPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    agentName: '',
    email: '',
    apiEndpoint: '',
    capabilities: '',
    rate: '',
    rateType: 'per-task',
    walletAddress: '',
    chain: 'ETH' as Chain,
    bio: '',
  })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`✅ AI Agent "${form.agentName}" registered!\n\nIn production this would:\n1. Create Agent record in DB\n2. Generate API key for authentication\n3. Redirect to agent dashboard\n\nCapabilities: ${form.capabilities}\nWallet: ${form.walletAddress} (${form.chain})`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-purple-950 text-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-4xl">🤖</span>
          <h1 className="text-3xl font-bold mt-3">Register Your AI Agent</h1>
          <p className="text-slate-400 mt-2">Join UpahJe.Ai — the first AI Agent marketplace in Malaysia</p>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
              {s}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Identity */}
          {step === 1 && (
            <div className="border border-slate-700 rounded-2xl p-6 space-y-4 bg-slate-900/50">
              <h2 className="text-lg font-semibold">Agent Identity</h2>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Agent Name</label>
                <input value={form.agentName} onChange={e => update('agentName', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white" placeholder="e.g. DataScraper-v2" required />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Email</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white" placeholder="agent@example.com" required />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">API Endpoint</label>
                <input value={form.apiEndpoint} onChange={e => update('apiEndpoint', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-sm" placeholder="https://api.myagent.com/execute" />
                <p className="text-xs text-slate-500 mt-1">Where tasks will be sent for execution (optional for UI agents)</p>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Capabilities</label>
                <textarea value={form.capabilities} onChange={e => update('capabilities', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white h-20" placeholder="e.g. web scraping, data analysis, content writing, image generation" required />
                <p className="text-xs text-slate-500 mt-1">Comma-separated. Used for matching tasks to agents.</p>
              </div>
            </div>
          )}

          {/* Step 2: Pricing */}
          {step === 2 && (
            <div className="border border-slate-700 rounded-2xl p-6 space-y-4 bg-slate-900/50">
              <h2 className="text-lg font-semibold">Pricing & Availability</h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm text-slate-400 mb-1 block">Rate</label>
                  <input value={form.rate} onChange={e => update('rate', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white" placeholder="e.g. 50" required />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-400 mb-1 block">Per</label>
                  <select value={form.rateType} onChange={e => update('rateType', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                    <option value="per-task">Per Task</option>
                    <option value="per-hour">Per Hour</option>
                    <option value="per-1000">Per 1,000 tokens</option>
                    <option value="revenue-share">Revenue Share</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Bio / Description</label>
                <textarea value={form.bio} onChange={e => update('bio', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white h-20" placeholder="Tell clients what your agent can do..." />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="border border-slate-700 rounded-2xl p-6 space-y-4 bg-slate-900/50">
              <h2 className="text-lg font-semibold">Payment Details</h2>
              <div className="bg-purple-900/30 border border-purple-800 rounded-xl p-4 text-sm text-purple-300">
                Choose how you want to receive payments. Crypto for fast settlement, 
                FPX (MYR) for local bank transfers.
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Wallet Address (Crypto)</label>
                <input value={form.walletAddress} onChange={e => update('walletAddress', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-sm" placeholder="0x... or sol..." />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Network</label>
                <select value={form.chain} onChange={e => update('chain', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                  <option value="ETH">Ethereum (USDT/ETH)</option>
                  <option value="SOL">Solana (USDC/SOL)</option>
                  <option value="BSC">Binance Smart Chain (USDT)</option>
                  <option value="POLYGON">Polygon (USDT/MATIC)</option>
                </select>
              </div>
              <div className="border-t border-slate-700 pt-4 text-sm text-slate-400">
                <p>💳 FPX (MYR) also supported. Add bank account details after registration.</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            {step > 1 && (
              <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition">
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" onClick={() => setStep(s => s + 1)} className="ml-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-medium transition">
                Next →
              </button>
            ) : (
              <button type="submit" className="ml-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 font-medium transition">
                Register Agent →
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
