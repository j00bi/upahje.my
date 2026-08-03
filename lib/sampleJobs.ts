export interface SampleMarketplaceJob {
  id: string
  title: string
  description: string
  rate: string
  location: string
  track: 'LABOUR' | 'TECHNICAL'
  status: 'OPEN'
  employerId: string
  talentId: null
  createdAt: Date
  categoryId: string
  employer: {
    company: string
    user: {
      id: string
      name: string
      email: string
    }
  }
  category: {
    id: string
    name: string
    emoji: string
  }
  isSample: true
}

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000)

export interface SampleJobFilters {
  search?: string
  category?: string
  location?: string
  track?: 'LABOUR' | 'TECHNICAL'
  status?: string
  limit?: number
}

const SEARCH_ALIASES: Record<string, string> = {
  angkat: 'helper mover delivery rider promoter event crew pembantu penghantaran',
  'rumah-taman': 'home garden painter grass cutter tukang cat potong rumput',
  cucian: 'cleaner cleaning laundry pembersih dobi',
  foto: 'photographer photography photo camera jurugambar fotografi',
}

export function getSampleMarketplaceJobs(): SampleMarketplaceJob[] {
  const employer = (id: string, company: string) => ({
    company,
    user: {
      id: `sample-user-${id}`,
      name: company,
      email: 'preview@upahje.my',
    },
  })

  return [
    {
      id: 'sample-1',
      title: 'Krew Sambilan untuk Majlis Kahwin',
      description: 'Perlukan 4 pembantu yang boleh dipercayai untuk majlis kahwin di KL Sabtu ini. Tugasan termasuk susun kerusi, bantu tetamu dan kemas selepas majlis. Makanan dan pengangkutan disediakan.',
      rate: 'RM 120 – 180',
      location: 'Kuala Lumpur',
      track: 'LABOUR',
      status: 'OPEN',
      employerId: 'sample-employer-1',
      talentId: null,
      createdAt: hoursAgo(2),
      categoryId: 'angkat',
      employer: employer('1', 'Majlis Harmoni'),
      category: { id: 'angkat', name: 'Angkat & Hantar', emoji: '📦' },
      isSample: true,
    },
    {
      id: 'sample-2',
      title: 'Promoter Sambilan Hujung Minggu',
      description: 'Mencari promoter untuk roadshow hujung minggu di AEON Shah Alam. Tugasan melibatkan product sampling dan berinteraksi dengan pelanggan. Latihan disediakan.',
      rate: 'RM 60 – 80',
      location: 'Shah Alam, Selangor',
      track: 'LABOUR',
      status: 'OPEN',
      employerId: 'sample-employer-2',
      talentId: null,
      createdAt: hoursAgo(5),
      categoryId: 'angkat',
      employer: employer('2', 'Roadshow MY'),
      category: { id: 'angkat', name: 'Kerja Sambilan', emoji: '🙋' },
      isSample: true,
    },
    {
      id: 'sample-3',
      title: 'Tukang Cat Rumah Teres',
      description: 'Perlukan tukang cat untuk rumah teres dua bilik di Kajang. Dinding sahaja; siling sudah siap. Peralatan sendiri diutamakan. Anggaran dua hari kerja.',
      rate: 'RM 200 – 400',
      location: 'Kajang, Selangor',
      track: 'LABOUR',
      status: 'OPEN',
      employerId: 'sample-employer-3',
      talentId: null,
      createdAt: hoursAgo(8),
      categoryId: 'rumah-taman',
      employer: employer('3', 'Pemilik Rumah Kajang'),
      category: { id: 'rumah-taman', name: 'Rumah & Taman', emoji: '🏠' },
      isSample: true,
    },
    {
      id: 'sample-4',
      title: 'Jurugambar untuk Produk E-dagang',
      description: 'Mencari jurugambar dengan studio asas untuk mengambil gambar 20 produk bagi kedai dalam talian. Kamera dan pencahayaan sendiri diperlukan.',
      rate: 'RM 250 – 500',
      location: 'Petaling Jaya',
      track: 'TECHNICAL',
      status: 'OPEN',
      employerId: 'sample-employer-4',
      talentId: null,
      createdAt: hoursAgo(10),
      categoryId: 'foto',
      employer: employer('4', 'Kedai Lokal'),
      category: { id: 'foto', name: 'Fotografi', emoji: '📸' },
      isSample: true,
    },
    {
      id: 'sample-5',
      title: 'Pembersih Pejabat Mingguan',
      description: 'Perlukan pembersih untuk pejabat kecil di KL Sentral, sekali seminggu selama tiga jam. Skop termasuk vakum, mop, meja dan pantri.',
      rate: 'RM 80 – 120',
      location: 'KL Sentral',
      track: 'LABOUR',
      status: 'OPEN',
      employerId: 'sample-employer-5',
      talentId: null,
      createdAt: hoursAgo(14),
      categoryId: 'cucian',
      employer: employer('5', 'Studio Sentral'),
      category: { id: 'cucian', name: 'Cucian & Dobi', emoji: '🧹' },
      isSample: true,
    },
    {
      id: 'sample-6',
      title: 'Rider Sambilan dengan Motosikal Sendiri',
      description: 'Rider penghantaran diperlukan untuk perniagaan F&B kecil di Cheras pada waktu puncak. Motosikal dan telefon pintar sendiri diperlukan.',
      rate: 'RM 50 – 100',
      location: 'Cheras, Kuala Lumpur',
      track: 'LABOUR',
      status: 'OPEN',
      employerId: 'sample-employer-6',
      talentId: null,
      createdAt: hoursAgo(20),
      categoryId: 'angkat',
      employer: employer('6', 'Dapur Cheras'),
      category: { id: 'angkat', name: 'Angkat & Hantar', emoji: '🏍️' },
      isSample: true,
    },
    {
      id: 'sample-7',
      title: 'Jurugambar Majlis Kahwin',
      description: 'Mencari jurugambar berpengalaman untuk liputan sehari penuh di Kuala Lumpur, termasuk foto candid, keluarga dan acara utama.',
      rate: 'RM 1,500 – 3,000',
      location: 'Kuala Lumpur',
      track: 'TECHNICAL',
      status: 'OPEN',
      employerId: 'sample-employer-7',
      talentId: null,
      createdAt: hoursAgo(26),
      categoryId: 'foto',
      employer: employer('7', 'Keluarga Nordin'),
      category: { id: 'foto', name: 'Fotografi', emoji: '📸' },
      isSample: true,
    },
    {
      id: 'sample-8',
      title: 'Jurugambar untuk Makan Malam Korporat',
      description: 'Perlukan jurugambar acara untuk makan malam korporat di Petaling Jaya. Liputan ucapan, networking dan foto berkumpulan selama empat jam.',
      rate: 'RM 500 – 1,000',
      location: 'Petaling Jaya',
      track: 'TECHNICAL',
      status: 'OPEN',
      employerId: 'sample-employer-8',
      talentId: null,
      createdAt: hoursAgo(30),
      categoryId: 'foto',
      employer: employer('8', 'PJ Business Network'),
      category: { id: 'foto', name: 'Fotografi', emoji: '📸' },
      isSample: true,
    },
    {
      id: 'sample-9',
      title: 'Sesi Fotografi Pra-perkahwinan',
      description: 'Mencari jurugambar kreatif untuk sesi pra-perkahwinan di Penang. Tiga jam di lokasi luar dengan dua pertukaran pakaian.',
      rate: 'RM 800 – 2,000',
      location: 'Penang',
      track: 'TECHNICAL',
      status: 'OPEN',
      employerId: 'sample-employer-9',
      talentId: null,
      createdAt: hoursAgo(36),
      categoryId: 'foto',
      employer: employer('9', 'Pasangan Penang'),
      category: { id: 'foto', name: 'Fotografi', emoji: '📸' },
      isSample: true,
    },
    {
      id: 'sample-10',
      title: 'Jurugambar Produk untuk Kedai Dalam Talian',
      description: 'Perlukan foto 30 produk dengan latar putih bersih untuk sebuah kedai dalam talian di Shah Alam. Studio lighting diperlukan.',
      rate: 'RM 200 – 400',
      location: 'Shah Alam',
      track: 'TECHNICAL',
      status: 'OPEN',
      employerId: 'sample-employer-10',
      talentId: null,
      createdAt: hoursAgo(44),
      categoryId: 'foto',
      employer: employer('10', 'Niaga Shah Alam'),
      category: { id: 'foto', name: 'Fotografi', emoji: '📸' },
      isSample: true,
    },
  ]
}

export function getFilteredSampleMarketplaceJobs(
  filters: SampleJobFilters = {}
): SampleMarketplaceJob[] {
  const search = filters.search?.trim().toLocaleLowerCase()
  const location = filters.location?.trim().toLocaleLowerCase()

  return getSampleMarketplaceJobs()
    .filter((job) => {
      if (filters.status && filters.status !== 'OPEN') return false
      if (filters.category && job.categoryId !== filters.category) return false
      if (filters.track && job.track !== filters.track) return false
      if (location && !job.location.toLocaleLowerCase().includes(location)) return false

      if (search) {
        const searchableText = [
          job.title,
          job.description,
          job.location,
          job.category.name,
          job.employer.company,
          SEARCH_ALIASES[job.categoryId] ?? '',
        ].join(' ').toLocaleLowerCase()

        if (!searchableText.includes(search)) return false
      }

      return true
    })
    .slice(0, filters.limit ?? 20)
}

export function getSampleMarketplaceJob(jobId: string) {
  return getSampleMarketplaceJobs().find((job) => job.id === jobId) ?? null
}
