import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const labourCategories = [
  { name: 'Rumah & Taman', emoji: '🏠' },
  { name: 'Haiwan Peliharaan', emoji: '🐾' },
  { name: 'Cucian & Dobi', emoji: '👕' },
  { name: 'Angkat & Hantar', emoji: '📦' },
  { name: 'Masakan & Katering', emoji: '🍳' },
  { name: 'Jagaan & Teman', emoji: '👶' },
  { name: 'Baik Pulih Kenderaan', emoji: '🔧' },
  { name: 'Elektrik & Plumbing', emoji: '⚡' },
  { name: 'Cuci Karpet & Sofa', emoji: '🛋️' },
  { name: 'Fotografi Majlis', emoji: '📷' },
]

const technicalCategories = [
  { name: 'Design & Kreatif', emoji: '🎨' },
  { name: 'Web & App Dev', emoji: '💻' },
  { name: 'Pemasaran Digital', emoji: '📣' },
  { name: 'Kandungan & Penulisan', emoji: '✍️' },
  { name: 'Data & AI', emoji: '📊' },
  { name: 'Perniagaan & Kewangan', emoji: '🗂️' },
  { name: 'Video & Motion', emoji: '🎬' },
  { name: 'Fotografi Komersil', emoji: '📸' },
  { name: 'Sokongan IT', emoji: '🖥️' },
  { name: 'Pengurusan Media Sosial', emoji: '📱' },
]

async function main() {
  console.log('🌱 Seeding categories...')

  // Labour categories
  for (const cat of labourCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        emoji: cat.emoji,
        track: 'LABOUR',
      },
    })
  }

  // Technical categories
  for (const cat of technicalCategories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        emoji: cat.emoji,
        track: 'TECHNICAL',
      },
    })
  }

  console.log('✅ Categories seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
