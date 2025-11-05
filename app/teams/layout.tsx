import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Toutes les Équipes - TSI Basket League",
  description: "Explorez toutes les équipes participant à la TSI Basket League. Logos, villes et informations clés sur chaque franchise.",
  keywords: ["équipes", "basketball africain", "TSI Basket League", "franchises", "logos", "villes"],
};

export default function TeamsLayout({
  children,
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
