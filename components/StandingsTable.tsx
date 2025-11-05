import Image from 'next/image'

interface Standing {
  id: number;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  gamesPlayed: number;
}

interface StandingsTableProps {
  standings: Standing[];
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <div>
      {/* Vue Tableau pour les grands écrans */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border bg-background-secondary shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary text-white uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 text-left font-bold">#</th>
              <th className="px-4 py-4 text-left font-bold">Équipe</th>
              <th className="px-4 py-4 text-center font-bold">V</th>
              <th className="px-4 py-4 text-center font-bold">D</th>
              <th className="px-4 py-4 text-center font-bold">PF</th>
              <th className="px-4 py-4 text-center font-bold">PA</th>
              <th className="px-4 py-4 text-center font-bold">MJ</th>
              <th className="px-4 py-4 text-center font-bold">+/-</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {standings.map((team, index) => {
              const diff = team.pointsFor - team.pointsAgainst;
              return (
                <tr key={team.id} className="hover:bg-hover transition-colors">
                  <td className="px-4 py-4">
                    <span className="font-bold text-primary text-lg">{index + 1}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Image src={team.logo} alt={team.name} width={40} height={40} className="object-contain" />
                      <span className="font-semibold text-foreground">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-bold text-success">{team.wins}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-bold text-foreground-secondary">{team.losses}</span>
                  </td>
                  <td className="px-4 py-4 text-center text-foreground">{team.pointsFor}</td>
                  <td className="px-4 py-4 text-center text-foreground">{team.pointsAgainst}</td>
                  <td className="px-4 py-4 text-center text-foreground">{team.gamesPlayed}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`font-bold ${
                      diff > 0 ? 'text-success' : diff < 0 ? 'text-live' : 'text-foreground-secondary'
                    }`}>
                      {diff > 0 ? '+' : ''}{diff}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Vue Cartes pour les petits écrans */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {standings.map((team, index) => {
          const diff = team.pointsFor - team.pointsAgainst;
          return (
            <div key={team.id} className="rounded-lg border border-border bg-background-secondary p-4 shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary text-xl w-6 text-center">{index + 1}</span>
                  <Image src={team.logo} alt={team.name} width={40} height={40} className="object-contain" />
                  <span className="font-semibold text-foreground">{team.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg"><span className="text-success">{team.wins}</span> - <span className="text-live">{team.losses}</span></p>
                  <p className="text-xs text-foreground-secondary">V - D</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-4 gap-2 text-center">
                <div>
                  <p className="text-xs text-foreground-secondary">MJ</p>
                  <p className="font-semibold text-foreground">{team.gamesPlayed}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary">PF</p>
                  <p className="font-semibold text-foreground">{team.pointsFor}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary">PA</p>
                  <p className="font-semibold text-foreground">{team.pointsAgainst}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-secondary">+/-</p>
                  <p className={`font-semibold ${diff > 0 ? 'text-success' : diff < 0 ? 'text-live' : 'text-foreground-secondary'}`}>
                    {diff > 0 ? '+' : ''}{diff}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
