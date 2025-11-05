import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions Légales - TSI Basket League",
  description: "Consultez les mentions légales du site de la TSI Basket League, incluant les informations sur l'éditeur, l'hébergement et la propriété intellectuelle.",
  keywords: ["mentions légales", "informations légales", "éditeur", "hébergement", "propriété intellectuelle", "TSI Basket League"],
};

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4">
            Mentions Légales
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-6">
            Informations légales concernant notre site.
          </p>
        </header>

        <main className="prose dark:prose-invert mx-auto text-foreground-secondary">
          <h2>1. Identification de l'éditeur du site</h2>
          <p>
            Le présent site web, accessible à l'adresse [URL de votre site], est édité par :
          </p>
          <ul>
            <li>
              <strong>Nom de l'entité :</strong> [Nom de l'entité ou de la personne physique]
            </li>
            <li>
              <strong>Forme juridique :</strong> [SARL, SAS, Association, etc. si applicable]
            </li>
            <li>
              <strong>Adresse :</strong> [Votre adresse complète]
            </li>
            <li>
              <strong>Téléphone :</strong> [Votre numéro de téléphone]
            </li>
            <li>
              <strong>Email :</strong> [Votre adresse e-mail de contact]
            </li>
            <li>
              <strong>Numéro d'immatriculation :</strong> [Numéro SIRET, RCS, ou autre identifiant légal si applicable]
            </li>
          </ul>

          <h2>2. Hébergement</h2>
          <p>
            Le site est hébergé par :
          </p>
          <ul>
            <li>
              <strong>Nom de l'hébergeur :</strong> [Nom de l'hébergeur, ex: Vercel, Netlify, OVH, AWS]
            </li>
            <li>
              <strong>Adresse de l'hébergeur :</strong> [Adresse de l'hébergeur]
            </li>
            <li>
              <strong>Téléphone de l'hébergeur :</strong> [Téléphone de l'hébergeur]
            </li>
          </ul>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
          </p>
          <p>
            Les marques citées sur ce site sont déposées par les sociétés qui en sont propriétaires. Toute reproduction, représentation, utilisation ou modification, par quelque procédé que ce soit et sur quelque support que ce soit, de tout ou partie d'une marque, sans avoir obtenu l'autorisation préalable et écrite de son titulaire, est strictement interdite.
          </p>

          <h2>4. Données personnelles</h2>
          <p>
            Conformément à la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD), vous disposez de droits sur vos données personnelles. Pour plus d'informations sur la collecte, l'utilisation et la protection de vos données, veuillez consulter notre <a href="/privacy-policy" className="text-primary hover:underline">Politique de Confidentialité</a>.
          </p>

          <h2>5. Limitation de responsabilité</h2>
          <p>
            La TSI Basket League s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toutefois, la TSI Basket League ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site.
          </p>

          <h2>6. Droit applicable et attribution de juridiction</h2>
          <p>
            Le présent site est régi par le droit français. En cas de litige, et à défaut d'accord amiable, les tribunaux français seront seuls compétents.
          </p>
        </main>
      </div>
    </div>
  );
}
