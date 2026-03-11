import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="border-t bg-card mt-20">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-3">
            SB <span className="text-secondary">Outlet</span>
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Votre destination pour des pièces vintage premium au Maroc. Chaque article est unique et sélectionné avec soin.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3 uppercase tracking-wider">Navigation</h4>
          <div className="flex flex-col gap-2">
            <Link to="/catalogue" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Catalogue</Link>
            <Link to="/drops" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Drops</Link>
            <Link to="/commandes" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Mes Commandes</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3 uppercase tracking-wider">Suivez-nous</h4>
          <a href="https://instagram.com/sboutlet" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Instagram className="h-4 w-4" /> @sboutlet
          </a>
          <p className="font-body text-xs text-muted-foreground mt-4">
            Livraison partout au Maroc 🇲🇦 — Paiement à la livraison
          </p>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center">
        <p className="font-body text-xs text-muted-foreground">© 2026 SB Outlet. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
