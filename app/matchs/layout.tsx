import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Matchs et Résultats - TSI Basket League",
  description: "Retrouvez tous les matchs passés, en direct et à venir de la TSI Basket League. Scores, calendrier et lieux des rencontres.",
  keywords: ["matchs", "résultats", "calendrier", "basketball africain", "TSI Basket League", "scores", "rencontres"],
};

export default function MatchesLayout({
  children,
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
