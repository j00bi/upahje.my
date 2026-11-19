/** UI copy per language. Article copy lives in the article files. */
export const COPY = {
  en: {
    site: 'UpahJe.my',
    tagline: 'Plain answers about technology for Malaysian small businesses.',
    intro:
      'Short, sourced articles about the tech decisions a small business actually makes: what the words mean, what to buy, and how to pay for it without getting burned.',
    whoTitle: 'Who this is for',
    whoBody:
      'Owners and managers of Malaysian small businesses who are hiring for, or buying, technical work — and the freelancers on the other side of that table.',
    concepts: 'Concept index',
    journal: 'Articles',
    all: 'All',
    latest: 'Latest',
    read: 'min read',
    updated: 'Updated',
    published: 'Published',
    sources: 'Sources',
    back: 'All articles',
    categories: 'Browse by concept',
    alsoIn: 'In the other language',
    faq: 'FAQ',
    empty: 'No articles published yet.',
    langSwitch: 'Read in',
  },
  ms: {
    site: 'UpahJe.my',
    tagline: 'Jawapan mudah tentang teknologi untuk perniagaan kecil Malaysia.',
    intro:
      'Artikel pendek bersumber tentang keputusan teknologi yang sebenarnya dibuat perniagaan kecil: maksud istilah, apa yang perlu dibeli, dan cara membayar tanpa tertipu.',
    whoTitle: 'Untuk siapa',
    whoBody:
      'Pemilik dan pengurus perniagaan kecil Malaysia yang mengupah atau membeli kerja teknikal — dan pekerja bebas di seberang meja itu.',
    concepts: 'Indeks konsep',
    journal: 'Artikel',
    all: 'Semua',
    latest: 'Terkini',
    read: 'min baca',
    updated: 'Dikemas kini',
    published: 'Diterbitkan',
    sources: 'Sumber',
    back: 'Semua artikel',
    categories: 'Ikut konsep',
    alsoIn: 'Dalam bahasa lain',
    faq: 'Soalan lazim',
    empty: 'Belum ada artikel diterbitkan.',
    langSwitch: 'Baca dalam',
  },
}

export const copyFor = (lang: string) => COPY[lang === 'ms' ? 'ms' : 'en']
