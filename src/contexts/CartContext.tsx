import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sb-outlet-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sb-outlet-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    if (product.status !== 'available') {
      toast.error('Ce produit n\'est plus disponible');
      return;
    }
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (exists) {
        toast.info('Ce produit est déjà dans votre panier');
        return prev;
      }
      toast.success('Produit ajouté au panier');
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
    toast.success('Produit retiré du panier');
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, i) => sum + Number(i.product.price), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
