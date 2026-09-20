import { fallbackFaq } from '@/data/faq'
import { pageSeo } from '@/data/seo'
import { programMedia, siteImages } from '@/data/site-images'
import type { PageData } from '@/types/content'

export const fallbackPages: PageData[] = [
  {
    title: 'Home',
    slug: 'home',
    excerpt: 'Empowering future professionals through technical education.',
    meta: pageSeo.home,
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'School of Cooperative Technical Education',
        heading: 'Empowering Future Professionals Through Technical Education',
        subheading:
          'The School of Cooperative Technical Education exists to provide students with the opportunity to learn both the traditional trades along with a variety of state-of-the-art technology courses.',
        primaryLabel: 'Explore our programs',
        primaryHref: '/programs',
        secondaryLabel: 'How to apply',
        secondaryHref: '/admissions',
        imageUrl: siteImages.main,
      },
      {
        blockType: 'imageTextGrid',
        heading: 'Explore Our Programs',
        intro: 'Discover comprehensive technical education programs designed to launch your career.',
        items: [
          {
            title: 'Automotive Services',
            body: 'Learn automotive repair, maintenance, and diagnostic techniques using modern technology.',
            href: '/programs/automotive-services',
            imageUrl: programMedia['automotive-services'].cover,
          },
          {
            title: 'Construction and Building Skills',
            body: 'Master essential construction skills and building techniques for modern infrastructure.',
            href: '/programs/construction',
            imageUrl: programMedia.construction.cover,
          },
          {
            title: 'Culinary Arts',
            body: 'Develop professional culinary skills and learn food service management.',
            href: '/programs/culinary',
            imageUrl: programMedia.culinary.cover,
          },
          {
            title: 'Electrical',
            body: 'Train in electrical systems installation, maintenance, and troubleshooting.',
            href: '/programs/electrical',
            imageUrl: programMedia.electrical.cover,
          },
          {
            title: 'Health Services',
            body: 'Prepare for a career in healthcare with hands-on medical training.',
            href: '/programs/health-services',
            imageUrl: programMedia['health-services'].cover,
          },
          {
            title: 'Information Technology',
            body: 'Learn cutting-edge IT skills and prepare for industry certifications.',
            href: '/programs/information-technology',
            imageUrl: programMedia['information-technology'].cover,
          },
          {
            title: 'Unisex Styling',
            body: 'Master professional hair styling techniques and salon management skills.',
            href: '/programs/unisex-styling',
            imageUrl: programMedia['unisex-styling'].cover,
          },
          {
            title: 'Work-Based Learning',
            body: 'Connect classroom training to real jobs through job shadowing, internships, and pre-apprenticeship opportunities.',
            href: '/programs/work-based-learning',
            imageUrl: programMedia['work-based-learning'].cover,
          },
          {
            title: 'Occupational Safety and Health Administration (OSHA)',
            body: 'Earn OSHA 10, OSHA 30, and NYC Department of Buildings SST credentials for construction and general industry safety.',
            href: '/programs/osha',
            imageUrl: programMedia.osha.cover,
          },
        ],
      },
      {
        blockType: 'ctaBanner',
        heading: 'Our students become independent, self-supporting, lifelong learners.',
        body: 'Join approximately 1,500 students from all five boroughs in a half-day program that pairs traditional trades with state-of-the-art technology courses.',
        buttonLabel: 'Start your application',
        buttonHref: '/admissions',
      },
    ],
  },
  {
    title: 'Admissions',
    slug: 'admissions',
    excerpt: 'How to apply to Coop Tech for shared-instruction and post-graduate students.',
    meta: pageSeo.admissions,
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Admissions',
        heading: 'Apply to Coop Tech',
        subheading:
          'Coop Tech serves students ages 17–21 from all five boroughs. Students join us as shared-instruction students from more than 130 high schools and Pathways to Graduation programs, or as post-graduates who already hold a diploma.',
        primaryLabel: 'Open application portal',
        primaryHref: 'https://d79cooptech.powerappsportals.com/',
        secondaryLabel: 'Email admissions',
        secondaryHref: 'mailto:coopadmissions@schools.nyc.gov',
        imageUrl:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80',
      },
      {
        blockType: 'imageTextGrid',
        heading: 'Who can apply',
        items: [
          {
            title: 'Shared-instruction students',
            body: 'Attend your home high school or Pathways to Graduation program for academics and Coop Tech for a half-day career and technical session.',
          },
          {
            title: 'Post-graduates',
            body: 'Students who already hold a diploma may enroll while they remain within the Department of Education age limit of 21.',
          },
          {
            title: 'District 79 students',
            body: 'If the seasonal portal is closed, current D79 students should email coopadmissions@schools.nyc.gov about rolling admissions.',
          },
        ],
      },
      {
        blockType: 'accordion',
        heading: 'Application checklist',
        items: [
          {
            question: 'What documents do I need?',
            answer:
              'The application is entirely online. Have documents ready in electronic format (PNG, JPG, and PDF only), including identification, school records, and any IEP or related-service documents your counselor recommends.',
          },
          {
            question: 'When are sessions held?',
            answer:
              'Coop Tech is a half-day program. Typical sessions run in the morning from 8:30 to 11:00 a.m. or in the afternoon from 12:20 to 2:50 p.m., depending on campus and shop assignment.',
          },
          {
            question: 'When does the portal open?',
            answer:
              'Seasonal application windows are announced on the homepage. The Fall 2026 portal is currently closed. D79 students may inquire about rolling admissions by emailing coopadmissions@schools.nyc.gov.',
          },
        ],
      },
      {
        blockType: 'ctaBanner',
        heading: 'Questions about enrollment?',
        body: 'Our admissions team can help you choose a shop, campus, and session that fits your home school schedule.',
        buttonLabel: 'Contact admissions',
        buttonHref: 'mailto:coopadmissions@schools.nyc.gov',
      },
    ],
  },
  {
    title: 'Student Resources',
    slug: 'resources',
    excerpt: 'Work-based learning, internships, and student supports at Coop Tech.',
    meta: pageSeo.resources,
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Student Resources',
        heading: 'Support that turns training into work',
        subheading:
          'Many students take part in the Department of Education’s Work-Based Learning program, which provides job-readiness skills, OSHA and CPR training, and real-world work exposure.',
        primaryLabel: 'See programs',
        primaryHref: '/programs',
        secondaryLabel: 'Talk to a campus',
        secondaryHref: '/contact',
        imageUrl:
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80',
      },
      {
        blockType: 'imageTextGrid',
        heading: 'What students can access',
        items: [
          {
            title: 'Work-Based Learning',
            body: 'Job-readiness workshops, basic safety, OSHA procedures, CPR, and structured work exposure coordinated with program faculty.',
          },
          {
            title: 'Paid internships',
            body: 'Upon faculty recommendation, students can be matched with partnership sites. Eligible students in paid internships receive minimum wage plus real work experience.',
          },
          {
            title: 'Union and apprenticeship pathways',
            body: 'Selected construction, electrical, plumbing, and welding students are recommended for pre-apprentice and union recruitment programs.',
          },
          {
            title: 'Counseling and enrollment support',
            body: 'Home-school counselors and Coop Tech staff help students balance academic programs with a half-day CTE schedule.',
          },
        ],
      },
      {
        blockType: 'accordion',
        heading: 'Frequently asked questions',
        items: [
          {
            question: 'Do I stay enrolled at my high school?',
            answer:
              'Yes. Shared-instruction students remain enrolled at their home high school or Pathways to Graduation program and attend Coop Tech for a half-day shop session.',
          },
          {
            question: 'Are internships guaranteed?',
            answer:
              'Internship placement is based on faculty recommendation, attendance, skill readiness, and available partnership sites. Students are encouraged to treat shop performance as part of their portfolio.',
          },
          {
            question: 'What safety training is included?',
            answer:
              'Work-Based Learning includes basic safety, OSHA procedures, and CPR so students can enter shops, kitchens, clinics, and job sites prepared.',
          },
        ],
      },
    ],
  },
  {
    title: 'About Coop',
    slug: 'about',
    excerpt:
      'For over thirty years, The School for Cooperative Technical Education has been a half-day vocational program serving approximately 1,500 students ages 17–21 across New York City.',
    meta: pageSeo.about,
    layout: [
      {
        blockType: 'article',
        heading: 'About Coop',
        imageUrl: siteImages.about,
        imageAlt: 'Students and staff at Coop Tech',
        documentLabel: 'Download About Coop PDF',
        sections: [
          {
            body: 'For over thirty years, The School for Cooperative Technical Education has been a half-day vocational program that offers students hands on training in a variety of in demand and cutting edge trade areas. Coop Tech serves approximately 1500 students in all five boroughs who are 17-21 years of age, and who represent a wide variety of ethnic and cultural backgrounds, ability levels, and educational histories. Coop Tech students join us as either shared instruction students who also attend over 130 traditional high schools and Pathways to Graduation programs, or as post-graduates who have already obtained a diploma.',
          },
          {
            heading: 'Cooperative Learning',
            body: "Many students at Coop Tech are given the opportunity to take part in the Department of Education's Work Based Learning (WBL) Program, which provides job readiness skills, knowledge of basic safety and OSHA procedures, CPR, and real-world work exposure. Upon recommendation of program faculty, certain students can be matched with one of Coop Tech's intern partnership sites. Students are encouraged to take full advantage of internship opportunities as they build their portfolios and expand their skills for future employment. Eligible students who participate in paid internships receive minimum wage in addition to real work experience.",
          },
        ],
      },
      {
        blockType: 'stats',
        heading: 'Coop Tech at a glance',
        items: [
          { value: '30+', label: 'Years of CTE' },
          { value: '1,500', label: 'Students citywide' },
          { value: '5', label: 'Boroughs served' },
          { value: '17–21', label: 'Student ages' },
        ],
      },
      {
        blockType: 'featureGrid',
        heading: 'How students join us',
        intro: 'Coop Tech is a half-day vocational program with pathways for current high school students and recent graduates.',
        items: [
          {
            icon: 'graduation-cap',
            title: 'Shared instruction',
            body: 'Stay enrolled at your home high school or Pathways to Graduation program and attend Coop Tech for a half-day shop session.',
            href: '/admissions',
            linkLabel: 'How to apply',
          },
          {
            icon: 'users',
            title: 'Post-graduates',
            body: 'Students who already hold a diploma may enroll while they remain within the Department of Education age limit of 21.',
            href: '/admissions',
            linkLabel: 'See eligibility',
          },
          {
            icon: 'award',
            title: 'Work-based learning',
            body: 'Job-readiness, OSHA, CPR, and internship placements that turn shop training into real work experience.',
            href: '/resources',
            linkLabel: 'Student resources',
          },
        ],
      },
      {
        blockType: 'quote',
        quote:
          'We strongly believe that all students can be prepared to meet the industry demands and workforce challenges in a caring, supportive, rigorous and highly academic student-centered environment.',
        attribution: 'Coop Tech',
        role: "Principal's message",
      },
      {
        blockType: 'testimonials',
        eyebrow: 'Student voices',
        heading: 'What students say about Coop Tech',
        intro: 'Hands-on shops, industry credentials, and a half-day schedule that works with a home school.',
        buttonLabel: 'See programs',
        buttonHref: '/programs',
        items: [
          {
            authorName: 'Shared-instruction student',
            authorRole: 'Automotive Services',
            authorCompany: 'Coop Tech',
            rating: '5',
            quote:
              'I stay at my home school for academics and come here for the shop. The tools and the teachers make it feel like a real garage.',
            imageUrl: programMedia['automotive-services'].cover,
            imageAlt: 'Student working in an automotive shop',
          },
          {
            authorName: 'Post-graduate student',
            authorRole: 'Health Services',
            authorCompany: 'Coop Tech',
            rating: '5',
            quote:
              'After I earned my diploma I still wanted a trade. The clinic labs and certifications gave me a path into healthcare.',
          },
          {
            authorName: 'Work-Based Learning student',
            authorRole: 'Construction',
            authorCompany: 'Coop Tech',
            rating: '4.5',
            quote:
              'The internship matched what we practiced in the shop. OSHA and job-readiness made the first day on site less intimidating.',
            imageUrl: programMedia.construction.cover,
            imageAlt: 'Construction training site',
          },
        ],
      },
      {
        blockType: 'logoStrip',
        eyebrow: 'Partnerships',
        heading: 'Our trusted partners',
        intro: 'Employers, city agencies, and industry sites that help students move from the shop into real work.',
        logos: [
          { name: 'NYC Department of Sanitation', imageUrl: '/images/partners/nycdos.webp' },
          { name: 'Elite Optics Inc.', imageUrl: '/images/partners/elite.webp' },
          { name: 'Division of Instructional & Information Technology', imageUrl: '/images/partners/diit.webp' },
          { name: 'Nubian Hair Studio', imageUrl: '/images/partners/nubian.webp' },
          { name: 'CVS', imageUrl: '/images/partners/cvs.webp' },
          { name: 'Brothers Guitar Shop NYC', imageUrl: '/images/partners/brothers.webp' },
          { name: 'Center for Architecture', imageUrl: '/images/partners/centerarch.webp' },
          { name: 'Teddy Nissan', imageUrl: '/images/partners/teddy.webp' },
        ],
      },
    ],
  },
  {
    title: "Principal's Message",
    slug: 'principals-message',
    excerpt:
      'A welcome from Coop Tech: career and technical education, industry certifications, and a student-centered school community.',
    meta: pageSeo['principals-message'],
    layout: [
      {
        blockType: 'article',
        heading: "Principal's Message",
        imageUrl: siteImages.principal,
        imageAlt: 'Coop Tech campus',
        documentLabel: "Download Principal's Message PDF",
        sections: [
          {
            heading: 'Welcome to Coop Tech!',
            body: 'The School of Cooperative Technical Education (Coop Tech) is a unique citywide school that offers students opportunities to learn skills in a variety of different career and technical education courses. We have a dedicated group of educators that strive to prepare our students with the skills needed to be successful in high demand industries. At Coop Tech, it is critical that our students are given opportunities to work towards state recognized industry certifications and develop the skills necessary to meet the demands of industry, career and college. We strongly believe that all students can be prepared to meet the industry demands and workforce challenges in a caring, supportive, rigorous and highly academic student-centered environment. We continuously work towards providing students with authentic experiences in career and technical education and look forward to welcoming you to our school community.',
          },
        ],
      },
    ],
  },
  {
    title: 'Contact',
    slug: 'contact',
    excerpt: 'Coop Tech campuses across New York City’s five boroughs.',
    meta: pageSeo.contact,
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Contact',
        heading: 'Find a Coop Tech campus',
        subheading:
          'Coop Tech operates a Manhattan main campus and satellite sites in the Bronx, Brooklyn, Queens, and Staten Island. Admissions questions can be sent to coopadmissions@schools.nyc.gov.',
        primaryLabel: 'Email admissions',
        primaryHref: 'mailto:coopadmissions@schools.nyc.gov',
        secondaryLabel: 'View programs',
        secondaryHref: '/programs',
        imageUrl:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
      },
      {
        blockType: 'contactCards',
        heading: 'Reach Coop Tech',
        intro: 'Admissions, the main campus, and office hours for the Manhattan site.',
        items: [
          {
            icon: 'mail',
            label: 'Admissions',
            value: 'coopadmissions@schools.nyc.gov',
            href: 'mailto:coopadmissions@schools.nyc.gov',
          },
          {
            icon: 'phone',
            label: 'Main campus',
            value: '212-369-8800',
            href: 'tel:2123698800',
          },
          {
            icon: 'map-pin',
            label: 'Address',
            value: '321 East 96th Street, New York, NY 10128',
          },
          {
            icon: 'clock',
            label: 'Typical sessions',
            value: '8:30–11:00 a.m. or 12:20–2:50 p.m.',
          },
        ],
      },
    ],
  },
  {
    title: 'Programs',
    slug: 'programs',
    excerpt: pageSeo.programs.description,
    meta: pageSeo.programs,
    layout: [],
  },
  {
    title: 'FAQ',
    slug: 'faq',
    excerpt: pageSeo.faq.description,
    meta: pageSeo.faq,
    layout: fallbackFaq,
  },
  {
    title: 'Adult Education',
    slug: 'adult-education',
    excerpt: pageSeo['adult-education'].description,
    meta: pageSeo['adult-education'],
    layout: [],
  },
  {
    title: 'Staff',
    slug: 'staff',
    excerpt: pageSeo.staff.description,
    meta: pageSeo.staff,
    layout: [],
  },
]
