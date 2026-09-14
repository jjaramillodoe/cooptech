import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Announcements } from './collections/Announcements'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Programs } from './collections/Programs'
import { Staff } from './collections/Staff'
import { Users } from './collections/Users'
import { Banner } from './globals/Banner'
import { Navigation } from './globals/Navigation'
import { blobStorage } from './plugins/blob'
import { importExport } from './plugins/importExport'
import { seo } from './plugins/seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Coop Tech CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Programs, Announcements, Staff, ContactSubmissions],
  globals: [Navigation, Banner],
  plugins: [seo, importExport, blobStorage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
})
