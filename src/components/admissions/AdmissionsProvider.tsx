'use client'

import { createContext, useContext } from 'react'

import { ADMISSIONS_PORTAL_URL, type AdmissionsPortal } from '@/lib/admissions'

const AdmissionsContext = createContext<AdmissionsPortal>({
  open: false,
  portalUrl: ADMISSIONS_PORTAL_URL,
})

export function AdmissionsProvider({
  open,
  portalUrl,
  children,
}: AdmissionsPortal & { children: React.ReactNode }) {
  return <AdmissionsContext.Provider value={{ open, portalUrl }}>{children}</AdmissionsContext.Provider>
}

export function useAdmissions() {
  return useContext(AdmissionsContext)
}
