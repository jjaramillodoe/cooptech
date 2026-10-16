import { revalidatePath } from 'next/cache'

/** Refresh every cached frontend page after a CMS edit, so changes show without a redeploy. */
export function revalidateSite() {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Outside a Next.js request (seed and sync scripts) there is nothing to revalidate.
  }
}
