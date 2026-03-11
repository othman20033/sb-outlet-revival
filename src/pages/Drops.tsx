import DropCountdown from '@/components/DropCountdown';
import { mockDrop } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Drops = () => {
  const [contact, setContact] = useState('');

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    toast.success('Vous serez notifié lors du prochain drop !');
    setContact('');
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Événements</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Drops</h1>
      </div>

      <DropCountdown drop={mockDrop} />

      {/* Notification signup */}
      <div className="mt-12 max-w-md mx-auto text-center">
        <Bell className="h-8 w-8 text-secondary mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold mb-2">Ne manquez aucun drop</h2>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Inscrivez-vous pour être alerté dès qu'un nouveau drop est lancé.
        </p>
        <form onSubmit={handleNotify} className="flex gap-2">
          <Input
            placeholder="Email ou téléphone"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">M'alerter</Button>
        </form>
      </div>
    </div>
  );
};

export default Drops;
