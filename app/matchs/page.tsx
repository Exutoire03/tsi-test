'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MatchCard from '@/components/MatchCard'
import allTeams from '@/data/teams.json'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type ApiMatch = {
  id: number
  homeTeamId: number
  awayTeamId: number
  date: string
  status: string
  score: { home: number; away: number }
  venue: string
}

function getTeam(teamId: number) {
  return allTeams.find((t) => t.id === teamId) || {
    name: `Équipe ${teamId}`,
    logo: '/logo.png',
  }
}

export default function MatchesPage() {
  const [allMatches, setAllMatches] = useState<ApiMatch[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch('/api/matches')
        const data = await res.json()
        setAllMatches(data)
      } catch (error) {
        console.error("Failed to fetch matches:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  const filteredMatches = allMatches.filter(match => {
    const homeTeam = getTeam(match.homeTeamId)
    const awayTeam = getTeam(match.awayTeamId)
    const query = searchQuery.toLowerCase()
    return (
      homeTeam.name.toLowerCase().includes(query) ||
      awayTeam.name.toLowerCase().includes(query)
    )
  })

  const now = new Date();
  const processedMatches = filteredMatches.map(match => {
    const matchDate = new Date(match.date);
    const twoHoursAfterStart = new Date(matchDate.getTime() + 2 * 60 * 60 * 1000);

    if (match.status === 'scheduled' && now >= twoHoursAfterStart) {
      const score = match.score?.home > 0 ? match.score : {
          home: Math.floor(Math.random() * 41) + 70,
          away: Math.floor(Math.random() * 41) + 70
      };
      if (score.home === score.away) score.home += 1;
      return { ...match, status: 'finished', score };
    }
    
    if (match.status === 'scheduled' && now >= matchDate) {
      return { ...match, status: 'live' };
    }

    return match;
  });

  const liveMatches = processedMatches.filter(m => m.status === 'live');
  const upcomingMatches = processedMatches.filter(m => m.status === 'scheduled' && new Date(m.date) > now);
  const finishedMatches = processedMatches.filter(m => m.status === 'finished');

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Matchs et Résultats - TSI Basket League", 14, 15);
    let startY = 25;

    if (liveMatches.length > 0) {
      doc.text("Matchs en direct", 14, startY);
      autoTable(doc, {
        startY: startY + 5,
        head: [['Date', 'Équipe à domicile', 'Score', 'Équipe extérieure', 'Lieu']],
        body: liveMatches.map(m => {
          const home = getTeam(m.homeTeamId);
          const away = getTeam(m.awayTeamId);
          return [new Date(m.date).toLocaleDateString('fr-FR'), home.name, `${m.score.home} - ${m.score.away}`, away.name, m.venue];
        }),
      });
      startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (upcomingMatches.length > 0) {
      doc.text("Prochains matchs", 14, startY);
      autoTable(doc, {
        startY: startY + 5,
        head: [['Date', 'Équipes', 'Lieu']],
        body: upcomingMatches.map(m => {
          const home = getTeam(m.homeTeamId);
          const away = getTeam(m.awayTeamId);
          return [new Date(m.date).toLocaleString('fr-FR'), `${home.name} vs ${away.name}`, m.venue];
        }),
      });
      startY = (doc as any).lastAutoTable.finalY + 15;
    }

    if (finishedMatches.length > 0) {
      doc.text("Résultats", 14, startY);
      autoTable(doc, {
        startY: startY + 5,
        head: [['Date', 'Équipe à domicile', 'Score', 'Équipe extérieure', 'Lieu']],
        body: finishedMatches.map(m => {
          const home = getTeam(m.homeTeamId);
          const away = getTeam(m.awayTeamId);
          return [new Date(m.date).toLocaleDateString('fr-FR'), home.name, `${m.score.home} - ${m.score.away}`, away.name, m.venue];
        }),
      });
    }

    doc.save('matchs-resultats.pdf');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Matchs et résultats</h1>
            <p className="text-foreground-secondary">{filteredMatches.length} match{filteredMatches.length > 1 ? 's' : ''} trouvé{filteredMatches.length > 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <input
                type="search"
                placeholder="Rechercher par équipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border-2 border-border bg-background-secondary text-foreground pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-5 w-5 text-foreground-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
            <button
              onClick={exportToPDF}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-hover hover:text-foreground transition-all whitespace-nowrap"
            >
              Exporter en PDF
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-foreground-secondary text-lg">Chargement des matchs...</p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-20 bg-background-secondary border border-border rounded-lg">
            <p className="text-foreground-secondary text-lg">Aucun match trouvé pour cette recherche.</p>
          </div>
        ) : (
          <>
            {liveMatches.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-3xl font-bold text-foreground">En direct</h2>
                  <span className="bg-live text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">🔴 LIVE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveMatches.map(m => <MatchItem key={m.id} match={m} />)}
                </div>
              </section>
            )}

            {upcomingMatches.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Prochains matchs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map(m => <MatchItem key={m.id} match={m} status="upcoming" />)}
                </div>
              </section>
            )}

            {finishedMatches.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-6">Résultats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {finishedMatches.map(m => <MatchItem key={m.id} match={m} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function MatchItem({ match, status }: { match: ApiMatch, status?: 'upcoming' | 'finished' }) {
  const home = getTeam(match.homeTeamId)
  const away = getTeam(match.awayTeamId)
  const dateLabel = new Date(match.date).toLocaleString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <MatchCard
      key={match.id}
      homeTeamName={home.name}
      homeTeamLogo={home.logo}
      awayTeamName={away.name}
      awayTeamLogo={away.logo}
      status={status || 'finished'}
      homeScore={match.score?.home}
      awayScore={match.score?.away}
      dateLabel={dateLabel}
      venue={match.venue}
    />
  )
}

