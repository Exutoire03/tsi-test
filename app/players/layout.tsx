import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Joueurs de la Ligue - TSI Basket League",
  description: "Découvrez tous les joueurs de la TSI Basket League. Statistiques détaillées, équipes et profils des stars du basketball africain.",
  keywords: ["joueurs", "basketball africain", "TSI Basket League", "statistiques", "profils", "équipes"],
};

export default function PlayersLayout({
  children,
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
