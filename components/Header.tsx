'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function Header() {
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
            <Link
              href="/matchs"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-hover hover:text-foreground transition-all"
            >
              🔴 Matchs en direct
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}


