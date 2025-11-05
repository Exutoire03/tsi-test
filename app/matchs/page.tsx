import Link from 'next/link'
import MatchCard from '../components/MatchCard'
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <header className="flex items-end justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Matchs et résultats</h1>
        <Link href="/equipes" className="text-sm text-secondary hover:text-primary">Découvrir les équipes</Link>
      </header>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">Tous les matchs</h2>
          <div className="text-xs text-text-secondary">{data.length} matchs</div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((m) => {
            const home = getTeam(m.homeTeamId)
            const away = getTeam(m.awayTeamId)
            const status = m.status === 'finished' ? 'finished' : 'upcoming'
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
                status={status}
                homeScore={m.score?.home}
                awayScore={m.score?.away}
                dateLabel={dateLabel}
                venue={m.venue}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}


