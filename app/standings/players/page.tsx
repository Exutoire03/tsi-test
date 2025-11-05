'use client';

import React, { useState, useEffect } from 'react';
import PlayerStandingsTable from '@/components/PlayerStandingsTable';
import Link from 'next/link';

// Interface for player standings data
interface PlayerStanding {
  id: number;
  firstName: string;
  lastName: string;
  teamName: string;
  teamLogo: string;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
  };
}

export default function PlayerStandingsPage() {
  const [playerStandings, setPlayerStandings] = useState<PlayerStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerStandings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/standings/players');
        const data = await res.json();
        setPlayerStandings(data);
      } catch (error) {
        console.error("Erreur lors du chargement du classement des joueurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStandings();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4">
            Classement des Joueurs
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-6">
            Découvrez les meilleurs joueurs de la ligue, classés par leurs performances.
          </p>
          <Link 
            href="/standings" 
            className="inline-block text-sm text-primary hover:text-secondary font-semibold transition-colors"
          >
            Voir le classement des équipes
          </Link>
        </header>

        <main>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
              <p className="text-foreground-secondary text-lg">Chargement du classement...</p>
            </div>
          ) : playerStandings.length > 0 ? (
            <PlayerStandingsTable players={playerStandings} />
          ) : (
            <div className="text-center py-16 bg-background-secondary border border-border rounded-lg">
              <h3 className="mt-6 text-2xl font-semibold text-foreground">Classement non disponible</h3>
              <p className="mt-2 text-foreground-secondary">
                Les données sont en cours de mise à jour. Veuillez réessayer plus tard.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
