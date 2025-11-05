import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contactez-nous - TSI Basket League",
  description: "Contactez la TSI Basket League pour toute question, suggestion ou demande de partenariat. Nous sommes là pour vous aider.",
  keywords: ["contact", "formulaire de contact", "support", "aide", "partenariat", "TSI Basket League"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-6">
            Nous sommes là pour répondre à toutes vos questions et suggestions.
          </p>
        </header>

        <main className="prose dark:prose-invert mx-auto text-foreground-secondary">
          <p>
            N'hésitez pas à nous contacter via le formulaire ci-dessous ou en utilisant nos coordonnées directes.
          </p>

          <div className="mt-10 p-8 bg-background-secondary border border-border rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-foreground mb-6">Formulaire de Contact</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-input text-foreground"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-input text-foreground"
                  placeholder="votre.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-input text-foreground"
                  placeholder="Sujet de votre message"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring-primary bg-input text-foreground"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-hover hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="mt-10 p-8 bg-background-secondary border border-border rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-foreground mb-6">Nos Coordonnées</h2>
            <p>
              <strong>Email :</strong> <a href="mailto:contact@tsibasketleague.com" className="text-primary hover:underline">contact@tsibasketleague.com</a>
            </p>
            <p>
              <strong>Téléphone :</strong> <a href="tel:+33123456789" className="text-primary hover:underline">+33 1 23 45 67 89</a>
            </p>
            <p>
              <strong>Adresse :</strong> [Adresse de la TSI Basket League, ex: 123 Rue du Basket, 75001 Paris, France]
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
