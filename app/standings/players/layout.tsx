import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Classement des Joueurs - TSI Basket League",
  description: "Découvrez le classement individuel des meilleurs joueurs de la TSI Basket League par points, rebonds et passes décisives.",
  keywords: ["classement joueurs", "meilleurs joueurs", "basketball africain", "TSI Basket League", "points", "rebonds", "passes décisives"],
};

export default function PlayerStandingsLayout({
  children,
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
