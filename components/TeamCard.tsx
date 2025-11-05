import Image from 'next/image'
import Link from 'next/link'

type Team = {
  id: number
  name: string
  city: string
  logo: string
  mainColor?: string
  secondaryColor?: string
}

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/equipes/${team.id}`} className="group rounded-lg border border-border bg-background p-4 hover:shadow-sm transition block">
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-border p-2 group-hover:border-primary">
          <Image src={team.logo} alt={team.name} width={48} height={48} />
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary">{team.name}</div>
          <div className="text-xs text-text-secondary">{team.city}</div>
        </div>
      </div>
      {(team.mainColor || team.secondaryColor) && (
        <div className="mt-3 flex items-center gap-2">
          {team.mainColor && (
            <span className="inline-block h-3 w-6 rounded" style={{ backgroundColor: team.mainColor }} />
          )}
          {team.secondaryColor && (
            <span className="inline-block h-3 w-6 rounded" style={{ backgroundColor: team.secondaryColor }} />
          )}
        </div>
      )}
    </Link>
  )
}


