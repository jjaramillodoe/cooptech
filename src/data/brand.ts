import { blobAssets } from '@/data/blob-assets'

export const brandImages = {
  coopTech: blobAssets.brand.coopTech || '/images/cooptech-removebg.png',
  district79: blobAssets.brand.district79 || '/images/d79logo-removebg.png',
  nycPublicSchools: blobAssets.brand.nycPublicSchools || '/images/nycpublicshools-removebg.png',
} as const

export const brandImageSizes = {
  coopTech: { width: 627, height: 185 },
  district79: { width: 306, height: 154 },
  nycPublicSchools: { width: 297, height: 245 },
} as const
