import { NextResponse } from "next/server"
import matches from "@/data/matches.json"
import teams from "@/data/teams.json"

// ✅ GET /api/standings
// Calcule automatiquement le classement à partir des résultats des matchs
export async function GET() {
  try {
    // Initialisation des stats de chaque équipe
    const standings = teams.map((team) => ({
      id: team.id,
      name: team.name,
      city: team.city,
      logo: team.logo,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      gamesPlayed: 0,
    }))

    // Parcours des matchs terminés pour calculer les scores
    matches.forEach((match) => {
      if (match.status === "finished" && match.score) {
        const home = standings.find((t) => t.id === match.homeTeamId)
        const away = standings.find((t) => t.id === match.awayTeamId)

        if (home && away) {
          home.pointsFor += match.score.home
          home.pointsAgainst += match.score.away
          away.pointsFor += match.score.away
          away.pointsAgainst += match.score.home

          home.gamesPlayed++
          away.gamesPlayed++

          if (match.score.home > match.score.away) {
            home.wins++
            away.losses++
          } else {
            away.wins++
            home.losses++
          }
        }
      }
    })

    // Classement basé sur le nombre de victoires, puis différence de points
    const sortedStandings = standings.sort((a, b) => {
      if (b.wins === a.wins) {
        const diffA = a.pointsFor - a.pointsAgainst
        const diffB = b.pointsFor - b.pointsAgainst
        return diffB - diffA
      }
      return b.wins - a.wins
    })

    return NextResponse.json(sortedStandings, { status: 200 })
  } catch (error) {
    console.error("Erreur API /standings:", error)
    return NextResponse.json(
      { error: "Erreur lors du calcul du classement" },
      { status: 500 }
    )
  }
}
