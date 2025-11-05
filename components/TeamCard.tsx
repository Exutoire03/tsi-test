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
    <Link 
      href={`/teams/${team.id}`} 
      className="group rounded-lg border border-border bg-background-secondary p-4 hover:shadow-lg hover:border-primary transition-all transform hover:scale-105 block"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-border p-2 group-hover:border-primary transition-colors">
          <Image src={team.logo} alt={team.name} width={48} height={48} className="object-contain" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{team.name}</div>
          <div className="text-xs text-foreground-secondary">{team.city}</div>
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


