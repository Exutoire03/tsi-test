import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

interface Team {
  id: number;
  name: string;
  city: string;
  logo: string;
  mainColor: string;
  secondaryColor: string;
}

interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  date: string;
  status: string;
  score: { home: number; away: number };
  venue: string;
}

interface Standing {
  id: number;
  name: string;
  city: string;
  logo: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  gamesPlayed: number;
}

async function getMatches(base: string): Promise<Match[]> {
  const res = await fetch(`${base}/api/matches`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getTeams(base: string): Promise<Team[]> {
  const res = await fetch(`${base}/api/teams`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getStandings(base: string): Promise<Standing[]> {
  const res = await fetch(`${base}/api/standings`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const h = await headers();
  const protocol = h.get('x-forwarded-proto') ?? 'https';
  const host = h.get('host') ?? 'localhost:3000';
  const base = `${protocol}://${host}`;

  const [matches, teams, standings] = await Promise.all([
    getMatches(base),
    getTeams(base),
    getStandings(base)
  ]);

  const finishedMatches = matches.filter(m => m.status === 'finished').slice(0, 5);
  const upcomingMatches = matches.filter(m => m.status === 'scheduled').slice(0, 3);
  const topStandings = standings.slice(0, 5);
  const featuredTeams = teams.slice(0, 6);

  const getTeamById = (id: number) => teams.find(t => t.id === id);

  return (
    <div className="min-h-screen bg-background">
      {/* Section Hero */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Basketball arena"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4">
            Bienvenue dans la TSI Basket League
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8">
            L'élite du basketball africain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/matchs"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-hover hover:text-foreground transition-all transform hover:scale-105"
            >
              Voir les matchs
            </Link>
            <Link
              href="/teams"
              className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-hover hover:text-foreground transition-all transform hover:scale-105"
            >
              Découvrir les équipes
            </Link>
          </div>
        </div>
      </section>

      {/* Section Résultats récents */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Derniers résultats</h2>
            <Link href="/matchs" className="text-primary hover:text-secondary font-semibold text-sm sm:text-base">
              Voir tous →
            </Link>
          </div>
          <div className="grid gap-4">
            {finishedMatches.map((match) => {
              const homeTeam = getTeamById(match.homeTeamId);
              const awayTeam = getTeamById(match.awayTeamId);
              if (!homeTeam || !awayTeam) return null;

              return (
                <div
                  key={match.id}
                  className="bg-background-secondary border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                      <Image
                        src={homeTeam.logo}
                        alt={homeTeam.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <div>
                        <p className="font-bold text-foreground text-sm sm:text-base">{homeTeam.name}</p>
                        <p className="text-xs sm:text-sm text-foreground-secondary">{homeTeam.city}</p>
                      </div>
                    </div>
                    <div className="text-center py-2 sm:py-0 sm:px-8">
                      <div className="text-2xl sm:text-3xl font-bold text-foreground">
                        {match.score.home} - {match.score.away}
                      </div>
                      <div className="text-xs text-foreground-secondary mt-1">
                        {new Date(match.date).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto flex-1 justify-end">
                      <div className="text-right">
                        <p className="font-bold text-foreground text-sm sm:text-base">{awayTeam.name}</p>
                        <p className="text-xs sm:text-sm text-foreground-secondary">{awayTeam.city}</p>
                      </div>
                      <Image
                        src={awayTeam.logo}
                        alt={awayTeam.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center text-sm text-foreground-secondary">
                    📍 {match.venue}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Matchs à venir */}
      <section className="py-16 px-4 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Prochains matchs</h2>
            <Link href="/matchs" className="text-primary hover:text-secondary font-semibold text-sm sm:text-base">
              Calendrier →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => {
              const homeTeam = getTeamById(match.homeTeamId);
              const awayTeam = getTeamById(match.awayTeamId);
              if (!homeTeam || !awayTeam) return null;

              return (
                <div
                  key={match.id}
                  className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary"
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                      📅 À venir
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center flex-1">
                      <Image
                        src={homeTeam.logo}
                        alt={homeTeam.name}
                        width={50}
                        height={50}
                        className="mx-auto mb-2"
                      />
                      <p className="font-bold text-sm text-foreground">{homeTeam.name}</p>
                    </div>
                    <div className="text-2xl font-bold text-foreground-secondary px-4">VS</div>
                    <div className="text-center flex-1">
                      <Image
                        src={awayTeam.logo}
                        alt={awayTeam.name}
                        width={50}
                        height={50}
                        className="mx-auto mb-2"
                      />
                      <p className="font-bold text-sm text-foreground">{awayTeam.name}</p>
                    </div>
                  </div>
                  <div className="text-center border-t border-border pt-4">
                    <p className="text-sm font-semibold text-foreground">
                      {new Date(match.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                    <p className="text-xs text-foreground-secondary mt-1">
                      {new Date(match.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-foreground-secondary mt-2">📍 {match.venue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Classement */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Classement actuel</h2>
            <Link href="/standings" className="text-primary hover:text-secondary font-semibold text-sm sm:text-base">
              Classement complet →
            </Link>
          </div>
          <div className="bg-background-secondary border border-border rounded-lg overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="text-left p-4">#</th>
                  <th className="text-left p-4">Équipe</th>
                  <th className="text-center p-4">V</th>
                  <th className="text-center p-4">D</th>
                  <th className="text-center p-4">+/-</th>
                </tr>
              </thead>
              <tbody>
                {topStandings.map((team, index) => (
                  <tr
                    key={team.id}
                    className="border-b border-border hover:bg-hover transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-bold text-primary text-lg">{index + 1}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <div>
                          <p className="font-bold text-foreground">{team.name}</p>
                          <p className="text-xs text-foreground-secondary">{team.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <span className="font-bold text-success">{team.wins}</span>
                    </td>
                    <td className="text-center p-4">
                      <span className="font-bold text-foreground-secondary">{team.losses}</span>
                    </td>
                    <td className="text-center p-4">
                      <span className={`font-bold ${
                        team.pointsFor - team.pointsAgainst > 0 
                          ? 'text-success' 
                          : 'text-live'
                      }`}>
                        {team.pointsFor - team.pointsAgainst > 0 ? '+' : ''}
                        {team.pointsFor - team.pointsAgainst}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section Équipes en vedette */}
      <section className="py-16 px-4 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Les équipes phares</h2>
            <Link href="/teams" className="text-primary hover:text-secondary font-semibold text-sm sm:text-base">
              Voir toutes →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredTeams.map((team) => (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="bg-background border border-border rounded-lg p-4 text-center hover:shadow-xl transition-all transform hover:scale-105 hover:border-primary group"
              >
                <div className="mb-4">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={60}
                    height={60}
                    className="mx-auto group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="font-bold text-foreground text-sm">{team.name}</h3>
                <p className="text-xs text-foreground-secondary">{team.city}</p>
                <div className="mt-3 flex gap-1 justify-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: team.mainColor }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: team.secondaryColor }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Rejoignez la TSI Basket League
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Suivez l'action en direct, découvrez les statistiques des joueurs et vivez la passion du basketball africain comme jamais auparavant.
          </p>
          <Link
            href="/about"
            className="inline-block bg-primary text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-hover hover:text-foreground transition-all transform hover:scale-105"
          >
            Découvrir plus
          </Link>
        </div>
      </section>
    </div>
  );
}
