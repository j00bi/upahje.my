'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LABOUR_CATEGORIES, TECHNICAL_CATEGORIES } from '@/lib/domain'
import type { Track } from '@/lib/domain'
import { useLanguage } from '@/lib/i18n'

interface PostJobFormProps {
  session?: { user: { id: string } } | null
  onSuccess?: (jobId: string) => void
}

const CATEGORY_NAMES_EN: Record<string, string> = {
  'rumah-taman': 'Home & Garden',
  haiwan: 'Pet Care',
  cucian: 'Cleaning & Laundry',
  angkat: 'Moving & Delivery',
  masakan: 'Cooking & Catering',
  jagaan: 'Care & Companionship',
  kereta: 'Vehicle Repair',
  elektrik: 'Electrical & Plumbing',
  karpet: 'Carpet & Sofa Cleaning',
  foto: 'Event Photography',
  design: 'Design & Creative',
  webdev: 'Web & App Development',
  marketing: 'Digital Marketing',
  content: 'Content & Writing',
  data: 'Data & AI',
  business: 'Business & Finance',
  video: 'Video & Motion',
  photo: 'Commercial Photography',
  itsupport: 'IT Support',
  social: 'Social Media Management',
}

export function PostJobForm({ session, onSuccess }: PostJobFormProps) {
  const router = useRouter()
  const { isEnglish } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    location: '',
    rateMin: '',
    rateMax: '',
    track: 'LABOUR' as Track,
  })

  useEffect(() => {
    const pending = sessionStorage.getItem('pendingJobPost')
    if (!pending) return

    try {
      const saved = JSON.parse(pending)
      setForm((current) => ({ ...current, ...saved }))
    } catch {
      sessionStorage.removeItem('pendingJobPost')
    }
  }, [])

  const update = (k: string, v: string) => {
    setForm((current) => ({
      ...current,
      [k]: v,
      ...(k === 'track' ? { categoryId: '' } : {}),
    }))
  }

  const budgetValid =
    !form.rateMin ||
    !form.rateMax ||
    Number(form.rateMax) >= Number(form.rateMin)
  const isValid = Boolean(
    form.title.trim().length >= 3 &&
    form.categoryId &&
    form.location.trim() &&
    budgetValid
  )
  const completedRequiredFields = [
    form.title.trim().length >= 3,
    Boolean(form.categoryId),
    Boolean(form.location.trim()),
  ].filter(Boolean).length
  const completionPercent = Math.round((completedRequiredFields / 3) * 100)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    // If not authenticated, redirect to sign-in preserving form intent
    if (!session) {
      sessionStorage.setItem('pendingJobPost', JSON.stringify(form))
      router.push('/auth/signin?callbackUrl=/jobs/post')
      return
    }

    setLoading(true)
    setError(null)

    const rate = form.rateMin && form.rateMax
      ? `RM${form.rateMin} – RM${form.rateMax}`
      : form.rateMin ? `RM${form.rateMin}+` : (isEnglish ? 'Negotiable' : 'Boleh dirunding')

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          categoryId: form.categoryId,
          location: form.location.trim(),
          rateMin: form.rateMin,
          rateMax: form.rateMax,
          track: form.track,
          rate,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        sessionStorage.removeItem('pendingJobPost')
        onSuccess?.(data.jobId)
        router.push(`/jobs/${data.jobId}`)
      } else if (res.status === 401) {
        // Token expired or session lost
        sessionStorage.setItem('pendingJobPost', JSON.stringify(form))
        router.push('/auth/signin?callbackUrl=/jobs/post')
      } else {
        setError(data.error ?? (isEnglish ? 'Failed to post the job. Please try again.' : 'Kerja tidak dapat diterbitkan. Cuba lagi.'))
      }
    } catch {
      setError(isEnglish ? 'Network error. Please check your connection.' : 'Ralat rangkaian. Semak sambungan anda.')
    } finally {
      setLoading(false)
    }
  }

  const categories = form.track === 'LABOUR' ? LABOUR_CATEGORIES : TECHNICAL_CATEGORIES

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold">
          <span className="text-emerald-900">
            {isEnglish ? 'Brief readiness' : 'Kesiapan brief'}
          </span>
          <span className="tabular-nums text-emerald-700">
            {completedRequiredFields}/3
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-100"
          role="progressbar"
          aria-label={isEnglish ? 'Required job details completed' : 'Butiran kerja wajib yang lengkap'}
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={completedRequiredFields}
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs leading-5 text-emerald-800/70">
          {isValid
            ? (isEnglish ? 'Ready for your review before publishing.' : 'Sedia untuk anda semak sebelum diterbitkan.')
            : (isEnglish ? 'Complete the title, category, and location.' : 'Lengkapkan tajuk, kategori, dan lokasi.')}
        </p>
      </div>

      {/* Track selector */}
      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-slate-700">
          {isEnglish ? 'Type of work' : 'Jenis kerja'}
        </legend>
        <div className="flex gap-3">
        {(['LABOUR', 'TECHNICAL'] as Track[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => update('track', t)}
            aria-pressed={form.track === t}
            className={`flex-1 py-3 rounded-2xl border-2 text-sm font-medium transition ${
form.track === t
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            {t === 'LABOUR'
              ? (isEnglish ? '🛠️ Physical work' : '🛠️ Kerja fizikal')
              : (isEnglish ? '💻 Technical' : '💻 Teknikal')}
          </button>
        ))}
        </div>
      </fieldset>

      {/* Title */}
      <div>
        <label htmlFor="job-title" className="block text-sm font-medium text-slate-700 mb-1.5">
          {isEnglish ? 'Job title *' : 'Tajuk kerja *'}
        </label>
        <input
          id="job-title"
          type="text"
          value={form.title}
          onChange={e => update('title', e.target.value)}
          placeholder={isEnglish ? 'e.g. Need a grass cutter this Saturday' : 'cth. Perlukan pemotong rumput Sabtu ini'}
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          maxLength={120}
          required
        />
      </div>

      {/* Category */}
      <fieldset>
        <legend className="block text-sm font-medium text-slate-700 mb-1.5">
          {isEnglish ? 'Category *' : 'Kategori *'}
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => update('categoryId', cat.id)}
              aria-pressed={form.categoryId === cat.id}
              className={`p-3 rounded-2xl border text-sm text-left transition ${
                form.categoryId === cat.id
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-medium'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="ml-1.5">
                {isEnglish ? (CATEGORY_NAMES_EN[cat.id] ?? cat.name) : cat.name}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Location */}
      <div>
        <label htmlFor="job-location" className="block text-sm font-medium text-slate-700 mb-1.5">
          {isEnglish ? 'Location *' : 'Lokasi *'}
        </label>
        <input
          id="job-location"
          type="text"
          value={form.location}
          onChange={e => update('location', e.target.value)}
          placeholder={isEnglish ? 'e.g. Kajang, Selangor' : 'cth. Kajang, Selangor'}
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
      </div>

      {/* Budget range */}
      <div>
        <label htmlFor="job-budget-min" className="block text-sm font-medium text-slate-700 mb-1.5">
          {isEnglish ? 'Budget (RM, optional)' : 'Bajet (RM, pilihan)'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              id="job-budget-min"
              aria-label={isEnglish ? 'Minimum budget in ringgit' : 'Bajet minimum dalam ringgit'}
              type="number"
              value={form.rateMin}
              onChange={e => update('rateMin', e.target.value)}
              placeholder={isEnglish ? 'Min' : 'Minimum'}
              min="0"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              id="job-budget-max"
              aria-label={isEnglish ? 'Maximum budget in ringgit' : 'Bajet maksimum dalam ringgit'}
              type="number"
              value={form.rateMax}
              onChange={e => update('rateMax', e.target.value)}
              placeholder={isEnglish ? 'Max' : 'Maksimum'}
              min="0"
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
        {!budgetValid && (
          <p className="mt-2 text-sm text-red-700" role="alert">
            {isEnglish
              ? 'Maximum budget must be equal to or higher than the minimum.'
              : 'Bajet maksimum mesti sama atau lebih tinggi daripada bajet minimum.'}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="job-description" className="block text-sm font-medium text-slate-700 mb-1.5">
          {isEnglish ? 'Job details (optional)' : 'Butiran kerja (pilihan)'}
        </label>
        <textarea
          id="job-description"
          value={form.description}
          onChange={e => update('description', e.target.value)}
          placeholder={
            isEnglish
              ? "Describe the work, timing, requirements, and anything talent should bring..."
              : 'Terangkan skop, masa, keperluan, dan apa-apa peralatan yang talent perlu bawa...'
          }
          className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          maxLength={1000}
        />
        <p className="mt-1 text-xs text-slate-400 text-right">{form.description.length}/1000</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || loading}
        aria-describedby="job-submit-help"
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {loading
          ? (isEnglish ? 'Publishing...' : 'Sedang diterbitkan...')
          : (isEnglish ? 'Review and post job' : 'Semak dan post kerja')}
      </button>

      <p id="job-submit-help" className="text-center text-xs text-slate-500">
        {!isValid
          ? (isEnglish ? 'Add a title, category, and location to continue.' : 'Tambah tajuk, kategori, dan lokasi untuk teruskan.')
          : session
            ? (isEnglish ? 'Your job will be visible immediately after publishing.' : 'Kerja anda akan dipaparkan sebaik sahaja diterbitkan.')
            : (isEnglish ? 'Your draft will be saved while you sign in.' : 'Draf anda akan disimpan semasa anda log masuk.')}
      </p>
    </form>
  )
}
