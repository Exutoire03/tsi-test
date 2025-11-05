import teams from '@/data/teams.json'
import players from '@/data/players.json'
import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'

type Team = {
  id: number
  name: string
  city: string
  logo: string
  foundationYear?: number
}

export default async function TeamDetailPage({ params }: { params: { id: string } }) {
  const rawId = decodeURIComponent(params.id ?? '')
  const numericFromSlug = parseInt(rawId.replace(/[^0-9]/g, ''), 10)
  const teamId = Number.isFinite(numericFromSlug) ? numericFromSlug : Number(rawId)
  let team: Team | undefined
  let roster: any[] = []

  // Récupération via API
  try {
    const h = await headers()
    const protocol = h.get('x-forwarded-proto') ?? 'http'
    const host = h.get('host') ?? 'localhost:3000'
    const base = `${protocol}://${host}`
    const [teamRes, playersRes] = await Promise.all([
      fetch(`${base}/api/teams?id=${teamId}`, { cache: 'no-store' }),
      fetch(`${base}/api/players?teamId=${teamId}`, { cache: 'no-store' }),
    ])
    if (teamRes.ok) team = await teamRes.json()
    if (playersRes.ok) roster = await playersRes.json()
  } catch {}

  // Fallback local si API indisponible
  if (!team) {
    team = (teams as Team[]).find((t) => Number((t as any).id) === teamId)
  }
  if (roster.length === 0) {
    roster = (players as any[]).filter((p) => Number(p.teamId) === teamId)
  }

  if (!team) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-text-secondary">Équipe introuvable.</p>
        <Link href="/equipes" className="mt-4 inline-block text-sm text-secondary hover:text-primary">Retour aux équipes</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center gap-4">
        <div className="rounded-md border border-border p-2">
          <Image src={team.logo} alt={team.name} width={64} height={64} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">{team.name}</h1>
          <p className="text-text-secondary text-sm">{team.city} {team.foundationYear ? `• Fondée en ${team.foundationYear}` : ''}</p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-text-primary">Effectif</h2>
        {roster.length === 0 ? (
          <p className="mt-3 text-sm text-text-secondary">Aucun joueur trouvé.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {roster.map((pl) => (
              <div key={pl.id} className="rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md border border-border p-1">
                    <Image src={pl.photo} alt={`${pl.firstName} ${pl.lastName}`} width={40} height={40} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{pl.firstName} {pl.lastName}</div>
                    <div className="text-xs text-text-secondary">#{pl.number} • {pl.position}</div>
                  </div>
                </div>
                {pl.stats && (
                  <div className="mt-3 grid grid-cols-3 text-center text-xs text-text-secondary">
                    <div><span className="block text-text-primary font-semibold">{pl.stats.points}</span> PTS</div>
                    <div><span className="block text-text-primary font-semibold">{pl.stats.rebounds}</span> REB</div>
                    <div><span className="block text-text-primary font-semibold">{pl.stats.assists}</span> AST</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <div>
        <Link href="/equipes" className="text-sm text-secondary hover:text-primary">← Retour aux équipes</Link>
      </div>
    </div>
  )
}


