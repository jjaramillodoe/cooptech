export const contactLimits = {
  name: 100,
  email: 254,
  phone: 30,
  studentName: 100,
  homeSchool: 120,
  message: 5000,
} as const

export type ContactField = keyof typeof contactLimits

/** Trim and collapse runs of whitespace (keeps newlines out of single-line fields). */
export function cleanLine(input: string) {
  return input.replace(/\s+/g, ' ').trim()
}

/**
 * Title-case a name only when it was typed all lowercase or all uppercase.
 * Mixed-case input (McDonald, DiMaggio, de la Cruz) is left as typed.
 */
export function normalizeName(input: string) {
  const name = cleanLine(input)
  const hasLetters = /\p{L}/u.test(name)
  if (!hasLetters) return name
  if (name !== name.toLowerCase() && name !== name.toUpperCase()) return name
  return name.toLowerCase().replace(/(^|[\s\-'’(.])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase())
}

export function normalizeEmail(input: string) {
  return input.trim().toLowerCase()
}

export function isEmailShape(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

/**
 * Parse a US phone number. Accepts 10 digits, or 11 starting with 1, plus an
 * optional extension ("ext 3920", "x12"). Returns "(718) 243-1700 ext. 3920",
 * or null when the input is not a valid US number.
 */
export function normalizePhone(input: string) {
  const raw = cleanLine(input)
  if (!raw) return ''

  const extMatch = raw.match(/(?:ext\.?|extension|x|#)\s*(\d{1,6})\s*$/i)
  const extension = extMatch?.[1]
  const main = extMatch ? raw.slice(0, extMatch.index) : raw

  if (/[^\d\s().+\-]/.test(main)) return null

  let digits = main.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
  if (digits.length !== 10) return null
  // NANP: area code and exchange cannot start with 0 or 1.
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null

  const formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  return extension ? `${formatted} ext. ${extension}` : formatted
}
