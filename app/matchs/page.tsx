'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import allTeams from '@/data/teams.json'

type ApiMatch = {
  id: number
  homeTeamId: number
  awayTeamId: number
  date: string
  status: string
  score: { home: number; away: number }
  venue: string
}

function getTeam(teamId: number) {
  return allTeams.find((t) => t.id === teamId) || {
    name: `Équipe ${teamId}`,
    logo: '/logo.png',
  }
}

export default function MatchesPage() {
  const [allMatches, setAllMatches] = useState<ApiMatch[]>([])
  const [filteredMatches, setFilteredMatches] = useState<ApiMatch[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch('/api/matches')
        const data = await res.json()
        setAllMatches(data)
        setFilteredMatches(data)
      } catch (error) {
        console.error("Failed to fetch matches:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  useEffect(() => {
    const filtered = allMatches.filter(match => {
      const homeTeam = getTeam(match.homeTeamId)
      const awayTeam = getTeam(match.awayTeamId)
      const query = searchQuery.toLowerCase()
      return (
        homeTeam.name.toLowerCase().includes(query) ||
        awayTeam.name.toLowerCase().includes(query)
      )
    })
    setFilteredMatches(filtered)
  }, [searchQuery, allMatches])

  const liveMatches = filteredMatches.filter(m => m.status === 'live');
  const upcomingMatches = filteredMatches.filter(m => m.status === 'scheduled');
  const finishedMatches = filteredMatches.filter(m => m.status === 'finished');

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Matchs et résultats</h1>
            <p className="text-foreground-secondary">{filteredMatches.length} match{filteredMatches.length > 1 ? 's' : ''} trouvé{filteredMatches.length > 1 ? 's' : ''}</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="search"
              placeholder="Rechercher par équipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border-2 border-border bg-background-secondary text-foreground pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="h-5 w-5 text-foreground-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-foreground-secondary text-lg">Chargement des matchs...</p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-20 bg-background-secondary border border-border rounded-lg">
            <p className="text-foreground-secondary text-lg">Aucun match trouvé pour cette recherche.</p>
          </div>
        ) : (
          <>
            {liveMatches.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-3xl font-bold text-foreground">En direct</h2>
                  <span className="bg-live text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">🔴 LIVE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveMatches.map(m => <MatchItem key={m.id} match={m} />)}
                </div>
              </section>
            )}

            {upcomingMatches.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Prochains matchs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map(m => <MatchItem key={m.id} match={m} status="upcoming" />)}
                </div>
              </section>
            )}

            {finishedMatches.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Résultats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {finishedMatches.map(m => <MatchItem key={m.id} match={m} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function MatchItem({ match, status }: { match: ApiMatch, status?: 'upcoming' | 'finished' }) {
  const home = getTeam(match.homeTeamId)
  const away = getTeam(match.awayTeamId)
  const dateLabel = new Date(match.date).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric'
  })

  return (
    <MatchCard
      key={match.id}
      homeTeamName={home.name}
      homeTeamLogo={home.logo}
      awayTeamName={away.name}
      awayTeamLogo={away.logo}
      status={status || 'finished'}
      homeScore={match.score?.home}
      awayScore={match.score?.away}
      dateLabel={dateLabel}
      venue={match.venue}
    />
  )
}

