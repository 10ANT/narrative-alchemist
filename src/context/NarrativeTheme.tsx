'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} })

export function NarrativeThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('na-theme') as Theme | null
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])

  function toggle() {
    setTheme(t => {
      const next: Theme = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('na-theme', next)
      return next
    })
  }

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <div className={`na-root${theme === 'light' ? ' light' : ''}`} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeCtx.Provider>
  )
}

export function useNarrativeTheme() {
  return useContext(ThemeCtx)
}
