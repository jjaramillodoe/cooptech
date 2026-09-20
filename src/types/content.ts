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

export interface TextSectionBlockData {
  blockType: 'textSection'
  heading?: string
  body: string
  buttonLabel?: string
  buttonHref?: string
}

export interface StatsItem {
  value: string
  label: string
}

export interface StatsBlockData {
  blockType: 'stats'
  heading?: string
  items: StatsItem[]
}

export type FeatureGridIcon =
  | 'graduation-cap'
  | 'users'
  | 'award'
  | 'book'
  | 'calendar'
  | 'clock'
  | 'building'
  | 'map-pin'
  | 'phone'
  | 'mail'
  | 'heart'
  | 'check'
  | 'star'

export interface FeatureGridItem {
  icon?: FeatureGridIcon
  title: string
  body: string
  href?: string
  linkLabel?: string
}

export interface FeatureGridBlockData {
  blockType: 'featureGrid'
  heading?: string
  intro?: string
  items: FeatureGridItem[]
}

export interface SplitSectionBlockData {
  blockType: 'splitSection'
  imagePosition?: 'left' | 'right'
  eyebrow?: string
  heading: string
  body: string
  buttonLabel?: string
  buttonHref?: string
  imageUrl?: string
  imageAlt?: string
}

export interface QuoteBlockData {
  blockType: 'quote'
  quote: string
  attribution?: string
  role?: string
}

export interface GalleryImage {
  imageUrl?: string
  alt?: string
  caption?: string
}

export interface GalleryBlockData {
  blockType: 'gallery'
  heading?: string
  images: GalleryImage[]
}

export interface VideoBlockData {
  blockType: 'video'
  heading?: string
  url: string
  caption?: string
}

export type TestimonialRating = '5' | '4.5' | '4' | '3.5' | '3'

export interface TestimonialItem {
  authorName: string
  authorRole?: string
  authorCompany?: string
  rating?: TestimonialRating
  quote: string
  imageUrl?: string
  imageAlt?: string
}

export interface TestimonialsBlockData {
  blockType: 'testimonials'
  eyebrow?: string
  heading?: string
  intro?: string
  buttonLabel?: string
  buttonHref?: string
  items: TestimonialItem[]
}

export interface LogoStripItem {
  name: string
  imageUrl?: string
  href?: string
}

export interface LogoStripBlockData {
  blockType: 'logoStrip'
  eyebrow?: string
  heading?: string
  intro?: string
  logos: LogoStripItem[]
}

export type ContactCardIcon = 'mail' | 'phone' | 'map-pin' | 'clock' | 'building' | 'globe'

export interface ContactCardItem {
  icon?: ContactCardIcon
  label: string
  value: string
  href?: string
}

export interface ContactCardsBlockData {
  blockType: 'contactCards'
  heading?: string
  intro?: string
  items: ContactCardItem[]
}

export type LayoutBlock =
  | HeroBlockData
  | ImageTextGridBlockData
  | AccordionBlockData
  | CTABannerBlockData
  | ArticleBlockData
  | TextSectionBlockData
  | StatsBlockData
  | FeatureGridBlockData
  | SplitSectionBlockData
  | QuoteBlockData
  | GalleryBlockData
  | VideoBlockData
  | TestimonialsBlockData
  | LogoStripBlockData
  | ContactCardsBlockData

export interface PageData {
  title: string
  slug: string
  excerpt?: string
  comingSoon?: boolean
  comingSoonMessage?: string
  layout: LayoutBlock[]
  meta?: SeoMeta
}
