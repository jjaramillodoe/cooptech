import 'dotenv/config'

import { createReadStream, existsSync } from 'node:fs'
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { put } from '@vercel/blob'

const ROOT = process.cwd()
const partnersDir = path.join(ROOT, 'public/images/partners')
const brandDir = path.join(ROOT, 'public/images')

const brandFiles = [
  { file: 'cooptech-removebg.png', key: 'coopTech', pathname: 'brand/cooptech-removebg.png' },
  { file: 'd79logo-removebg.png', key: 'district79', pathname: 'brand/d79logo-removebg.png' },
  { file: 'nycpublicshools-removebg.png', key: 'nycPublicSchools', pathname: 'brand/nycpublicshools-removebg.png' },
] as const

async function upload(
  pathname: string,
  filePath: string,
  contentType: string,
  access: 'public' | 'private',
) {
  const blob = await put(pathname, createReadStream(filePath), {
    access,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN_PROD,
  })
  return blob.url
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN_PROD) {
    throw new Error('BLOB_READ_WRITE_TOKEN is missing. Add it to .env and try again.')
  }

  const access = await detectAccess()

  const partnerFiles = (await readdir(partnersDir))
    .filter((file) => file.endsWith('.webp'))
    .sort()

  const partners: Record<string, string> = {}
  for (const file of partnerFiles) {
    const key = path.parse(file).name
    const url = await upload(`partners/${file}`, path.join(partnersDir, file), 'image/webp', access)
    partners[key] = url
    console.log(`uploaded partners/${file}`)
  }

  const brand: Record<string, string> = {}
  for (const item of brandFiles) {
    const url = await upload(item.pathname, path.join(brandDir, item.file), 'image/png', access)
    brand[item.key] = url
    console.log(`uploaded ${item.pathname}`)
  }

  const content: Record<string, string> = {}
  const contentFiles = (await readdir(brandDir))
    .filter((file) => file.endsWith('.webp'))
    .sort()

  for (const file of contentFiles) {
    const filePath = path.join(brandDir, file)
    if (!existsSync(filePath)) continue
    const key = path.parse(file).name
    const url = await upload(`content/${file}`, filePath, 'image/webp', access)
    content[key] = url
    console.log(`uploaded content/${file}`)
  }

  const useOnSite = access === 'public'
  const output = `export const blobAssets: {
  partners: Record<string, string>
  brand: Record<string, string>
  content: Record<string, string>
} = ${JSON.stringify(
    {
      partners: useOnSite ? partners : {},
      brand: useOnSite ? brand : {},
      content: useOnSite ? content : {},
    },
    null,
    2,
  )}
`
  await writeFile(path.join(ROOT, 'src/data/blob-assets.ts'), output)

  if (access === 'private') {
    console.log('Images are in the Blob store.')
    console.log(
      'The store is private, so the site will keep using local files. In Vercel, open the Blob store → Settings → change access to Public, then run npm run blob:upload again.',
    )
  } else {
    console.log('wrote src/data/blob-assets.ts with public Blob URLs')
  }
}

async function detectAccess(): Promise<'public' | 'private'> {
  try {
    await put('partners/.access-check', Buffer.from('ok'), {
      access: 'public',
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN_PROD,
    })
    return 'public'
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (message.includes('private store')) return 'private'
    throw error
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
