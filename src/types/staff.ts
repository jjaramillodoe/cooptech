export type StaffCategory = 'administration' | 'faculty' | 'guidance' | 'support'

export interface StaffMember {
  id: string
  firstName: string
  lastName: string
  role: string
  category: StaffCategory
  email?: string
  phone?: string
}

export const staffCategoryLabels: Record<StaffCategory, string> = {
  administration: 'Administration',
  faculty: 'Faculty',
  guidance: 'Guidance',
  support: 'Support Staff',
}
