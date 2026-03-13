import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { mockSettings } from '@/data/mock';

const Cart = () => {
  const { items, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Votre panier est vide</h1>
        <p className="font-body text-sm text-muted-foreground mb-6">Découvrez nos pièces vintage uniques</p>
        <Button asChild>
          <Link to="/catalogue">Voir le catalogue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 max-w-2xl">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">Panier</h1>

      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div key={item.product.id} className="flex gap-4 p-4 rounded-lg bg-card border">
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-20 h-24 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
              <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">{item.product.brand}</p>
              <h3 className="font-body text-sm font-medium truncate">{item.product.name}</h3>
              <p className="font-body text-xs text-muted-foreground">Taille : {item.product.size}</p>
              <p className="font-display text-lg font-bold mt-1">{item.product.price} DH</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-lg bg-card border p-6 space-y-3">
        <div className="flex justify-between font-body text-sm">
          <span className="text-muted-foreground">Sous-total</span>
          <span>{totalPrice} DH</span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-muted-foreground">Livraison</span>
          <span>{mockSettings.delivery_fee} DH</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="font-display text-lg font-bold">Total</span>
          <span className="font-display text-lg font-bold">{totalPrice + mockSettings.delivery_fee} DH</span>
        </div>
        <Button asChild size="lg" className="w-full mt-4">
          <Link to="/checkout">Commander <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
