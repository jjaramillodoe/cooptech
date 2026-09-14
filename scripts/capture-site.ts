import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium, type Page } from 'playwright'

const ORIGIN = 'http://www.co-optech.org'
const OUTPUT = path.resolve(process.cwd(), 'scripts/output')

const PAGES = [
  { slug: 'home', url: `${ORIGIN}/` },
  { slug: 'about', url: `${ORIGIN}/about.html` },
  { slug: 'contact', url: `${ORIGIN}/contact.html` },
  { slug: 'automotive', url: `${ORIGIN}/auto.html` },
  { slug: 'construction', url: `${ORIGIN}/construction.html` },
  { slug: 'culinary', url: `${ORIGIN}/culinary.html` },
  { slug: 'health', url: `${ORIGIN}/health.html` },
  { slug: 'it', url: `${ORIGIN}/it.html` },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const

async function extractDesignTokens(page: Page) {
  return page.evaluate(() => {
    const styles = getComputedStyle(document.body)
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 8)
    const links = Array.from(document.querySelectorAll('nav a, header a, .nav a'))
      .map((el) => ({
        text: (el.textContent || '').trim(),
        href: (el as HTMLAnchorElement).href,
      }))
      .filter((item) => item.text)

    const colors = new Set<string>()
    document.querySelectorAll('body, header, nav, footer, h1, a, button').forEach((el) => {
      const computed = getComputedStyle(el)
      colors.add(computed.color)
      colors.add(computed.backgroundColor)
    })

    return {
      title: document.title,
      navigation: links,
      typography: {
        bodyFont: styles.fontFamily,
        bodySize: styles.fontSize,
        headings: headings.map((heading) => {
          const computed = getComputedStyle(heading)
          return {
            tag: heading.tagName.toLowerCase(),
            text: (heading.textContent || '').trim().slice(0, 140),
            fontFamily: computed.fontFamily,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
          }
        }),
      },
      palette: Array.from(colors).filter((value) => value && value !== 'rgba(0, 0, 0, 0)'),
      headings: headings.map((heading) => (heading.textContent || '').trim()),
    }
  })
}

async function main() {
  await mkdir(OUTPUT, { recursive: true })
  const browser = await chromium.launch()
  const report: Record<string, unknown> = {
    capturedAt: new Date().toISOString(),
    origin: ORIGIN,
    pages: {},
  }

  for (const target of PAGES) {
    const pageReport: Record<string, unknown> = { url: target.url, screenshots: {} }
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      })
      const page = await context.newPage()
      try {
        await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 45000 })
        await page.waitForTimeout(1200)
        const file = path.join(OUTPUT, `${target.slug}-${viewport.name}.png`)
        await page.screenshot({ path: file, fullPage: true })
        pageReport.screenshots = {
          ...(pageReport.screenshots as object),
          [viewport.name]: file,
        }
        if (viewport.name === 'desktop') {
          pageReport.tokens = await extractDesignTokens(page)
        }
      } catch (error) {
        pageReport.screenshots = {
          ...(pageReport.screenshots as object),
          [viewport.name]: `ERROR: ${error instanceof Error ? error.message : String(error)}`,
        }
      }
      await context.close()
    }
    ;(report.pages as Record<string, unknown>)[target.slug] = pageReport
  }

  await writeFile(path.join(OUTPUT, 'site-extract.json'), JSON.stringify(report, null, 2))
  await browser.close()
  console.log(`Captured screenshots and tokens to ${OUTPUT}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
