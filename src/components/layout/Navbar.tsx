import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/catalogue', label: 'Collections' },
    { to: '/catalogue?category=homme', label: 'Homme' },
    { to: '/catalogue?category=femme', label: 'Femme' },
    { to: '/catalogue?category=enfant', label: 'Enfant' },
    { to: '/catalogue?category=accessoires', label: 'Accessoires' },
    { to: '/commandes', label: 'Suivi Commande' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-black/5">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tighter text-foreground flex items-center gap-2">
            <span className="text-2xl">SB</span>
            <span className="text-secondary italic text-sm tracking-widest uppercase">OUTLET</span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center gap-6 px-4">
          {links.map(l => (
            <Link 
              key={l.label} 
              to={l.to} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Icons */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <Link to="/login" className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors p-2" title="Administration">
            <User size={20} />
          </Link>
          
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors p-2">
            <Instagram size={20} />
          </a>
          
          <Link to="/panier" className="relative group p-2">
            <ShoppingBag size={20} className="text-muted-foreground group-hover:text-foreground transition-colors focus:outline-none" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden h-9 w-9" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-background border-b border-black/5 lg:hidden z-50 shadow-xl"
          >
            <div className="container py-6 flex flex-col gap-4">
              {links.map(l => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-xl font-bold text-foreground hover:text-secondary py-1"
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-black/5 pt-4 flex items-center justify-between px-4">
                <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                  Section Admin
                </Link>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-secondary">
                  <Instagram size={18} className="text-muted-foreground" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
