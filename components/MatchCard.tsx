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
        'rounded-lg border border-border p-4 transition',
        isFinished ? 'bg-surface hover:shadow-sm' : 'bg-background'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Image src={homeTeamLogo} alt={homeTeamName} width={28} height={28} />
          <span className="text-sm text-text-primary font-medium">{homeTeamName}</span>
        </div>
        {isFinished ? (
          <div className="text-sm font-semibold text-text-primary">{homeScore}</div>
        ) : (
          <span className="text-[10px] uppercase tracking-wide rounded-full border border-border px-2 py-0.5 text-text-secondary">À venir</span>
        )}
        <div className="flex items-center gap-2">
          {!isFinished && <span className="text-sm text-text-primary font-medium">{awayTeamName}</span>}
          <Image src={awayTeamLogo} alt={awayTeamName} width={28} height={28} />
        </div>
      </div>

      {isFinished && (
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 opacity-0 select-none">
            {/* spacer to align layout with top row */}
            <span className="text-sm">sp</span>
          </div>
          <div className="text-sm font-semibold text-text-primary">{awayScore}</div>
          <div className="opacity-0 select-none">sp</div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          <span>{dateLabel}</span>
        </div>
        <span>{venue}</span>
      </div>
    </div>
  )
}


