import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();
  const isSold = product.status === 'sold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative flex flex-col h-full"
    >
      <Link 
        to={`/produit/${product.id}`} 
        className="block relative overflow-hidden rounded-[32px] aspect-[4/5] bg-[#F5F5F5] transition-transform duration-500 hover:-translate-y-1"
      >
        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isSold ? 'opacity-40 grayscale blur-[1px]' : ''}`}
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          {isSold ? (
            <Badge className="bg-black text-white text-[9px] h-6 px-4 uppercase tracking-[0.2em] font-black rounded-lg border-none shadow-lg">
              SOLD OUT
            </Badge>
          ) : (
            <Badge className="bg-secondary text-white text-[9px] h-6 px-4 uppercase tracking-[0.2em] font-black rounded-lg border-none shadow-lg">
              PIÈCE UNIQUE
            </Badge>
          )}
        </div>

        {/* Hover Action Overlay */}
        {!isSold && (
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-full text-black transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
              <ShoppingBag size={24} />
            </div>
          </div>
        )}

        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display italic text-2xl text-black/20 rotate-[-10deg] tracking-widest font-black pointer-events-none uppercase">Archivé</span>
          </div>
        )}
      </Link>

      {/* Info Section */}
      <div className="pt-6 pb-2 px-1 flex flex-col items-center text-center">
        <p className="text-[10px] text-secondary font-black uppercase tracking-[0.3em] mb-2">{product.brand}</p>
        <Link to={`/produit/${product.id}`} className="hover:text-secondary group transition-colors">
          <h3 className="font-display text-xl font-bold leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <p className="text-lg font-black text-foreground">{product.price} DH</p>
          {product.original_price && (
            <p className="text-sm text-muted-foreground/60 line-through font-medium">{product.original_price} DH</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
