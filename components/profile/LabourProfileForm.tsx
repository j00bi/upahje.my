'use client'

import { useState } from 'react'
import { LABOUR_CATEGORIES, type LabourCategoryId, Track } from '@/lib/domain'
import { ChevronDown, ChevronUp, Save } from 'lucide-react'

interface LabourProfileData {
  fullName?: string
  phone?: string
  location?: string
  categories?: LabourCategoryId[]
  rate?: string
  availability?: string
  bio?: string
  portfolioLinks?: string[]
  certifications?: string[]
}

interface LabourProfileFormProps {
  initialData?: LabourProfileData
  onSave?: (data: LabourProfileData) => Promise<void>
}

export function LabourProfileForm({ initialData, onSave }: LabourProfileFormProps) {
  const [data, setData] = useState<LabourProfileData>(initialData || { categories: [] })
  const [basicOpen, setBasicOpen] = useState(true)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customCert, setCustomCert] = useState('')

  const update = <K extends keyof LabourProfileData>(k: K, v: LabourProfileData[K]) =>
    setData(d => ({ ...d, [k]: v }))

  const toggleCat = (id: LabourCategoryId) => {
    const cur = data.categories || []
    update('categories', cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id])
  }

  const addCert = () => {
    if (!customCert.trim()) return
    const cur = data.certifications || []
    if (!cur.includes(customCert.trim())) {
      update('certifications', [...cur, customCert.trim()])
    }
    setCustomCert('')
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      if (onSave) {
        await onSave(data)
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Basic section */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <button
          onClick={() => setBasicOpen(!basicOpen)}
          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50/50 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <span className="font-semibold">Basic Info</span>
          </div>
          {basicOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {basicOpen && (
          <div className="px-6 pb-7 pt-2 border-t space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Full name"
                className="w-full border rounded-2xl px-5 py-3.5 text-lg"
                value={data.fullName || ''}
                onChange={e => update('fullName', e.target.value)}
              />
              <input
                placeholder="WhatsApp / Phone"
                type="tel"
                className="w-full border rounded-2xl px-5 py-3.5"
                value={data.phone || ''}
                onChange={e => update('phone', e.target.value)}
              />
            </div>

            <input
              placeholder="Main area / Location"
              className="w-full border rounded-2xl px-5 py-3.5"
              value={data.location || ''}
              onChange={e => update('location', e.target.value)}
            />

            <div>
              <div className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
                Services offered
              </div>
              <div className="flex flex-wrap gap-2">
                {LABOUR_CATEGORIES.map(c => {
                  const sel = (data.categories || []).includes(c.id)
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleCat(c.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-sm transition ${
                        sel
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <span>{c.emoji}</span>
                      <span>{c.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1 font-medium">Rate</div>
                <input
                  className="w-full border rounded-2xl px-5 py-3"
                  placeholder="RM 40–60"
                  value={data.rate || ''}
                  onChange={e => update('rate', e.target.value)}
                />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1 font-medium">Availability</div>
                <select
                  className="w-full border rounded-2xl px-5 py-3"
                  value={data.availability || ''}
                  onChange={e => update('availability', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option>Flexible (most days)</option>
                  <option>Weekdays only</option>
                  <option>Weekends only</option>
                  <option>Evenings only</option>
                </select>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-1 font-medium">Bio</div>
              <textarea
                className="w-full border rounded-2xl px-5 py-4 h-24 text-sm"
                placeholder="Reliable, own transport, 3 years experience..."
                value={data.bio || ''}
                onChange={e => update('bio', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Advanced section */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50/50 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏅</span>
            <span className="font-semibold">Advanced</span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Optional</span>
          </div>
          {advancedOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {advancedOpen && (
          <div className="px-6 pb-7 pt-2 border-t space-y-5">
            <div>
              <div className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
                Portfolio links
              </div>
              <div className="space-y-2">
                {(data.portfolioLinks || []).map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={link}
                      onChange={e => {
                        const updated = [...(data.portfolioLinks || [])]
                        updated[i] = e.target.value
                        update('portfolioLinks', updated)
                      }}
                      placeholder="https://..."
                      className="flex-1 border rounded-xl px-4 py-2 text-sm"
                    />
                    <button
                      onClick={() => update('portfolioLinks', (data.portfolioLinks || []).filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-red-500 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => update('portfolioLinks', [...(data.portfolioLinks || []), ''])}
                  className="text-teal-600 text-sm font-medium"
                >
                  + Add link
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
                Certifications
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {(data.certifications || []).map((cert, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                  >
                    {cert}
                    <button
                      onClick={() => update('certifications', (data.certifications || []).filter((_, idx) => idx !== i))}
                      className="ml-0.5 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={customCert}
                  onChange={e => setCustomCert(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCert()}
                  placeholder="Add certification (e.g. CIDB, SKM, etc.)"
                  className="flex-1 border rounded-xl px-4 py-2 text-sm"
                />
                <button
                  onClick={addCert}
                  disabled={!customCert.trim()}
                  className="px-4 py-2 border border-teal-600 text-teal-600 rounded-xl text-sm font-medium hover:bg-teal-50 disabled:opacity-40"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-3xl transition disabled:bg-slate-300 flex items-center justify-center gap-2"
      >
        {saving ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </span>
        ) : saved ? (
          <span className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Saved!
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Profile
          </span>
        )}
      </button>
    </div>
  )
}
