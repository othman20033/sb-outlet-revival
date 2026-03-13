import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockSettings } from '@/data/mock';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Package } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Nom requis').max(100),
  phone: z.string().trim().regex(/^(0[5-7]\d{8}|\+212[5-7]\d{8})$/, 'Numéro marocain invalide'),
  city: z.string().trim().min(2, 'Ville requise').max(100),
  address: z.string().trim().min(5, 'Adresse requise').max(300),
});

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) return <Navigate to="/panier" />;

  const total = totalPrice + mockSettings.delivery_fee;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) return <Navigate to="/panier" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const orderItems = items.map(item => ({
      product_id: item.product.id,
      price: Number(item.product.price),
    }));
    
    const newOrder = await addOrder({
      customer_name: form.name,
      customer_phone: form.phone,
      customer_city: form.city,
      customer_address: form.address,
      total_amount: total,
      delivery_fee: mockSettings.delivery_fee,
      status: 'pending',
      items: orderItems,
    });

    setIsSubmitting(false);

    if (newOrder) {
      setSubmitted(true);
      clearCart();
      toast.success('Votre commande a été envoyée avec succès !');
      // Redirect to tracking page with phone number
      setTimeout(() => {
        navigate(`/commandes?phone=${encodeURIComponent(form.phone)}`);
      }, 1500);
    } else {
      toast.error('Erreur lors de la validation de la commande. Veuillez réessayer.');
    }
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="container py-8 md:py-12 max-w-lg">
      <Button asChild variant="ghost" size="sm" className="mb-6 rounded-full">
        <Link to="/panier"><ArrowLeft className="mr-2 h-4 w-4" /> Retour au panier</Link>
      </Button>

      <h1 className="font-display text-4xl md:text-5xl font-black italic tracking-tight mb-2 uppercase leading-[0.9]">
        Finaliser <br />Ma Commande.
      </h1>
      <p className="font-body text-sm text-muted-foreground mb-8">Paiement à la livraison partout au Maroc</p>

      {/* Order summary */}
      <div className="rounded-[32px] bg-card border border-black/5 p-6 mb-8 shadow-sm">
        <p className="font-display text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground mb-4">Récapitulatif</p>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.product.id} className="flex justify-between items-center py-1">
              <div className="flex items-center gap-3 truncate">
                <img src={item.product.images[0]} className="w-10 h-10 object-cover rounded-lg" alt="" />
                <span className="truncate font-bold text-sm tracking-tight">{item.product.name}</span>
              </div>
              <span className="font-display font-black shrink-0 text-sm">{item.product.price} DH</span>
            </div>
          ))}
        </div>
        <div className="border-t border-black/5 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Livraison</span>
            <span>{mockSettings.delivery_fee} DH</span>
          </div>
          <div className="flex justify-between items-end pt-2">
            <span className="font-display font-black uppercase text-xs tracking-[0.2em]">Total</span>
            <span className="font-display font-black text-3xl">{total} DH</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[10px] uppercase font-black tracking-widest ml-1 mb-2 block">Nom complet *</Label>
            <Input id="name" placeholder="VOTRE NOM" className="h-14 rounded-2xl px-6 font-bold" value={form.name} onChange={e => updateField('name', e.target.value)} />
            {errors.name && <p className="text-[10px] font-bold text-destructive mt-1 ml-1 uppercase">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="phone" className="text-[10px] uppercase font-black tracking-widest ml-1 mb-2 block">Téléphone *</Label>
            <Input id="phone" placeholder="06XXXXXXXX" className="h-14 rounded-2xl px-6 font-bold" value={form.phone} onChange={e => updateField('phone', e.target.value)} />
            {errors.phone && <p className="text-[10px] font-bold text-destructive mt-1 ml-1 uppercase">{errors.phone}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-[10px] uppercase font-black tracking-widest ml-1 mb-2 block">Ville *</Label>
              <Input id="city" placeholder="VILLE" className="h-14 rounded-2xl px-6 font-bold" value={form.city} onChange={e => updateField('city', e.target.value)} />
              {errors.city && <p className="text-[10px] font-bold text-destructive mt-1 ml-1 uppercase">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="address" className="text-[10px] uppercase font-black tracking-widest ml-1 mb-2 block">Adresse *</Label>
              <Input id="address" placeholder="ADRESSE COMPLETE" className="h-14 rounded-2xl px-6 font-bold" value={form.address} onChange={e => updateField('address', e.target.value)} />
              {errors.address && <p className="text-[10px] font-bold text-destructive mt-1 ml-1 uppercase">{errors.address}</p>}
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-16 rounded-full bg-black text-white hover:bg-black/90 font-black uppercase tracking-[0.2em] text-xs transition-transform active:scale-95"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Traitement...
            </div>
          ) : (
            'Confirmer ma commande'
          )}
        </Button>

        <p className="font-body text-[10px] font-bold text-muted-foreground text-center uppercase tracking-widest">
          Paiement cash à la livraison 🇲🇦
        </p>
      </form>
    </div>
  );
};

export default Checkout;
