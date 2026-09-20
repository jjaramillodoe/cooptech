import type { SeoMeta } from '@/types/content'

export const defaultOgImage = '/og-image.png'

export const pageSeo: Record<string, SeoMeta> = {
  home: {
    title: 'Coop Tech | School of Cooperative Technical Education',
    description:
      'Half-day CTE for NYC students ages 17–21. Learn a trade, earn industry certifications, and gain paid internship experience at Coop Tech.',
    image: defaultOgImage,
  },
  programs: {
    title: 'Explore CTE Programs at Coop Tech in New York City',
    description:
      'Explore Coop Tech CTE programs in automotive, construction, culinary, electrical, health, IT, styling, internships, and OSHA for NYC students 17–21.',
    image: defaultOgImage,
  },
  admissions: {
    title: 'Apply to Coop Tech | Shared-Instruction CTE in NYC',
    description:
      'Apply to Coop Tech as a shared-instruction or post-graduate student ages 17–21. Learn how NYC high school students enroll in a half-day CTE shop.',
    image: defaultOgImage,
  },
  resources: {
    title: 'Student Resources and Internships at Coop Tech NYC',
    description:
      'Work-based learning, internships, OSHA and CPR training, and student supports at Coop Tech, plus current alerts and calendar updates for NYC students.',
    image: defaultOgImage,
  },
  about: {
    title: 'About Coop Tech | NYC Cooperative Technical Education',
    description:
      'The School of Cooperative Technical Education is a half-day vocational program serving about 1,500 NYC students ages 17–21 from over 130 high schools.',
    image: defaultOgImage,
  },
  'principals-message': {
    title: "Principal's Message from Coop Tech School Leadership",
    description:
      'A welcome from Coop Tech leadership on career and technical education, certifications, internships, and our student-centered school community in NYC.',
    image: defaultOgImage,
  },
  staff: {
    title: 'Coop Tech Staff Directory | Faculty and Administration',
    description:
      'Find Coop Tech administration, faculty, guidance, and support staff. Search by name, role, or department and get main-office contact information.',
    image: defaultOgImage,
  },
  contact: {
    title: 'Contact Coop Tech | Find Campuses Across New York City',
    description:
      'Contact Coop Tech or find campus locations across New York City’s five boroughs. Call (212) 369-8800 or email coopadmissions@schools.nyc.gov.',
    image: defaultOgImage,
  },
  faq: {
    title: 'Coop Tech FAQ | Eligibility, Schedule, and Applying',
    description:
      'Answers about Coop Tech eligibility, half-day schedules, how to apply, internships, and student supports for NYC career and technical education.',
    image: defaultOgImage,
  },
  'adult-education': {
    title: 'Adult Education and Post-Graduate CTE at Coop Tech',
    description:
      'Post-graduates through age 21 can enroll at Coop Tech for half-day CTE, industry certifications, internships, and apprenticeship pathways in NYC.',
    image: defaultOgImage,
  },
}

export const programSeo: Record<string, SeoMeta> = {
  'automotive-services': {
    title: 'Automotive Repair Program at Coop Tech in New York',
    description:
      'Learn automotive repair, diagnostics, brakes, and engine performance at Coop Tech. Earn ASE and Snap-on certifications in a half-day CTE shop.',
    image: defaultOgImage,
  },
  construction: {
    title: 'Construction and Building Skills at Coop Tech, NYC',
    description:
      'Train in carpentry, plumbing, welding, and architectural design at Coop Tech. Earn OSHA, FDNY, and software certifications at New York City campuses.',
    image: defaultOgImage,
  },
  culinary: {
    title: 'Culinary Arts CTE Program at Coop Tech in New York',
    description:
      'Develop professional kitchen skills and food-service management at Coop Tech. Half-day CTE culinary training for New York City students ages 17–21.',
    image: defaultOgImage,
  },
  electrical: {
    title: 'Electrical Installation CTE Program at Coop Tech NYC',
    description:
      'Learn electrical installation, maintenance, and troubleshooting at Coop Tech. Half-day CTE shop training aligned with industry practice in NYC.',
    image: defaultOgImage,
  },
  'health-services': {
    title: 'Health Services and CNA Training at Coop Tech, NYC',
    description:
      'Prepare for healthcare careers with hands-on medical training at Coop Tech, including CNA and related pathways for New York City students ages 17–21.',
    image: defaultOgImage,
  },
  'information-technology': {
    title: 'Information Technology CTE Program at Coop Tech NYC',
    description:
      'Learn web design, Cisco networking, A/V production, and advertising design at Coop Tech. Half-day IT courses that lead to industry certifications.',
    image: defaultOgImage,
  },
  'unisex-styling': {
    title: 'Unisex Styling and Barbering Program at Coop Tech NYC',
    description:
      'Master barbering and natural hairstyling at Coop Tech. Hands-on salon training and New York State licensure preparation for NYC students ages 17–21.',
    image: defaultOgImage,
  },
  'work-based-learning': {
    title: 'Work-Based Learning and Paid Internships | Coop Tech',
    description:
      'Job shadowing, volunteering, paid internships, clinical experience, and pre-apprenticeships that connect Coop Tech shop training to real work.',
    image: defaultOgImage,
  },
  osha: {
    title: 'OSHA 10, OSHA 30, and SST Safety Training | Coop Tech',
    description:
      'Earn OSHA 10, OSHA 30, and NYC Department of Buildings SST training at Coop Tech for construction and general industry safety credentials.',
    image: defaultOgImage,
  },
}
