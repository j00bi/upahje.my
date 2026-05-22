/**
 * Portfolio projects — no projects yet.
 *
 * Once real users upload portfolio work from the talent profile page,
 * this file can be replaced with database-driven data.
 * For now, all sections that reference this data should show an
 * empty/coming-soon state.
 */
export interface PortfolioProject {
  id: string
  talentSlug: string
  talentName: string
  talentAvatar: string
  coverImage: string
  title: string
  description: string
  images: string[]
  tags: string[]
  category: string
  likes: number
  views: number
  year: number
}

export const portfolioProjects: PortfolioProject[] = []
