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
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-foreground-secondary text-lg">Équipe introuvable.</p>
          <Link href="/teams" className="mt-4 inline-block text-sm text-primary hover:text-secondary font-semibold">← Retour aux équipes</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* En-tête de l'équipe */}
        <div className="bg-background-secondary border border-border rounded-lg p-8">
          <div className="flex items-center gap-6">
            <div className="rounded-lg border-2 border-primary p-3 bg-background">
              <Image src={team.logo} alt={team.name} width={80} height={80} className="object-contain" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-2">{team.name}</h1>
              <p className="text-foreground-secondary text-lg">
                📍 {team.city} {team.foundationYear ? `• Fondée en ${team.foundationYear}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Section Effectif */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Effectif</h2>
            <span className="text-sm text-foreground-secondary">{roster.length} joueurs</span>
          </div>
          {roster.length === 0 ? (
            <p className="mt-3 text-foreground-secondary bg-background-secondary border border-border rounded-lg p-8 text-center">
              Aucun joueur trouvé.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {roster.map((pl) => (
                <div key={pl.id} className="rounded-lg border border-border bg-background-secondary p-5 hover:shadow-lg hover:border-primary transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-md border-2 border-primary p-1 bg-background">
                      <Image src={pl.photo} alt={`${pl.firstName} ${pl.lastName}`} width={50} height={50} className="object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{pl.firstName} {pl.lastName}</div>
                      <div className="text-xs text-primary font-semibold">#{pl.number} • {pl.position}</div>
                    </div>
                  </div>
                  {pl.stats && (
                    <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 text-center text-xs text-foreground-secondary">
                      <div><span className="block text-primary font-bold text-base">{pl.stats.points}</span> PTS</div>
                      <div><span className="block text-success font-bold text-base">{pl.stats.rebounds}</span> REB</div>
                      <div><span className="block text-secondary font-bold text-base">{pl.stats.assists}</span> AST</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="flex gap-4">
          <Link href="/teams" className="text-sm text-primary hover:text-secondary font-semibold transition-colors">
            ← Retour aux équipes
          </Link>
          <Link href="/" className="text-sm text-primary hover:text-secondary font-semibold transition-colors">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  )
}


