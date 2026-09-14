import type { Announcement } from '@/types/content'

export const fallbackAnnouncements: Announcement[] = [
  {
    id: 'fall-2026-portal',
    title: 'Fall 2026 Application Portal is Now Closed',
    kind: 'alert',
    body: 'The application period for Fall 2026 at Coop Tech is now closed. If you are currently a D79 student, please contact coopadmissions@schools.nyc.gov to learn more about our rolling admissions process.',
    href: '/admissions',
    linkLabel: 'Admissions details',
    active: true,
    pinToBanner: true,
  },
  {
    id: 'wbl-info-session',
    title: 'Work-Based Learning Information Session',
    kind: 'event',
    body: 'Learn how Coop Tech students gain OSHA, CPR, and paid internship experience through the DOE Work-Based Learning program.',
    href: '/resources',
    linkLabel: 'Student resources',
    active: true,
    pinToBanner: false,
  },
  {
    id: 'open-house',
    title: 'Campus Open House Calendar',
    kind: 'calendar',
    body: 'Tour shops and classrooms at the Main Campus and Longwood. Check with your counselor for the next scheduled visit date.',
    href: '/contact',
    linkLabel: 'Find a campus',
    active: true,
    pinToBanner: false,
  },
]
