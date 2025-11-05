import { NextResponse } from "next/server"
import matches from "@/data/matches.json"

// ✅ GET /api/matches
// Renvoie la liste complète des matchs ou filtre selon les query params (status, teamId)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const teamId = searchParams.get("teamId")

    let filteredMatches = matches

    // Filtre par statut si précisé (ex: ?status=finished)
    if (status) {
      filteredMatches = filteredMatches.filter(
        (m) => m.status.toLowerCase() === status.toLowerCase()
      )
    }

    // Filtre par équipe si précisée (ex: ?teamId=3)
    if (teamId) {
      const id = parseInt(teamId, 10)
      filteredMatches = filteredMatches.filter(
        (m) => m.homeTeamId === id || m.awayTeamId === id
      )
    }

    // Tri par date (du plus récent au plus ancien)
    filteredMatches = filteredMatches.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return NextResponse.json(filteredMatches, { status: 200 })
  } catch (error) {
    console.error("Erreur API /matches:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des matchs" },
      { status: 500 }
    )
  }
}
