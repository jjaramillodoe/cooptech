export type ProgramCategory =
  | 'automotive'
  | 'construction'
  | 'culinary'
  | 'electrical'
  | 'health'
  | 'it'
  | 'styling'
  | 'wbl'
  | 'osha'

export interface ProgramCourse {
  title?: string
  description: string
}

export interface SeoMeta {
  title: string
  description: string
  image?: string
}

export interface Program {
  id: string
  title: string
  slug: string
  category: ProgramCategory
  summary: string
  intro?: string
  duration?: string
  schedule?: string
  imageUrl?: string
  gallery?: string[]
  requirements: string[]
  certifications: string[]
  courses: ProgramCourse[]
  campuses: string[]
  meta?: SeoMeta
}

export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

export interface FooterColumn {
  heading: string
  links: NavChild[]
}

export interface NavigationData {
  header: NavItem[]
  footer: FooterColumn[]
}

export type BannerTone = 'info' | 'closed' | 'warning' | 'success'
export type BannerIcon = 'graduation-cap' | 'megaphone' | 'calendar' | 'info' | 'alert' | 'mail'

export interface BannerData {
  active: boolean
  tone: BannerTone
  icon: BannerIcon
  heading: string
  body: string
  email?: string
  linkHref?: string
  linkLabel?: string
  startsAt?: string
  endsAt?: string
}

export type AnnouncementKind = 'alert' | 'event' | 'calendar'

export interface Announcement {
  id: string
  title: string
  kind: AnnouncementKind
  body: string
  href?: string
  linkLabel?: string
  active: boolean
  pinToBanner: boolean
}

export interface Campus {
  id: string
  name: string
  address: string
  phone: string
  borough: string
  lat: number
  lng: number
}

export interface HeroBlockData {
  blockType: 'hero'
  eyebrow?: string
  heading: string
  subheading?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  imageUrl?: string
}

export interface ImageTextGridItem {
  title: string
  body: string
  href?: string
  imageUrl?: string
}

export interface ImageTextGridBlockData {
  blockType: 'imageTextGrid'
  heading?: string
  intro?: string
  items: ImageTextGridItem[]
}

export interface AccordionItem {
  question: string
  answer: string
}

export interface AccordionBlockData {
  blockType: 'accordion'
  heading?: string
  items: AccordionItem[]
}

export interface CTABannerBlockData {
  blockType: 'ctaBanner'
  heading: string
  body?: string
  buttonLabel?: string
  buttonHref?: string
}

export interface ArticleSection {
  heading?: string
  body: string
}

export interface ArticleBlockData {
  blockType: 'article'
  heading: string
  imageUrl?: string
  imageAlt?: string
  documentUrl?: string
  documentLabel?: string
  sections: ArticleSection[]
}

export type LayoutBlock =
  | HeroBlockData
  | ImageTextGridBlockData
  | AccordionBlockData
  | CTABannerBlockData
  | ArticleBlockData

export interface PageData {
  title: string
  slug: string
  excerpt?: string
  layout: LayoutBlock[]
  meta?: SeoMeta
}
