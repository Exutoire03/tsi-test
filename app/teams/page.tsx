import { headers } from 'next/headers'
import TeamCard from '@/components/TeamCard'
import fallbackTeams from '@/data/teams.json'
import Link from 'next/link'

type Team = {
  id: number
  name: string
  city: string
  logo: string
  mainColor?: string
  secondaryColor?: string
}

export default async function TeamsPage() {
  let data: Team[] = []
  try {
    const h = await headers()
    const protocol = h.get('x-forwarded-proto') ?? 'http'
    const host = h.get('host') ?? 'localhost:3000'
    const base = `${protocol}://${host}`
    const res = await fetch(`${base}/api/teams`, { cache: 'no-store' })
    if (res.ok) {
      data = await res.json()
    } else {
      data = fallbackTeams as Team[]
    }
  } catch {
    data = fallbackTeams as Team[]
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Les Équipes</h1>
            <p className="text-foreground-secondary">Découvrez les {data.length} équipes de la TSI Basket League</p>
          </div>
          <Link 
            href="/" 
            className="mt-4 sm:mt-0 text-sm text-primary hover:text-secondary font-semibold transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  )
}


