import type { SeoMeta } from '@/types/content'

export const defaultOgImage = '/og-image.png'

export const pageSeo: Record<string, SeoMeta> = {
  home: {
    title: 'Coop Tech | School of Cooperative Technical Education',
    description:
      'Half-day career and technical education for NYC students ages 17–21. Learn a trade, earn industry certifications, and gain paid internship experience at Coop Tech.',
    image: defaultOgImage,
  },
  programs: {
    title: 'Career & Technical Programs',
    description:
      'Explore Coop Tech CTE programs in automotive, construction, culinary, electrical, health, IT, unisex styling, work-based learning, and OSHA for New York City students ages 17–21.',
    image: defaultOgImage,
  },
  admissions: {
    title: 'Apply to Coop Tech',
    description:
      'Apply to Coop Tech as a shared-instruction or post-graduate student ages 17–21. Learn how NYC high school students enroll in a half-day CTE shop.',
    image: defaultOgImage,
  },
  resources: {
    title: 'Student Resources',
    description:
      'Work-based learning, internships, OSHA and CPR training, and student supports at Coop Tech, plus current alerts and school calendar updates.',
    image: defaultOgImage,
  },
  about: {
    title: 'About Coop Tech',
    description:
      'The School of Cooperative Technical Education is a half-day vocational program serving about 1,500 NYC students ages 17–21 from more than 130 schools.',
    image: defaultOgImage,
  },
  'principals-message': {
    title: "Principal's Message",
    description:
      'A welcome from Coop Tech leadership on career and technical education, industry certifications, internships, and our student-centered school community.',
    image: defaultOgImage,
  },
  staff: {
    title: 'Staff Directory',
    description:
      'Find Coop Tech administration, faculty, guidance, and support staff. Search by name, role, or department and get main-office contact information.',
    image: defaultOgImage,
  },
  contact: {
    title: 'Contact & Campuses',
    description:
      'Contact Coop Tech or find campus locations across New York City’s five boroughs. Call (212) 369-8800 or email coopadmissions@schools.nyc.gov.',
    image: defaultOgImage,
  },
  faq: {
    title: 'Frequently Asked Questions',
    description:
      'Answers about Coop Tech eligibility, half-day schedules, how to apply, internships, and student supports for NYC career and technical education.',
    image: defaultOgImage,
  },
  'adult-education': {
    title: 'Adult Education',
    description:
      'Post-graduates through age 21 can enroll at Coop Tech for half-day CTE, industry certifications, internships, and apprenticeship pathways.',
    image: defaultOgImage,
  },
}

export const programSeo: Record<string, SeoMeta> = {
  'automotive-services': {
    title: 'Automotive Services Program',
    description:
      'Learn automotive repair, diagnostics, brakes, and engine performance at Coop Tech. Earn ASE and Snap-on certifications in a half-day CTE shop.',
    image: defaultOgImage,
  },
  construction: {
    title: 'Construction and Building Skills',
    description:
      'Train in carpentry, plumbing, welding, and architectural design at Coop Tech. Earn OSHA, FDNY, and software certifications across NYC campuses.',
    image: defaultOgImage,
  },
  culinary: {
    title: 'Culinary Arts Program',
    description:
      'Develop professional kitchen skills and food-service management at Coop Tech. Half-day CTE culinary training for New York City students ages 17–21.',
    image: defaultOgImage,
  },
  electrical: {
    title: 'Electrical Program',
    description:
      'Learn electrical installation, maintenance, and troubleshooting at Coop Tech. Half-day CTE shop training aligned with industry practice.',
    image: defaultOgImage,
  },
  'health-services': {
    title: 'Health Services Program',
    description:
      'Prepare for healthcare careers with hands-on medical training at Coop Tech, including CNA and related pathways for NYC students ages 17–21.',
    image: defaultOgImage,
  },
  'information-technology': {
    title: 'Information Technology Program',
    description:
      'Learn web design, Cisco networking, A/V production, and advertising design at Coop Tech. Half-day IT courses that lead to industry certifications.',
    image: defaultOgImage,
  },
  'unisex-styling': {
    title: 'Unisex Styling Program',
    description:
      'Master barbering and natural hairstyling at Coop Tech. Hands-on salon training and New York State licensure preparation for NYC students.',
    image: defaultOgImage,
  },
  'work-based-learning': {
    title: 'Work-Based Learning',
    description:
      'Job shadowing, volunteering, paid internships, clinical experience, and pre-apprenticeship opportunities at Coop Tech.',
    image: defaultOgImage,
  },
  osha: {
    title: 'OSHA Safety Training',
    description:
      'Earn OSHA 10, OSHA 30, and NYC Department of Buildings SST training at Coop Tech for construction and general industry safety.',
    image: defaultOgImage,
  },
}
