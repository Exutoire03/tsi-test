'use client';

import React, { useState, useEffect } from 'react';
import StandingsTable from '@/components/StandingsTable';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interface pour les données du classement
interface Standing {
  id: number;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  gamesPlayed: number;
}


export default function StandingsPage() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/standings');
        const data = await res.json();
        setStandings(data);
      } catch (error) {
        console.error("Erreur lors du chargement du classement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Classement des Équipes - TSI Basket League", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [['#', 'Équipe', 'V', 'D', 'PF', 'PA', 'MJ', 'Diff']],
      body: standings.map((team, index) => [
        index + 1,
        team.name,
        team.wins,
        team.losses,
        team.pointsFor,
        team.pointsAgainst,
        team.gamesPlayed,
        team.pointsFor - team.pointsAgainst,
      ]),
    });

    doc.save('classement-equipes.pdf');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* En-tête de la page */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4">
            🏆 Classement de la Ligue
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-6">
            Suivez la course aux playoffs et découvrez qui dominera la saison régulière de la TSI Basket League.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/standings/players" 
              className="inline-block text-sm text-primary hover:text-secondary font-semibold transition-colors"
            >
              Voir le classement des joueurs
            </Link>
            <button
              onClick={exportToPDF}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-hover hover:text-foreground transition-all"
            >
              Exporter en PDF
            </button>
          </div>
        </header>

        {/* Contenu principal */}
        <main>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
              <p className="text-foreground-secondary text-lg">Chargement du classement...</p>
            </div>
          ) : standings.length > 0 ? (
            <StandingsTable standings={standings} />
          ) : (
            <div className="text-center py-16 bg-background-secondary border border-border rounded-lg">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="mt-6 text-2xl font-semibold text-foreground">Classement non disponible</h3>
              <p className="mt-2 text-foreground-secondary">
                Les données du classement sont en cours de mise à jour. Veuillez réessayer plus tard.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
