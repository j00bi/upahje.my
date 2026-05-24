import type {
  LabourCategoryId,
  TechnicalCategoryId,
  TechnicalRateTierId,
} from '@/lib/domain'

export interface LabourOnboardingData {
  fullName?: string
  phone?: string
  myKadUploaded?: boolean
  location?: string
  categories?: LabourCategoryId[]
  rate?: string
  availability?: string
  bio?: string
  portfolioLinks?: string[]
  quickStart?: boolean
}

export interface TechnicalOnboardingData {
  fullName?: string
  phone?: string
  portfolioLinks?: string[]
  skills?: TechnicalCategoryId[]
  rateTier?: TechnicalRateTierId | ''
  availability?: string
  certifications?: string[]
  bio?: string
  showcaseStyle?: boolean
  proForm?: boolean
  previewReady?: boolean
}

export interface EmployerOnboardingData {
  company?: string
  contactName?: string
  contact?: string
  email?: string
  labourCategories?: string[]
  techCategories?: string[]
  needs?: string[]
  volume?: string
  jobTitle?: string
  budget?: string
  when?: string
  fastPost?: boolean
}

