import { NextResponse } from "next/server"
import players from "@/data/players.json"

// ✅ GET /api/players
// Renvoie tous les joueurs ou filtre selon le teamId fourni
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const teamIdParam = searchParams.get("teamId")

    let result = players as Array<{ teamId: number }>

    if (teamIdParam !== null) {
      const id = Number.parseInt(teamIdParam, 10)
      if (Number.isNaN(id)) {
        return NextResponse.json(
          { error: "Paramètre teamId invalide" },
          { status: 400 }
        )
      }
      result = result.filter((p) => Number(p.teamId) === id)
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Erreur API /players:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des joueurs" },
      { status: 500 }
    )
  }
}
