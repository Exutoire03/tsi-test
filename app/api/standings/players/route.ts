import { NextResponse } from "next/server"
import players from "@/data/players.json"
import teams from "@/data/teams.json"

// ✅ GET /api/standings/players
// Calcule le classement des joueurs
export async function GET() {
  try {
    // Ajout des informations de l'équipe à chaque joueur
    const playersWithTeamInfo = players.map(player => {
      const team = teams.find(t => t.id === player.teamId);
      return {
        ...player,
        teamName: team ? team.name : 'N/A',
        teamLogo: team ? team.logo : '/logo.png',
      };
    });

    // Classement basé sur la somme des points, rebonds et assists
    const sortedPlayers = playersWithTeamInfo.sort((a, b) => {
      const scoreA = a.stats.points + a.stats.rebounds + a.stats.assists;
      const scoreB = b.stats.points + b.stats.rebounds + b.stats.assists;
      return scoreB - scoreA;
    });

    return NextResponse.json(sortedPlayers, { status: 200 });
  } catch (error) {
    console.error("Erreur API /standings/players:", error);
    return NextResponse.json(
      { error: "Erreur lors du calcul du classement des joueurs" },
      { status: 500 }
    );
  }
}
