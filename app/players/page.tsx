'use client'

import { useState, useEffect } from 'react'
import PlayerCard from '@/components/PlayerCard'
import Link from 'next/link'

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
  const [searchQuery, setSearchQuery] = useState('')
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
    let players = allPlayers;

    if (selectedTeam !== 'all') {
      const teamId = parseInt(selectedTeam, 10)
      players = players.filter((player) => player.teamId === teamId)
    }

    if (searchQuery) {
      players = players.filter(player => 
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPlayers(players)
  }, [selectedTeam, searchQuery, allPlayers])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Joueurs de la ligue</h1>
            <p className="text-foreground-secondary">
              {filteredPlayers.length} joueur{filteredPlayers.length > 1 ? 's' : ''} trouvé{filteredPlayers.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Rechercher un joueur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border-2 border-border bg-background-secondary text-foreground pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full sm:w-auto"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-5 w-5 text-foreground-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
            <div className="relative">
              <select
                id="team-select"
                onChange={(e) => setSelectedTeam(e.target.value)}
                value={selectedTeam}
                className="rounded-lg border-2 border-border bg-background-secondary text-foreground px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full"
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
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-foreground-secondary text-lg">Chargement des joueurs...</p>
          </div>
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center py-20 bg-background-secondary border border-border rounded-lg">
            <p className="text-foreground-secondary text-lg">Aucun joueur trouvé pour les critères sélectionnés.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
