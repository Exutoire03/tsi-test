import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Classement des Équipes - TSI Basket League",
  description: "Consultez le classement officiel des équipes de la TSI Basket League. Victoires, défaites, points et position de chaque équipe.",
  keywords: ["classement", "équipes", "basketball africain", "TSI Basket League", "victoires", "défaites", "points"],
};

export default function StandingsLayout({
  children,
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
