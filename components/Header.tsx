'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const hasDark = root.classList.contains('dark')
    setIsDark(hasDark)
  }, [])

  function toggle() {
    const root = document.documentElement
    root.classList.toggle('dark')
    setIsDark(root.classList.contains('dark'))
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Activer le thème clair' : 'Activer le thème sombre'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-hover transition-colors"
    >
      {isDark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-text-primary">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-20a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm11 9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM3 12a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3Zm16.95 7.536a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM5.464 5.464a1 1 0 0 1 0-1.414l.707-.707A1 1 0 0 1 7.586 4.757l-.707.707a1 1 0 0 1-1.415 0Zm12.072-1.414a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 17.243 6.88l-.707-.707a1 1 0 0 1 0-1.415ZM4.757 17.243a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 1 1 5.464 18.95l-.707-.707Z"/>
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-text-primary">
          <path d="M21.752 15.002A9 9 0 0 1 9.002 2.252a.75.75 0 0 0-1.064-.852 10.5 10.5 0 1 0 14.666 14.666.75.75 0 0 0-.852-1.064Z"/>
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/80 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="TSI Basket League" width={36} height={36} priority />
              <span className="hidden sm:inline text-sm font-medium text-text-secondary">TSI Basket League – L’élite du basketball africain</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-text-secondary hover:text-text-primary">Accueil</Link>
            <Link href="/equipes" className="text-sm text-text-secondary hover:text-text-primary">Équipes</Link>
            <Link href="/players" className="text-sm text-text-secondary hover:text-text-primary">Joueurs</Link>
            <Link href="/matchs" className="text-sm text-text-secondary hover:text-text-primary">Matchs</Link>
            <Link href="/classement" className="text-sm text-text-secondary hover:text-text-primary">Classement</Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center rounded-md border border-border px-2.5 h-10 w-44 focus-within:ring-2 focus-within:ring-primary/40">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-text-secondary">
                <circle cx="11" cy="11" r="7"/>
                <path d="m20 20-3.5-3.5"/>
              </svg>
              <input
                type="search"
                placeholder="Recherche"
                className="ml-2 h-full w-full bg-transparent text-sm text-text-primary placeholder-text-secondary outline-none"
              />
            </div>

            <ThemeToggle />

            <Link
              href="/live"
              className="ml-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-3 text-sm font-semibold text-text-primary hover:bg-hover border border-border"
            >
              Voir les scores en direct
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}


