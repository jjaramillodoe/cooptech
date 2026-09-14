import { blobAssets } from '@/data/blob-assets'

const localPartners = [
  {
    key: 'nycdos',
    src: '/images/partners/nycdos.webp',
    alt: 'NYC Department of Sanitation',
    width: 225,
    height: 225,
  },
  {
    key: 'elite',
    src: '/images/partners/elite.webp',
    alt: 'Elite Optics Inc.',
    width: 225,
    height: 225,
  },
  {
    key: 'diit',
    src: '/images/partners/diit.webp',
    alt: 'Division of Instructional & Information Technology',
    width: 242,
    height: 168,
  },
  {
    key: 'nubian',
    src: '/images/partners/nubian.webp',
    alt: 'Nubian Hair Studio',
    width: 225,
    height: 225,
  },
  {
    key: 'cvs',
    src: '/images/partners/cvs.webp',
    alt: 'CVS',
    width: 300,
    height: 168,
  },
  {
    key: 'brothers',
    src: '/images/partners/brothers.webp',
    alt: 'Brothers Guitar Shop NYC',
    width: 249,
    height: 202,
  },
  {
    key: 'centerarch',
    src: '/images/partners/centerarch.webp',
    alt: 'Center for Architecture',
    width: 225,
    height: 225,
  },
  {
    key: 'teddy',
    src: '/images/partners/teddy.webp',
    alt: 'Teddy Nissan',
    width: 225,
    height: 225,
  },
] as const

export const partners = localPartners.map((partner) => ({
  src: blobAssets.partners[partner.key] || partner.src,
  alt: partner.alt,
  width: partner.width,
  height: partner.height,
}))
