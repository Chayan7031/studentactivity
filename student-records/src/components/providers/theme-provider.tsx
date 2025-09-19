"use client"

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"
import { type ReactNode } from "react"

type Props = Omit<ThemeProviderProps, 'children'> & {
  children: ReactNode
}

export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}