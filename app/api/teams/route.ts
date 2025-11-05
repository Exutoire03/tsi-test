import { NextResponse } from "next/server"
import teams from "@/data/teams.json"

// ✅ GET /api/teams
// Renvoie toutes les équipes ou une seule selon l'id fourni
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    // Si aucun id → on retourne la liste complète
    if (!id) {
      return NextResponse.json(teams, { status: 200 })
    }

    // Si id est présent → on renvoie l'équipe correspondante
    const teamId = parseInt(id, 10)
    const team = teams.find((t) => t.id === teamId)

    if (!team) {
      return NextResponse.json(
        { error: "Équipe non trouvée" },
        { status: 404 }
      )
    }

    return NextResponse.json(team, { status: 200 })
  } catch (error) {
    console.error("Erreur API /teams:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des équipes" },
      { status: 500 }
    )
  }
}
