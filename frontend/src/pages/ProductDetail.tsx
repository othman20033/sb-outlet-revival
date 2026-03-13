import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, ArrowLeft, Phone, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { getProduct } = useProducts();
  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="container py-40 text-center">
        <p className="text-muted-foreground font-display text-2xl font-black uppercase tracking-tighter">Oups ! Trésor introuvable.</p>
        <Button asChild variant="ghost" className="mt-8 rounded-full border border-black/10 px-8 h-12 font-bold uppercase tracking-widest text-[10px]">
          <Link to="/catalogue"><ArrowLeft className="mr-2 h-4 w-4" /> Retour au catalogue</Link>
        </Button>
      </div>
    );
  }

  const isSold = product.status === 'sold';

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-12 px-4">
        <Button asChild variant="ghost" size="sm" className="mb-12 group hover:text-secondary h-auto p-0 font-black tracking-widest text-[11px] uppercase transition-colors">
          <Link to="/catalogue" className="flex items-center gap-2">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Retour au catalogue
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto">
          {/* Main Image View */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] bg-muted shadow-sm group">
              <img
                src={product.images[0]}
                alt={product.name}
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${isSold ? 'opacity-40 grayscale blur-[2px]' : ''}`}
              />
              
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                {isSold ? (
                  <Badge className="bg-black text-white text-[10px] h-8 px-5 uppercase tracking-[0.2em] font-black rounded-xl border-none shadow-xl">
                    Sold Out
                  </Badge>
                ) : (
                  <Badge className="bg-secondary text-white text-[10px] h-8 px-5 uppercase tracking-[0.2em] font-black rounded-xl border-none shadow-xl">
                    Pièce Unique
                  </Badge>
                )}
                {product.original_price && !isSold && (
                  <Badge className="bg-white/90 text-black backdrop-blur-md text-[10px] h-8 px-5 uppercase tracking-[0.2em] font-black rounded-xl border-none shadow-xl">
                    -{Math.round((1 - product.price / product.original_price) * 100)}%
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Image dots decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Product Details Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-start py-4"
          >
            <div className="mb-10">
              <p className="text-secondary font-black text-[11px] uppercase tracking-[0.4em] mb-4">{product.brand}</p>
              <h1 className="font-display text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tighter italic">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-display text-4xl md:text-5xl font-black text-foreground">{product.price} DH</span>
                {product.original_price && (
                  <span className="text-xl text-muted-foreground/60 line-through font-medium">{product.original_price} DH</span>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center py-4 border-b border-black/5">
                <span className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em]">Taille</span>
                <span className="text-sm font-bold bg-muted px-4 py-1.5 rounded-full">{product.size}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-black/5">
                <span className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em]">État du Trésor</span>
                <span className="text-sm font-bold text-secondary">Très bon état — Lavé & Repassé</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-black/5">
                <span className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em]">Description</span>
                <p className="text-sm text-foreground/70 font-medium max-w-[300px] text-right">{product.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-12">
              <Button
                size="lg"
                className={`h-16 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl ${isSold ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-black text-white hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98]'}`}
                disabled={isSold}
                onClick={() => addItem(product)}
              >
                <ShoppingBag size={20} className="mr-3" />
                {isSold ? 'Déjà entre de bonnes mains' : 'Saisir cette pièce unique'}
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-16 rounded-full border-black/10 hover:bg-black/5 text-xs font-black uppercase tracking-[0.2em] gap-3">
                <a href={`https://wa.me/212661163771?text=Bonjour, je suis intéressé par l'article : ${product.name} (${product.id})`} target="_blank" rel="noreferrer">
                  <Phone size={18} fill="currentColor" /> Commander par WhatsApp
                </a>
              </Button>
            </div>

            {/* Reassurance Grid */}
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-black/5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-secondary/5 text-secondary">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Livraison 48H</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Partout au Maroc</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-secondary/5 text-secondary">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Paiement CASH</p>
                  <p className="text-[10px] text-muted-foreground font-medium">À la réception</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
