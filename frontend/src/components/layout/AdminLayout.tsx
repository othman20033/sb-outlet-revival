import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Settings, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => (
  <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10">
    <header className="h-16 border-b bg-card fixed top-0 w-full z-50">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-xl font-bold tracking-tight shrink-0">
            SB <span className="text-secondary">Admin</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <LayoutDashboard size={16} /> Articles
            </Link>
            <Link to="/commandes" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <ShoppingBag size={16} /> Commandes
            </Link>
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Settings size={16} /> Paramètres
            </Link>
          </nav>
        </div>

        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={16} /> Retour au site
          </Button>
        </Link>
      </div>
    </header>

    <main className="flex-1 mt-16 pb-12">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
