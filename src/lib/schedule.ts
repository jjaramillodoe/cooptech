import type { DateFieldValidation } from 'payload'

/** Rejects an Ends At that is not after Starts At on the same record. */
export const endsAfterStart: DateFieldValidation = (value, { siblingData }) => {
  const startsAt = (siblingData as { startsAt?: string | Date | null })?.startsAt
  if (!value || !startsAt) return true
  if (new Date(value).getTime() <= new Date(startsAt).getTime()) {
    return 'Ends At must be after Starts At.'
  }
  return true
}
