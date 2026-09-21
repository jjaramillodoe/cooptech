export const inquiryRoles = ['Student', 'Parent or guardian', 'School counselor', 'Other'] as const

export const inquiryTypes = [
  'Admissions',
  'Program question',
  'Campus visit',
  'Current student support',
  'Other',
] as const

export const preferredContacts = ['Email', 'Phone'] as const

export const inquiryPrograms = [
  'Automotive Services',
  'Construction and Building Skills',
  'Culinary Arts',
  'Electrical',
  'Health Services',
  'Information Technology',
  'Unisex Styling',
  'Work-Based Learning',
  'OSHA',
  'Not sure yet',
] as const

export const inquiryCampuses = [
  'Coop Tech Main Campus',
  'Coop Tech @ Longwood Campus',
  'Coop Tech @ Long Island City H.S.',
  'Coop Tech @ Queens Transitional Center',
  'Coop Tech @ Concord H.S.',
  'Coop Tech @ Canarsie H.S.',
  'Not sure yet',
] as const

export const admissionsInbox = 'coopadmissions@schools.nyc.gov'

export function inquirySubject(inquiryType: string, name: string) {
  return `Coop Tech inquiry: ${inquiryType || 'General'} — ${name}`
}
