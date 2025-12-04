"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Update localStorage when theme changes
    if (isDark) {
      localStorage.setItem("theme", "dark")
      document.documentElement.classList.add("dark")
    } else {
      localStorage.setItem("theme", "light")
      document.documentElement.classList.remove("dark")
    }
  }, [isDark, mounted])

  if (!mounted) return <>{children}</>

  return <>{children}</>
}
