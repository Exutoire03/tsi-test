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
    <div className="overflow-x-auto rounded-lg border border-border bg-background shadow-lg">
      <table className="min-w-full text-sm text-gray-300">
        <thead className="bg-surface text-gray-400 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">#</th>
            <th className="px-4 py-3 text-left font-semibold">Équipe</th>
            <th className="px-4 py-3 text-center font-semibold">V</th>
            <th className="px-4 py-3 text-center font-semibold">D</th>
            <th className="px-4 py-3 text-center font-semibold">PF</th>
            <th className="px-4 py-3 text-center font-semibold">PA</th>
            <th className="px-4 py-3 text-center font-semibold">MJ</th>
            <th className="px-4 py-3 text-center font-semibold">Diff</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {standings.map((team, index) => (
            <tr key={team.id} className="hover:bg-surface-hover transition-colors">
              <td className="px-4 py-3 font-medium text-text-primary">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Image src={team.logo} alt={team.name} width={32} height={32} className="rounded-full" />
                  <span className="font-medium text-text-primary">{team.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center text-text-primary">{team.wins}</td>
              <td className="px-4 py-3 text-center text-text-primary">{team.losses}</td>
              <td className="px-4 py-3 text-center text-text-primary">{team.pointsFor}</td>
              <td className="px-4 py-3 text-center text-text-primary">{team.pointsAgainst}</td>
              <td className="px-4 py-3 text-center text-text-primary">{team.gamesPlayed}</td>
              <td className="px-4 py-3 text-center text-text-primary">{team.pointsFor - team.pointsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
