'use client'

import { useState, useEffect } from 'react'
import PlayerCard from '../components/PlayerCard'

type Player = {
  id: number
  teamId: number
  firstName: string
  lastName: string
  number: number
  position: string
  height: number
  weight: number
  age: number
  photo: string
  stats: {
    points: number
    rebounds: number
    assists: number
  }
}

type Team = {
  id: number
  name: string
}

export default function PlayersPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersRes, teamsRes] = await Promise.all([
          fetch('/api/players'),
          fetch('/api/teams'),
        ])
        const playersData = await playersRes.json()
        const teamsData = await teamsRes.json()

        setAllPlayers(playersData)
        setFilteredPlayers(playersData)
        setTeams(teamsData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedTeam === 'all') {
      setFilteredPlayers(allPlayers)
    } else {
      const teamId = parseInt(selectedTeam, 10)
      setFilteredPlayers(allPlayers.filter((player) => player.teamId === teamId))
    }
  }, [selectedTeam, allPlayers])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Joueurs de la ligue</h1>
        <div className="mt-4 sm:mt-0">
          <label htmlFor="team-select" className="sr-only">Filtrer par équipe</label>
          <select
            id="team-select"
            onChange={(e) => setSelectedTeam(e.target.value)}
            value={selectedTeam}
            className="rounded-md border-border bg-surface text-text-primary focus:ring-primary focus:border-primary"
          >
            <option value="all">Toutes les équipes</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-text-secondary">Chargement des joueurs...</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  )
}
