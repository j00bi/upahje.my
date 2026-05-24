import Link from 'next/link'
import Footer from '@/components/layout/Footer'

const faqs = [
  {
    q: 'Apa itu UpahJe?',
    a: 'UpahJe adalah platform hiring tempatan Malaysia yang menghubungkan clients dengan verified freelancers dan service providers. Clients boleh post kerja, compare profiles, dan bayar hanya bila puas hati.',
  },
  {
    q: 'Macam mana UpahJe melindungi bayaran saya?',
    a: 'UpahJe guna sistem escrow — bayaran client dipegang dengan selamat sehingga kerja siap dan diluluskan. Barulah duit dilepaskan kepada freelancer. Kalau kerja tak siap ikut persetujuan, client boleh dispute.',
  },
  {
    q: 'Adakah percuma untuk post kerja?',
    a: 'Ya. Post kerja adalah percuma. Anda hanya bayar apabila meluluskan kerja yang siap.',
  },
  {
    q: 'Macam mana nak jadi freelancer di UpahJe?',
    a: 'Daftar percuma, lengkapkan profil dengan portfolio dan skills, kemudian verify identiti anda. Lepas tu anda boleh mula apply untuk job yang sesuai.',
  },
  {
    q: 'Siapa yang boleh guna UpahJe?',
    a: 'Sesiapa yang berada di Malaysia — individu nak cari photographer, bisnes nak cari freelancer, atau pekerja nak cari pendapatan tambahan.',
  },
  {
    q: 'Berapa lama proses verification?',
    a: 'Verification biasanya mengambil masa 1-2 hari waktu kerja selepas dokumen dihantar. Anda akan diberitahu melalui email.',
  },
  {
    q: 'Apa jadi kalau kerja tak siap atau tak memuaskan?',
    a: 'Jika kerja tak siap ikut persetujuan, client boleh lodge dispute. Pasukan UpahJe akan mediate dan memastikan penyelesaian yang adil untuk kedua-dua pihak.',
  },
  {
    q: 'Macam mana cara pembayaran?',
    a: 'Kami support FPX dan DuitNow. Dana dipegang dalam escrow sehingga kerja diluluskan. Untuk client — yuran platform adalah RM0. Yuran freelancer akan ditolak daripada pembayaran sebelum dilepaskan.',
  },
  {
    q: 'Adakah UpahJe available di seluruh Malaysia?',
    a: 'Sekarang kami fokus di sekitar Lembah Klang dan Selangor. Tapi clients dan talent dari seluruh Malaysia dialu-alukan untuk mendaftar.',
  },
  {
    q: 'Macam mana nak contact support?',
    a: 'Email support@upahje.my atau DM Instagram/Facebook @UpahJe. Kami akan balas dalam 24 jam waktu kerja.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)]">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="section-label mb-3" style={{ color: 'var(--color-green-mid)' }}>
            FAQ
          </p>
          <h1 className="font-display-xl mb-4" style={{ color: 'var(--color-ink-deep)' }}>
            Soalan Lazim
          </h1>
          <p className="text-base mb-10" style={{ color: 'var(--color-body)' }}>
            Segala yang anda perlu tahu pasal UpahJe. Tak puas hati?{' '}
            <Link href="/contact" className="underline font-medium" style={{ color: 'var(--color-green-mid)' }}>
              Contact kami
            </Link>
            .
          </p>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-neutral-200 bg-white transition-all duration-200 open:border-emerald-200 open:shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-4 text-sm font-semibold text-neutral-900 hover:text-emerald-800 transition-colors">
                  {faq.q}
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform text-lg leading-none">
                    ▾
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-neutral-600 border-t border-neutral-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
