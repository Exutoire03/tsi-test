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

    // Classement basé sur le nombre de points
    const sortedPlayers = playersWithTeamInfo.sort((a, b) => {
      return b.stats.points - a.stats.points;
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
