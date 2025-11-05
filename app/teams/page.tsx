import { headers } from 'next/headers'
import TeamCard from '../components/TeamCard'
import fallbackTeams from '@/data/teams.json'

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Équipes</h1>
        <div className="text-xs text-text-secondary">{data.length} équipes</div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}


