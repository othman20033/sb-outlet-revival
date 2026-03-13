import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/common/ProductCard';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Catalogue = () => {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) {
      const cat = categories.find(c => c.slug === activeCategory.toLowerCase());
      if (cat) list = list.filter(p => p.category_id === cat.id);
    }
    
    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      default: list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return list;
  }, [products, activeCategory, sortBy, categories]);

  const activeCategoryName = useMemo(() => {
    if (!activeCategory) return 'Toutes les Pièces';
    return categories.find(c => c.slug === activeCategory.toLowerCase())?.name || 'Catalogue';
  }, [activeCategory, categories]);

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="py-20 border-b border-black/5">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-secondary font-black text-[11px] uppercase tracking-[0.4em] mb-4">Archives Premium</p>
            <h1 className="font-display text-5xl md:text-8xl font-black italic tracking-tighter mb-8 decoration-secondary/10 underline underline-offset-[16px]">
              {activeCategoryName}
            </h1>
          </motion.div>
          
          {/* Main Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
            <Button
              variant={!activeCategory ? 'default' : 'outline'}
              className={`rounded-full px-8 h-10 text-[11px] font-black uppercase tracking-widest transition-all ${!activeCategory ? 'bg-black text-white' : 'border-black/10 hover:bg-black/5'}`}
              onClick={() => setSearchParams({})}
            >
              Tout
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.slug ? 'default' : 'outline'}
                className={`rounded-full px-8 h-10 text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.slug ? 'bg-black text-white' : 'border-black/10 hover:bg-black/5'}`}
                onClick={() => setSearchParams({ category: cat.slug })}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Sub-Filters / Sort */}
          <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground pt-6 border-t border-black/5 max-w-md mx-auto">
            <span className="text-foreground/30">Trier par:</span>
            {[
              { key: 'newest' as const, label: 'Nouveautés' },
              { key: 'price-asc' as const, label: 'Prix Bas' },
              { key: 'price-desc' as const, label: 'Prix Haut' },
            ].map(s => (
              <button
                key={s.key}
                className={`hover:text-secondary transition-colors ${sortBy === s.key ? 'text-secondary underline underline-offset-4 decoration-2' : ''}`}
                onClick={() => setSortBy(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mb-10 flex items-center justify-start">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
              {filtered.length} Résultat{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-40 text-center">
              <p className="text-3xl font-display font-black text-black/10 uppercase tracking-tighter">Bientôt de retour</p>
              <p className="text-muted-foreground mt-4 font-medium italic">Aucun article ne correspond à votre recherche pour le moment.</p>
              <Button className="mt-8 rounded-full h-12 px-8" variant="outline" onClick={() => setSearchParams({})}>
                Voir toute la collection
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Catalogue;
