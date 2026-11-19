'use client'

/**
 * HermesEvaluation - Winner Selection / Evaluation Surface (Track B)
 * 
 * This component is designed to make the full Best-of-N (Labour 4 + Technical 3 + Employer 3)
 * instantly scannable for Hermes to declare winners.
 * 
 * TODOs for this turn:
 * - Add structured comparison (strengths, mobile notes, complexity, trust signals)
 * - Add "Recommend for Production" badges + rationale
 * - Add simple voting / selection UI for Hermes
 * - Summary table at the bottom
 */

export function HermesEvaluation() {
  return (
    <div className="border border-amber-200 bg-amber-50/50 rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-amber-600">👁️</div>
        <div>
          <div className="font-semibold text-amber-900">Hermes Evaluation Mode</div>
          <div className="text-xs text-amber-700">For official winner selection</div>
        </div>
      </div>

      <div className="text-sm text-amber-800 mb-4">
        This surface will consolidate all 10 variants with clear comparison data so Hermes can pick the production winners quickly.
      </div>

      <div className="text-xs bg-white border border-amber-200 p-3 rounded-2xl text-amber-700">
        🚧 Work in progress — being built in parallel with TalentCard + profile polish (Track A).
        <br />
        Next: Add variant comparison table + selection controls.
      </div>

      <button 
        onClick={() => {
          // Placeholder for now
          alert("Winner selection UI coming in next iteration. For now, use the live preview cards above.")
        }}
        className="mt-4 text-xs px-4 py-2 bg-amber-600 text-white rounded-2xl hover:bg-amber-700"
      >
        Open Full Evaluation View (stub)
      </button>
    </div>
  )
}
