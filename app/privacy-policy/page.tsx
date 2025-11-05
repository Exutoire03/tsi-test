import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de Confidentialité - TSI Basket League",
  description: "Découvrez notre politique de confidentialité concernant la collecte, l'utilisation et la protection de vos données sur le site de la TSI Basket League.",
  keywords: ["politique de confidentialité", "données personnelles", "protection des données", "cookies", "TSI Basket League"],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-6">
            Votre vie privée est importante pour nous.
          </p>
        </header>

        <main className="prose dark:prose-invert mx-auto text-foreground-secondary">
          <p>
            Cette Politique de Confidentialité décrit comment TSI Basket League ("nous", "notre", "nos") collecte, utilise et divulgue vos informations personnelles lorsque vous utilisez notre site web (le "Service").
          </p>

          <h2>1. Informations que nous collectons</h2>
          <p>
            Nous pouvons collecter différents types d'informations en relation avec votre accès et votre utilisation de notre Service, y compris :
          </p>
          <ul>
            <li>
              <strong>Informations d'utilisation :</strong> Lorsque vous accédez au Service, nous pouvons collecter automatiquement certaines informations, y compris votre adresse IP, le type de navigateur, le système d'exploitation, les pages que vous visitez, l'heure et la date de votre visite, le temps passé sur ces pages et d'autres statistiques de diagnostic.
            </li>
            <li>
              <strong>Cookies et technologies de suivi :</strong> Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre Service et conserver certaines informations. Les cookies sont des fichiers avec une petite quantité de données qui peuvent inclure un identifiant unique anonyme. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé.
            </li>
          </ul>

          <h2>2. Comment nous utilisons vos informations</h2>
          <p>
            Nous utilisons les informations collectées à diverses fins :
          </p>
          <ul>
            <li>Pour fournir et maintenir notre Service.</li>
            <li>Pour améliorer, personnaliser et étendre notre Service.</li>
            <li>Pour comprendre et analyser la façon dont vous utilisez notre Service.</li>
            <li>Pour détecter, prévenir et résoudre les problèmes techniques.</li>
          </ul>

          <h2>3. Partage et divulgation de vos informations</h2>
          <p>
            Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations avec des fournisseurs de services tiers qui nous aident à exploiter notre Service, à condition que ces parties acceptent de garder ces informations confidentielles.
          </p>

          <h2>4. Sécurité des données</h2>
          <p>
            La sécurité de vos données est importante pour nous, mais n'oubliez pas qu'aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est sécurisée à 100 %. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos informations personnelles, nous ne pouvons garantir leur sécurité absolue.
          </p>

          <h2>5. Vos droits</h2>
          <p>
            Conformément aux lois applicables sur la protection des données, vous disposez de certains droits concernant vos informations personnelles, notamment le droit d'accéder, de rectifier, de supprimer ou de vous opposer au traitement de vos données.
          </p>

          <h2>6. Modifications de cette Politique de Confidentialité</h2>
          <p>
            Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page. Il vous est conseillé de consulter cette Politique de Confidentialité périodiquement pour tout changement.
          </p>

          <h2>7. Nous contacter</h2>
          <p>
            Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter via les informations disponibles sur notre site.
          </p>
        </main>
      </div>
    </div>
  );
}
