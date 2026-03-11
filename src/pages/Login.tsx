import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success('Bienvenue, Administrateur');
      navigate(from, { replace: true });
    } else {
      toast.error('Mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF7] px-4">
      <Card className="w-full max-w-md border-black/5 shadow-2xl rounded-[32px] overflow-hidden">
        <CardHeader className="space-y-4 pt-10 text-center">
          <div className="mx-auto w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-3xl text-secondary">
            <Lock size={32} />
          </div>
          <div className="space-y-1">
            <CardTitle className="font-display text-3xl font-black italic">SB Admin</CardTitle>
            <CardDescription className="font-medium uppercase tracking-[0.2em] text-[10px]">Espace Sécurisé</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-10 px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-2xl border-black/10 focus:ring-secondary focus:border-secondary"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 rounded-full bg-black text-white hover:bg-black/90 font-black uppercase tracking-widest text-xs gap-2"
            >
              <LogIn size={18} />
              Se Connecter
            </Button>
            <p className="text-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
              SB Outlet Vintage Luxury © 2026
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
