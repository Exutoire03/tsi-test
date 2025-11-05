import Image from 'next/image'

interface PlayerStanding {
  id: number;
  firstName: string;
  lastName: string;
  teamName: string;
  teamLogo: string;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
  };
}

interface PlayerStandingsTableProps {
  players: PlayerStanding[];
}

export default function PlayerStandingsTable({ players }: PlayerStandingsTableProps) {
  return (
    <div>
      {/* Vue Tableau pour les grands écrans */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border bg-background-secondary shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 text-left font-bold">#</th>
              <th className="px-4 py-4 text-left font-bold">Joueur</th>
              <th className="px-4 py-4 text-left font-bold">Équipe</th>
              <th className="px-4 py-4 text-center font-bold">PTS</th>
              <th className="px-4 py-4 text-center font-bold">REB</th>
              <th className="px-4 py-4 text-center font-bold">AST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {players.map((player, index) => (
              <tr key={player.id} className="hover:bg-hover transition-colors">
                <td className="px-4 py-4">
                  <span className="font-bold text-primary text-lg">{index + 1}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-semibold text-foreground">{`${player.firstName} ${player.lastName}`}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image src={player.teamLogo} alt={player.teamName} width={30} height={30} className="object-contain" />
                    <span className="font-semibold text-foreground-secondary">{player.teamName}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-bold text-primary">{player.stats.points}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-bold text-success">{player.stats.rebounds}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-bold text-secondary">{player.stats.assists}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vue Cartes pour les petits écrans */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {players.map((player, index) => (
          <div key={player.id} className="rounded-lg border border-border bg-background-secondary p-4 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-primary text-xl w-6 text-center">{index + 1}</span>
                <Image src={player.teamLogo} alt={player.teamName} width={40} height={40} className="object-contain" />
                <div>
                  <p className="font-semibold text-foreground">{`${player.firstName} ${player.lastName}`}</p>
                  <p className="text-xs text-foreground-secondary">{player.teamName}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-foreground-secondary">PTS</p>
                <p className="font-semibold text-primary text-lg">{player.stats.points}</p>
              </div>
              <div>
                <p className="text-xs text-foreground-secondary">REB</p>
                <p className="font-semibold text-success text-lg">{player.stats.rebounds}</p>
              </div>
              <div>
                <p className="text-xs text-foreground-secondary">AST</p>
                <p className="font-semibold text-secondary text-lg">{player.stats.assists}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
