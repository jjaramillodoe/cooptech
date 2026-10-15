import 'dotenv/config'

import { getPayload } from 'payload'

import { cleanLine, normalizeEmail, normalizeName, normalizePhone } from '../src/lib/contact-validation'
import config from '../src/payload.config'

/**
 * Apply the contact form's name / email / phone rules to existing submissions.
 * Dry run by default; pass --apply to write. Never touches emailsSent or status.
 */
const apply = process.argv.includes('--apply')

async function main() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'contact-submissions',
    pagination: false,
    depth: 0,
    sort: 'createdAt',
  })

  let changed = 0
  const badPhones: string[] = []

  for (const doc of docs) {
    const next: Record<string, string> = {}
    const name = normalizeName(doc.name)
    if (name !== doc.name) next.name = name
    const email = normalizeEmail(doc.email)
    if (email !== doc.email) next.email = email
    if (doc.studentName) {
      const studentName = normalizeName(doc.studentName)
      if (studentName !== doc.studentName) next.studentName = studentName
    }
    if (doc.homeSchool) {
      const homeSchool = cleanLine(doc.homeSchool)
      if (homeSchool !== doc.homeSchool) next.homeSchool = homeSchool
    }
    if (doc.phone) {
      const phone = normalizePhone(doc.phone)
      if (phone === null) badPhones.push(`${doc.id} ${doc.name}: ${JSON.stringify(doc.phone)}`)
      else if (phone !== doc.phone) next.phone = phone
    }

    if (Object.keys(next).length === 0) continue
    changed++
    const diff = Object.entries(next)
      .map(([key, value]) => `${key}: ${JSON.stringify(doc[key as keyof typeof doc])} → ${JSON.stringify(value)}`)
      .join('; ')
    console.log(`${apply ? 'update' : 'would update'} ${doc.id} — ${diff}`)
    if (apply) {
      await payload.update({ collection: 'contact-submissions', id: doc.id, data: next, depth: 0 })
    }
  }

  console.log(`\n${docs.length} submissions, ${changed} ${apply ? 'updated' : 'to update'}.`)
  if (badPhones.length) console.log(`Phone numbers left as-is (not a valid US number):\n  ${badPhones.join('\n  ')}`)
  if (!apply) console.log('Dry run. Re-run with --apply to write these changes.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
