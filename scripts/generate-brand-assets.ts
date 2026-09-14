import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const LOGO = path.join(ROOT, 'public/images/cooptech-removebg.png')
const D79 = path.join(ROOT, 'public/images/d79logo-removebg.png')
const NYC = path.join(ROOT, 'public/images/nycpublicshools-removebg.png')

function encodeIco(pngs: { png: Buffer; size: number }[]) {
  const count = pngs.length
  const headerSize = 6 + 16 * count
  let offset = headerSize
  const entries = pngs.map((item) => {
    const entry = { ...item, offset, bytes: item.png.length }
    offset += item.png.length
    return entry
  })

  const ico = Buffer.alloc(offset)
  ico.writeUInt16LE(0, 0)
  ico.writeUInt16LE(1, 2)
  ico.writeUInt16LE(count, 4)

  entries.forEach((entry, index) => {
    const start = 6 + index * 16
    ico.writeUInt8(entry.size >= 256 ? 0 : entry.size, start)
    ico.writeUInt8(entry.size >= 256 ? 0 : entry.size, start + 1)
    ico.writeUInt8(0, start + 2)
    ico.writeUInt8(0, start + 3)
    ico.writeUInt16LE(1, start + 4)
    ico.writeUInt16LE(32, start + 6)
    ico.writeUInt32LE(entry.bytes, start + 8)
    ico.writeUInt32LE(entry.offset, start + 12)
    entry.png.copy(ico, entry.offset)
  })

  return ico
}

async function squareIcon(size: number) {
  const source = sharp(LOGO)
  const { width = 627 } = await source.metadata()
  const side = 138
  const left = Math.max(0, Math.round((width - side) / 2))
  const top = 0

  return sharp(LOGO)
    .extract({ left, top, width: side, height: side })
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .ensureAlpha()
    .png()
    .toBuffer()
}

async function socialCard(width: number, height: number) {
  const logoWidth = Math.round(width * 0.52)
  const logo = await sharp(LOGO)
    .resize({ width: logoWidth, fit: 'inside' })
    .png()
    .toBuffer()
  const logoMeta = await sharp(logo).metadata()
  const d79 = await sharp(D79).resize({ height: 64, fit: 'inside' }).png().toBuffer()
  const nyc = await sharp(NYC).resize({ height: 72, fit: 'inside' }).png().toBuffer()
  const d79Meta = await sharp(d79).metadata()
  const nycMeta = await sharp(nyc).metadata()

  const logoLeft = Math.round((width - (logoMeta.width || logoWidth)) / 2)
  const logoTop = Math.round(height * 0.22)
  const partnerTop = height - 110
  const partnerGap = 48
  const pairWidth = (d79Meta.width || 120) + partnerGap + (nycMeta.width || 120)
  const pairLeft = Math.round((width - pairWidth) / 2)

  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: '#f7f9fc',
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="10" fill="#2f6fed"/>
            <text x="${width / 2}" y="${logoTop + (logoMeta.height || 120) + 56}" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#1a2744">School of Cooperative Technical Education</text>
          </svg>`,
        ),
        top: 0,
        left: 0,
      },
      { input: logo, top: logoTop, left: logoLeft },
      { input: d79, top: partnerTop, left: pairLeft },
      { input: nyc, top: partnerTop - 4, left: pairLeft + (d79Meta.width || 120) + partnerGap },
    ])
    .png()
    .toBuffer()
}

async function writeAll(filePath: string, data: Buffer) {
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, data)
}

async function main() {
  const icon32 = await squareIcon(32)
  const icon48 = await squareIcon(48)
  const icon180 = await squareIcon(180)
  const icon192 = await squareIcon(192)
  const icon512 = await squareIcon(512)
  const og = await socialCard(1200, 630)
  const twitter = await socialCard(1200, 600)
  const favicon = encodeIco([
    { png: icon32, size: 32 },
    { png: icon48, size: 48 },
  ])

  const outputs = [
    ['public/favicon.ico', favicon],
    ['public/apple-touch-icon.png', icon180],
    ['public/icon-192.png', icon192],
    ['public/icon-512.png', icon512],
    ['public/og-image.png', og],
    ['public/twitter-image.png', twitter],
    ['src/app/(frontend)/icon.png', icon512],
    ['src/app/(frontend)/apple-icon.png', icon180],
    ['src/app/(frontend)/opengraph-image.png', og],
    ['src/app/(frontend)/twitter-image.png', twitter],
  ] as const

  for (const [relative, data] of outputs) {
    await writeAll(path.join(ROOT, relative), data)
  }

  console.log(`Wrote ${outputs.length} brand images.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
