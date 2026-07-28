'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n'

const POPULAR = [
  { ms: 'Fotografi majlis', en: 'Wedding shoot', href: '/categories/photography' },
  { ms: 'Servis rumah', en: 'Home services', href: '/categories/home-services' },
  { ms: 'Bina website', en: 'Build a website', href: '/categories/web-design' },
]

const REQUEST_META = [
  { label: 'Petaling Jaya', icon: '⌖' },
  { label: 'Sabtu ini', icon: '◷' },
  { label: 'RM 600–800', icon: '◌' },
]

export default function HeroNew() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const { isEnglish } = useLanguage()

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const query = search.trim()
    if (query) router.push(`/jobs?search=${encodeURIComponent(query)}`)
  }

  return (
    <section className="marketplace-hero px-5 py-12 sm:px-6 md:py-20">
      <div className="marketplace-hero__glow marketplace-hero__glow--one" aria-hidden="true" />
      <div className="marketplace-hero__glow marketplace-hero__glow--two" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div>
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__dot" aria-hidden="true" />
            {isEnglish ? 'Local work marketplace' : 'Marketplace kerja tempatan'}
          </p>

          <h1 className="mt-6 max-w-3xl font-display-mega text-white">
            {isEnglish ? 'Need something done? ' : 'Ada kerja nak settle? '}
            <span className="text-[var(--color-green-soft)]">
              {isEnglish ? 'Find the right person.' : 'Cari orang yang betul.'}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            {isEnglish
              ? 'Describe what you need, compare local profiles, and choose with confidence—all in one place.'
              : 'Terangkan apa yang anda perlukan, bandingkan profil tempatan, dan pilih dengan lebih yakin—semua dalam satu tempat.'}
          </p>

          <form onSubmit={handleSearch} className="hero-search mt-8 max-w-xl" role="search">
            <label htmlFor="hero-service-search" className="sr-only">
              {isEnglish ? 'Search for a service or type of worker' : 'Cari servis atau jenis pekerja'}
            </label>
            <span className="hero-search__icon" aria-hidden="true">⌕</span>
            <input
              id="hero-service-search"
              type="text"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder={
                isEnglish
                  ? 'Example: photographer, cleaner, web developer'
                  : 'Contoh: jurugambar, cleaner, web developer'
              }
            />
            <button type="submit">{isEnglish ? 'Search' : 'Cari servis'}</button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <span>{isEnglish ? 'Popular:' : 'Popular:'}</span>
            {POPULAR.map(item => (
              <Link key={item.href} href={item.href} className="hero-popular-chip">
                {isEnglish ? item.en : item.ms}
              </Link>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/jobs/post" className="hero-primary-action">
              {isEnglish ? 'I want to hire' : 'Saya nak upah orang'} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/auth/signup?role=talent" className="hero-secondary-action">
              {isEnglish ? 'I want to find work' : 'Saya nak cari kerja'}
            </Link>
          </div>

          <ul
            className="hero-confidence mt-9"
            aria-label={isEnglish ? 'How UpahJe helps you choose' : 'Cara UpahJe membantu anda membuat pilihan'}
          >
            <li><span aria-hidden="true">✓</span> {isEnglish ? 'Brief, location, and budget in one place' : 'Brief, lokasi dan bajet dalam satu tempat'}</li>
            <li><span aria-hidden="true">✓</span> {isEnglish ? 'Review profiles and portfolios before choosing' : 'Semak profil dan portfolio sebelum pilih'}</li>
            <li><span aria-hidden="true">✓</span> {isEnglish ? 'Built for getting work done in Malaysia' : 'Dibina untuk urusan kerja di Malaysia'}</li>
          </ul>
        </div>

        <div
          className="hero-workspace"
          aria-label={isEnglish ? 'Example hiring flow' : 'Contoh aliran mencari pekerja'}
        >
          <div className="hero-workspace__topline">
            <span>{isEnglish ? 'SAMPLE BRIEF' : 'CONTOH BRIEF'}</span>
            <span className="hero-workspace__status">
              <i aria-hidden="true" /> {isEnglish ? 'Ready to review' : 'Sedia untuk disemak'}
            </span>
          </div>

          <div className="hero-brief-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="hero-card-kicker">{isEnglish ? 'Product photography' : 'Fotografi produk'}</p>
                <h2>{isEnglish ? 'New menu photos for a café' : 'Gambar menu baru untuk kafe'}</h2>
              </div>
              <span className="hero-brief-card__emoji" aria-hidden="true">📸</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--color-body)]">
              {isEnglish
                ? 'Need 20 clean images for a menu and Instagram. A basic studio or your own lighting is required.'
                : 'Perlukan 20 gambar bersih untuk menu dan Instagram. Studio asas atau pencahayaan sendiri diperlukan.'}
            </p>
            <div className="hero-brief-meta mt-5">
              {REQUEST_META.map(item => (
                <span key={item.label}><i aria-hidden="true">{item.icon}</i>{item.label}</span>
              ))}
            </div>
          </div>

          <div className="hero-match-label">
            <span>{isEnglish ? 'Matches you can review' : 'Padanan yang boleh anda semak'}</span>
            <Link href="/talent">{isEnglish ? 'View talent →' : 'Lihat talent →'}</Link>
          </div>

          <div className="hero-match-stack">
            <Link href="/talent/aina-photography" className="hero-match-card hero-match-card--featured">
              <span className="hero-avatar hero-avatar--aina" aria-hidden="true">AR</span>
              <span className="min-w-0 flex-1">
                <strong>Aina Razali <b>✓</b></strong>
                <small>Photographer · Kuala Lumpur</small>
              </span>
              <em>RM 800/day</em>
            </Link>
            <Link href="/talent/danial-studio" className="hero-match-card">
              <span className="hero-avatar hero-avatar--danial" aria-hidden="true">DH</span>
              <span className="min-w-0 flex-1">
                <strong>Danial Harith <b>✓</b></strong>
                <small>Videographer · Petaling Jaya</small>
              </span>
              <em>RM 1,200/day</em>
            </Link>
          </div>

          <p className="hero-workspace__note">
            {isEnglish
              ? 'A visual example of the UpahJe flow—not a live job offer.'
              : 'Contoh visual aliran UpahJe—bukan tawaran langsung.'}
          </p>
        </div>
      </div>
    </section>
  )
}
