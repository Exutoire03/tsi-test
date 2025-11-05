'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) {
    return (
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-hover transition-colors"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Activer le thème clair' : 'Activer le thème sombre'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-hover transition-colors"
    >
      {isDark ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="h-5 w-5 text-primary"
        >
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="h-5 w-5 text-foreground"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="TSI Basket League" width={40} height={40} priority className="object-contain" />
              <span className="hidden sm:inline text-sm font-semibold text-foreground">TSI Basket League</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors">Accueil</Link>
            <Link href="/teams" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors">Équipes</Link>
            <Link href="/players" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors">Joueurs</Link>
            <Link href="/matchs" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors">Matchs</Link>
            <Link href="/standings" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors">Classement</Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/matchs"
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-hover hover:text-foreground transition-all"
            >
              🔴 Matchs en direct
            </Link>
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-hover transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col gap-4 p-4">
            <Link href="/" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Accueil</Link>
            <Link href="/teams" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Équipes</Link>
            <Link href="/players" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Joueurs</Link>
            <Link href="/matchs" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Matchs</Link>
            <Link href="/standings" className="text-sm font-medium text-foreground-secondary hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Classement</Link>
            <Link
              href="/matchs"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-hover hover:text-foreground transition-all sm:hidden"
              onClick={() => setIsOpen(false)}
            >
              🔴 Matchs en direct
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}



