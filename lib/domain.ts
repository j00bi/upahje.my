export type Track = "LABOUR" | "TECHNICAL" | "PHOTOGRAPHY";

export type Role = "employer" | "talent";

/**
 * LABOUR_CATEGORIES and TECHNICAL_CATEGORIES
 * The **posting-form** category set — used for /jobs/post, /jobs filters, and onboarding.
 *
 * These are NOT the same as MARKETPLACE_CATEGORIES in lib/categories.ts.
 * The marketplace categories are the browse-side taxonomy (homepage, /categories, footer).
 *
 * When a job is posted with a domain.ts categoryId, it should map to a marketplace
 * category slug for browse-side display. See lib/categories.ts for the full mapping.
 *
 * Keep both sets in sync — every domain category should map to at least one
 * marketplace category.
 */
export const LABOUR_CATEGORIES = [
  { id: 'rumah-taman', name: 'Rumah & Taman', emoji: '🏠' },
  { id: 'haiwan', name: 'Haiwan Peliharaan', emoji: '🐾' },
  { id: 'cucian', name: 'Cucian & Dobi', emoji: '👕' },
  { id: 'angkat', name: 'Angkat & Hantar', emoji: '📦' },
  { id: 'masakan', name: 'Masakan & Katering', emoji: '🍳' },
  { id: 'jagaan', name: 'Jagaan & Teman', emoji: '👶' },
  { id: 'kereta', name: 'Baik Pulih Kenderaan', emoji: '🔧' },
  { id: 'elektrik', name: 'Elektrik & Plumbing', emoji: '⚡' },
  { id: 'karpet', name: 'Cuci Karpet & Sofa', emoji: '🛋️' },
  { id: 'foto', name: 'Fotografi Majlis', emoji: '📷' },
] as const;

export type LabourCategoryId = typeof LABOUR_CATEGORIES[number]['id'];

export const TECHNICAL_CATEGORIES = [
  { id: 'design', name: 'Design & Kreatif', emoji: '🎨' },
  { id: 'webdev', name: 'Web & App Dev', emoji: '💻' },
  { id: 'marketing', name: 'Pemasaran Digital', emoji: '📣' },
  { id: 'content', name: 'Kandungan & Penulisan', emoji: '✍️' },
  { id: 'data', name: 'Data & AI', emoji: '📊' },
  { id: 'business', name: 'Perniagaan & Kewangan', emoji: '🗂️' },
  { id: 'video', name: 'Video & Motion', emoji: '🎬' },
  { id: 'photo', name: 'Fotografi Komersil', emoji: '📸' },
  { id: 'itsupport', name: 'Sokongan IT', emoji: '🖥️' },
  { id: 'social', name: 'Pengurusan Media Sosial', emoji: '📱' },
] as const;

export type TechnicalCategoryId = typeof TECHNICAL_CATEGORIES[number]['id'];

// Professional rate tiers for Technical talent (Best-of-N reference)
export const TECHNICAL_RATE_TIERS = [
  { id: 'junior', label: 'Junior / Entry-Level', range: 'RM 45 – 80 /hr', desc: '0–2 years experience' },
  { id: 'mid', label: 'Mid-Level Professional', range: 'RM 85 – 150 /hr', desc: '2–5 years, solid portfolio' },
  { id: 'senior', label: 'Senior / Specialist', range: 'RM 160 – 280 /hr', desc: '5+ years or deep niche expert' },
  { id: 'project', label: 'Project-Based / Fixed', range: 'Custom quotes', desc: 'Deliverable-focused pricing' },
] as const;

export type TechnicalRateTierId = typeof TECHNICAL_RATE_TIERS[number]['id'];

// Suggested professional certifications (extendable)
export const SUGGESTED_CERTS = [
  'AWS Certified',
  'Google Cloud',
  'Meta Blueprint',
  'Figma Certified',
  'Adobe Certified',
  'HubSpot Inbound',
  'Scrum Master (PSM)',
  'Google Analytics',
  'LinkedIn Certified',
  'Cisco CCNA',
  'Notion Certified',
  'Webflow Expert',
] as const;

