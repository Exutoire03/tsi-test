import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import teams from '@/data/teams.json'
import { headers } from 'next/headers'

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
  return teams.find((t) => t.id === teamId) || {
    name: `Équipe ${teamId}`,
    logo: '/logo.png',
  }
}

export default async function MatchesPage() {
  const h = await headers()
  const protocol = h.get('x-forwarded-proto') ?? 'http'
  const host = h.get('host') ?? 'localhost:3000'
  const base = `${protocol}://${host}`
  const res = await fetch(`${base}/api/matches`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Impossible de récupérer les matchs')
  const data: ApiMatch[] = await res.json()

  const finishedMatches = data.filter(m => m.status === 'finished');
  const liveMatches = data.filter(m => m.status === 'live');
  const upcomingMatches = data.filter(m => m.status === 'scheduled');

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* En-tête */}
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Matchs et résultats</h1>
            <p className="text-foreground-secondary">{data.length} matchs au total</p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/teams" className="text-sm text-primary hover:text-secondary font-semibold transition-colors">
              Découvrir les équipes
            </Link>
            <Link href="/" className="text-sm text-primary hover:text-secondary font-semibold transition-colors">
              ← Accueil
            </Link>
          </div>
        </header>

        {/* Matchs en direct */}
        {liveMatches.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-foreground">En direct</h2>
              <span className="bg-live text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                🔴 LIVE
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMatches.map((m) => {
                const home = getTeam(m.homeTeamId)
                const away = getTeam(m.awayTeamId)
                const dateLabel = new Date(m.date).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })
                return (
                  <MatchCard
                    key={m.id}
                    homeTeamName={home.name}
                    homeTeamLogo={home.logo}
                    awayTeamName={away.name}
                    awayTeamLogo={away.logo}
                    status="finished"
                    homeScore={m.score?.home}
                    awayScore={m.score?.away}
                    dateLabel={dateLabel}
                    venue={m.venue}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Matchs à venir */}
        {upcomingMatches.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Prochains matchs</h2>
              <span className="text-sm text-foreground-secondary">{upcomingMatches.length} match{upcomingMatches.length > 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((m) => {
                const home = getTeam(m.homeTeamId)
                const away = getTeam(m.awayTeamId)
                const dateLabel = new Date(m.date).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })
                return (
                  <MatchCard
                    key={m.id}
                    homeTeamName={home.name}
                    homeTeamLogo={home.logo}
                    awayTeamName={away.name}
                    awayTeamLogo={away.logo}
                    status="upcoming"
                    homeScore={m.score?.home}
                    awayScore={m.score?.away}
                    dateLabel={dateLabel}
                    venue={m.venue}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Résultats */}
        {finishedMatches.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-foreground">Résultats</h2>
              <span className="text-sm text-foreground-secondary">{finishedMatches.length} match{finishedMatches.length > 1 ? 's' : ''} terminé{finishedMatches.length > 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {finishedMatches.map((m) => {
                const home = getTeam(m.homeTeamId)
                const away = getTeam(m.awayTeamId)
                const dateLabel = new Date(m.date).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'short', year: 'numeric'
                })
                return (
                  <MatchCard
                    key={m.id}
                    homeTeamName={home.name}
                    homeTeamLogo={home.logo}
                    awayTeamName={away.name}
                    awayTeamLogo={away.logo}
                    status="finished"
                    homeScore={m.score?.home}
                    awayScore={m.score?.away}
                    dateLabel={dateLabel}
                    venue={m.venue}
                  />
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}


