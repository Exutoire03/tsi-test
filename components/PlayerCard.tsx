import Image from 'next/image'

type Player = {
  id: number
  teamId: number
  firstName: string
  lastName: string
  number: number
  position: string
  height: number
  weight: number
  age: number
  photo: string
  stats: {
    points: number
    rebounds: number
    assists: number
  }
}

type PlayerCardProps = {
  player: Player
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface text-center hover:shadow-md transition-shadow p-4">
      <div className="mx-auto mt-2 h-28 w-28 rounded-full overflow-hidden border-2 border-border flex items-center justify-center">
        <Image src={player.photo} alt={`${player.firstName} ${player.lastName}`} width={112} height={112} className="object-cover" />
      </div>
      <div className="p-2">
        <h3 className="font-bold text-text-primary text-lg">{`${player.firstName} ${player.lastName}`}</h3>
        <p className="text-sm text-secondary">#{player.number} | {player.position}</p>
      </div>
      
      <div className="mt-4 text-sm text-text-secondary space-y-1">
        <p>Taille: {player.height} cm</p>
        <p>Poids: {player.weight} kg</p>
        <p>Âge: {player.age} ans</p>
      </div>

      {player.stats && (
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 text-center text-xs text-text-secondary">
          <div><span className="block text-text-primary font-semibold text-base">{player.stats.points}</span> PTS</div>
          <div><span className="block text-text-primary font-semibold text-base">{player.stats.rebounds}</span> REB</div>
          <div><span className="block text-text-primary font-semibold text-base">{player.stats.assists}</span> AST</div>
        </div>
      )}
    </div>
  )
}
