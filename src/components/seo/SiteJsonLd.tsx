import { siteUrl } from '@/lib/env'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'School of Cooperative Technical Education',
  alternateName: 'Coop Tech',
  url: siteUrl,
  telephone: '+1-212-369-8800',
  email: 'coopadmissions@schools.nyc.gov',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '321 East 96th Street',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10128',
    addressCountry: 'US',
  },
}

export function SiteJsonLd() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
  )
}
