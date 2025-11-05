'use client'

import { useState, useEffect } from 'react'
import TeamCard from '@/components/TeamCard'
import Link from 'next/link'

type Team = {
  id: number
  name: string
  city: string
  logo: string
  mainColor?: string
  secondaryColor?: string
}

export default function TeamsPage() {
  const [allTeams, setAllTeams] = useState<Team[]>([])
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch('/api/teams')
        const data = await res.json()
        setAllTeams(data)
        setFilteredTeams(data)
      } catch (error) {
        console.error("Failed to fetch teams:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  useEffect(() => {
    const filtered = allTeams.filter(team =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredTeams(filtered)
  }, [searchQuery, allTeams])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Les Équipes</h1>
            <p className="text-foreground-secondary">{filteredTeams.length} équipe{filteredTeams.length > 1 ? 's' : ''} trouvée{filteredTeams.length > 1 ? 's' : ''}</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="search"
              placeholder="Rechercher une équipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border-2 border-border bg-background-secondary text-foreground pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="h-5 w-5 text-foreground-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-foreground-secondary text-lg">Chargement des équipes...</p>
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="text-center py-20 bg-background-secondary border border-border rounded-lg">
            <p className="text-foreground-secondary text-lg">Aucune équipe trouvée.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

