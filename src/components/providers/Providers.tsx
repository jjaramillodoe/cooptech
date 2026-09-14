'use client'

import { ThemeProvider } from '@once-ui-system/core/contexts'

import { onceUiConfig } from '@/once-ui.config'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      theme={onceUiConfig.theme}
      brand={onceUiConfig.brand}
      accent={onceUiConfig.accent}
      neutral={onceUiConfig.neutral}
      solid={onceUiConfig.solid}
      solidStyle={onceUiConfig.solidStyle}
      border={onceUiConfig.border}
      surface={onceUiConfig.surface}
      transition={onceUiConfig.transition}
      scaling={onceUiConfig.scaling}
    >
      {children}
    </ThemeProvider>
  )
}
