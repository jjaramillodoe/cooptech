import type { NavigationData } from '@/types/content'

export const fallbackNavigation: NavigationData = {
  header: [
    {
      label: 'Programs',
      href: '/programs',
      children: [
        { label: 'Automotive Services', href: '/programs/automotive-services' },
        { label: 'Construction and Building Skills', href: '/programs/construction' },
        { label: 'Culinary Arts', href: '/programs/culinary' },
        { label: 'Electrical', href: '/programs/electrical' },
        { label: 'Health Services', href: '/programs/health-services' },
        { label: 'Information Technology', href: '/programs/information-technology' },
        { label: 'Unisex Styling', href: '/programs/unisex-styling' },
        { label: 'Work-Based Learning', href: '/programs/work-based-learning' },
        { label: 'OSHA', href: '/programs/osha' },
      ],
    },
    {
      label: 'About Us',
      href: '/about',
      children: [
        { label: 'About Coop', href: '/about' },
        { label: "Principal's Message", href: '/principals-message' },
        { label: 'Staff', href: '/staff' },
      ],
    },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Adult Education', href: '/adult-education' },
  ],
  footer: [
    {
      heading: 'Site Map',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Programs', href: '/programs' },
        { label: 'About Us', href: '/about' },
        { label: "Principal's Message", href: '/principals-message' },
        { label: 'Staff', href: '/staff' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Adult Education', href: '/adult-education' },
        { label: 'Apply Now', href: '/admissions' },
      ],
    },
  ],
}
