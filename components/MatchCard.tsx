import Image from 'next/image'

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

type MatchCardProps = {
  homeTeamName: string
  homeTeamLogo: string
  awayTeamName: string
  awayTeamLogo: string
  status: 'finished' | 'upcoming'
  homeScore?: number
  awayScore?: number
  dateLabel: string
  venue: string
}

export default function MatchCard(props: MatchCardProps) {
  const {
    homeTeamName,
    homeTeamLogo,
    awayTeamName,
    awayTeamLogo,
    status,
    homeScore,
    awayScore,
    dateLabel,
    venue,
  } = props

  const isFinished = status === 'finished'

  return (
    <div
      className={cn(
        'rounded-lg border border-border p-5 transition-all hover:shadow-lg',
        isFinished ? 'bg-background-secondary hover:border-success' : 'bg-background hover:border-primary'
      )}
    >
      {!isFinished && (
        <div className="flex justify-center mb-3">
          <span className="text-xs uppercase tracking-wide rounded-full bg-primary text-white px-3 py-1 font-semibold">
            📅 À venir
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start flex-1 min-w-0">
          <Image src={homeTeamLogo} alt={homeTeamName} width={40} height={40} className="object-contain" />
          <span className="text-sm text-foreground font-semibold truncate">{homeTeamName}</span>
        </div>
        
        {isFinished ? (
          <div className="text-2xl font-bold text-primary flex items-center gap-3">
            <span>{homeScore}</span>
            <span>-</span>
            <span>{awayScore}</span>
          </div>
        ) : (
          <div className="text-xl font-bold text-foreground-secondary">VS</div>
        )}
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end flex-1 min-w-0">
          <span className="text-sm text-foreground font-semibold truncate text-right">{awayTeamName}</span>
          <Image src={awayTeamLogo} alt={awayTeamName} width={40} height={40} className="object-contain" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-foreground-secondary">
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          <span>{dateLabel}</span>
        </div>
        <span className="text-right">📍 {venue}</span>
      </div>
    </div>
  )
}

