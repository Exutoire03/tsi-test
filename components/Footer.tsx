'use client'

import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from "next/link";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-surface dark:bg-dark-surface border-t border-border dark:border-dark-border mt-12 text-text-primary dark:text-dark-text-primary" id="cta">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="TSI Basket League" width={32} height={32} />
              <span className="text-xl font-bold">TSI Basket League</span>
            </Link>
            <p className="text-text-secondary dark:text-dark-text-secondary max-w-sm">
              La plateforme de référence pour suivre l'élite du basketball africain.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" aria-label="Twitter" className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" aria-label="LinkedIn" className="text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2 text-text-secondary dark:text-dark-text-secondary">
              <Link href="/equipes" className="hover:text-primary transition-colors">Équipes</Link>
              <Link href="/players" className="hover:text-primary transition-colors">Joueurs</Link>
              <Link href="/matchs" className="hover:text-primary transition-colors">Matchs</Link>
              <Link href="/standings" className="hover:text-primary transition-colors">Classement</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Liens utiles</h4>
            <nav className="flex flex-col gap-2 text-text-secondary dark:text-dark-text-secondary">
              <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border dark:border-dark-border text-center text-text-secondary dark:text-dark-text-secondary">
          © {new Date().getFullYear()} TSI Basket League. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

