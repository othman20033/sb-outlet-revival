import ProductCard from '@/components/ProductCard';
import DropCountdown from '@/components/DropCountdown';
import { useProducts } from '@/contexts/ProductContext';
import { mockDrop } from '@/data/mock';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Instagram, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  ShoppingBag, 
  Send, 
  Phone,
  Calendar,
  Rocket,
  CheckCircle2,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const { products, categories } = useProducts();
  const featuredProducts = products.filter(p => p.status === 'available').slice(0, 8);

  return (
    <div className="bg-background min-h-screen font-body">
      {/* Hero Section - Pixel Perfect Match to Screenshot */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&h=1000&fit=crop" 
            alt="SB Outlet Vintage Premium" 
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 mb-10">
              <div className="h-2 w-2 rounded-full bg-[#D76F30]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-black text-white/90">Casablanca, Maroc</span>
            </div>
            
            <h1 className="text-6xl md:text-[140px] font-black mb-8 tracking-tighter leading-[0.85] uppercase">
              Portez une <br />
              <span className="text-secondary">Histoire.</span>
            </h1>
            
            <p className="text-lg md:text-2xl font-bold text-white/90 mb-2 tracking-wide">
              Pièces vintage uniques & marques premium.
            </p>
            <p className="text-lg md:text-2xl font-black text-[#FFD700] mb-12 italic">
              Une fois partie, c'est pour toujours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Button asChild className="h-16 px-12 rounded-full bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-[11px] transition-transform hover:scale-105">
                <Link to="/catalogue">Découvrir nos Collections</Link>
              </Button>
              <Button asChild className="h-16 px-12 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] font-black uppercase tracking-widest text-[11px] transition-transform hover:scale-105 gap-2">
                <a href="https://wa.me/212661163771" target="_blank" rel="noreferrer">
                  <MessageCircle size={18} fill="white" /> Contactez-nous sur WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Feature bar below Hero - Precise Styling */}
        <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-lg py-10 border-t border-white/10 hidden md:block">
          <div className="container flex items-center justify-center text-center">
            <div className="px-12 border-r border-white/20">
              <p className="text-2xl font-black text-white uppercase tracking-tighter">100%</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 bg-clip-text">Pièces Uniques</p>
            </div>
            <div className="px-12 border-r border-white/20">
              <p className="text-2xl font-black text-white uppercase tracking-tighter">PAL</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50">Paiement à la livraison</p>
            </div>
            <div className="px-12">
              <p className="text-2xl font-black text-white uppercase tracking-tighter">24h</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50">Confirmation Rapide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Drops Countdown Section - Center Branded */}
      <section className="py-24 bg-background">
        <div className="container px-4 flex justify-center">
          <DropCountdown drop={mockDrop} />
        </div>
      </section>

      {/* About Section - Matching the Box Layout on the Right */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-foreground leading-[0.9] mb-10 uppercase tracking-tighter">
                Le Vintage, <br />
                <span className="text-secondary italic">Réinventé.</span>
              </h2>
              <div className="space-y-8 text-xl text-foreground font-medium leading-relaxed">
                <p>
                  Chez <strong className="font-black uppercase tracking-tighter">SB Outlet</strong>, on ne vend pas des vêtements. On offre des <span className="text-secondary font-black">pièces d'histoire</span> — des articles uniques, de grandes marques, dans un état impeccable.
                </p>
                <p>
                  Chaque pièce que vous voyez ici est <strong className="font-black underline decoration-secondary decoration-4 underline-offset-4">unique</strong>. Pas de stock caché, pas de restock possible. Quand c'est parti, c'est parti pour toujours. C'est ça, l'essence du vintage.
                </p>
                <p className="text-muted-foreground">
                  Notre concept est simple : nous sélectionnons avec soin des vêtements et accessoires de marques reconnues — Carhartt, Ralph Lauren, Nike, et bien d'autres — pour vous proposer le meilleur du dépôt-vente premium.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-16 rounded-[48px] bg-white shadow-[0_10px_80px_-15px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col items-start gap-8"
            >
              <div className="text-5xl">🔥</div>
              <div>
                <h3 className="text-3xl font-black mb-6 tracking-tighter">
                  Le Système des Drops
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Comme pour les sneakers, nos collections arrivent par <strong className="text-foreground">drops</strong>. Une date, une sélection limitée, des pièces uniques. Suivez-nous sur Instagram pour ne rien manquer.
                </p>
                <a href="https://instagram.com/sb_outlet_dv" target="_blank" rel="noreferrer" className="text-secondary font-black text-lg flex items-center gap-2 hover:underline underline-offset-8">
                  @sb_outlet_dv <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works - Matching the Vertical Iconic Path */}
      <section className="py-32 bg-[#F8F6F0]/30 border-y border-black/5">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">Comment ça marche ?</h2>
            <p className="text-muted-foreground font-bold uppercase tracking-[0.3em] text-xs">De la découverte à la livraison, voici votre parcours avec SB Outlet.</p>
          </div>

          <div className="relative space-y-24">
            {/* Background Line */}
            <div className="absolute left-[39px] top-10 bottom-10 w-1 bg-secondary/10 hidden md:block md:left-1/2 md:-ml-[2px]" />

            {[
              { num: '01', title: 'Restez Prêts', desc: 'Suivez-nous sur Instagram et consultez le site. On annonce la date du prochain drop.', icon: Calendar },
              { num: '02', title: 'Lancement du Drop', desc: 'Le jour J, toutes les pièces sont mises en ligne simultanément. Premier arrivé, premier servi.', icon: Rocket },
              { num: '03', title: 'Explorez & Choisissez', desc: 'Parcourez les collections Homme, Femme, Enfant et Accessoires. Chaque pièce est unique.', icon: ShoppingBag },
              { num: '04', title: 'Commandez', desc: 'Ajoutez au panier, remplissez vos informations. Pas de paiement en ligne — vous payez à la livraison.', icon: CheckCircle2 },
              { num: '05', title: 'Livraison', desc: 'On vous appelle pour confirmer, puis on livre partout au Maroc. Payez à la réception.', icon: Truck },
            ].map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Icon Box */}
                <div className="relative z-10 w-20 h-20 rounded-[28px] bg-white border-2 border-secondary/10 shadow-xl flex items-center justify-center group hover:border-secondary transition-colors duration-500">
                  <step.icon size={32} className="text-secondary group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary text-white text-[10px] font-black flex items-center justify-center shadow-lg border-2 border-white">
                    {step.num}
                  </div>
                </div>
                
                <div className={`flex-1 flex flex-col ${i % 2 !== 0 ? 'md:items-start text-left' : 'md:items-end md:text-right'}`}>
                  <p className="text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-2">{step.num}</p>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed md:max-w-xs">{step.desc}</p>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 px-4 gap-8">
            <div className="max-w-2xl">
              <p className="text-secondary font-black text-[11px] uppercase tracking-[0.5em] mb-4">La Sélection du Moment</p>
              <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-6 uppercase">Pièces à Saisir.</h2>
              <div className="h-2 w-32 bg-secondary rounded-full" />
            </div>
            <Button asChild variant="ghost" className="group text-secondary hover:text-secondary h-auto p-0 font-black tracking-widest text-[11px] uppercase border-b-2 border-secondary/20 hover:border-secondary transition-all">
              <Link to="/catalogue" className="flex items-center">Explorer le shop complet <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-3" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 px-4">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Matching the Big Bottom Pitch */}
      <section className="py-40 bg-[#12241F] text-white text-center relative overflow-hidden">
        {/* Background decorative elements matching the dark footer style */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 blur-[150px] rounded-full" />
        
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] italic tracking-tighter uppercase">Prêt à trouver votre pièce unique ?</h2>
            <p className="text-white/60 text-xl md:text-2xl mb-16 font-medium max-w-2xl">Les meilleures pièces partent en quelques minutes. Ne laissez pas passer votre chance.</p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Button asChild className="h-20 px-16 rounded-full bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest text-xs transition-transform hover:scale-105 shadow-2xl">
                <Link to="/catalogue">Découvrir nos Collections</Link>
              </Button>
              <Button asChild className="h-20 px-16 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] font-black uppercase tracking-widest text-xs transition-transform hover:scale-105 gap-3 shadow-2xl">
                <a href="https://wa.me/212661163771" target="_blank" rel="noreferrer">
                  <Phone size={24} fill="white" /> WhatsApp Direct
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern High-End Footer */}
      <footer className="py-24 bg-[#FFFDF7]">
        <div className="container px-4">
          <div className="flex flex-col items-center text-center">
            <Link to="/" className="text-5xl font-black mb-10 tracking-tighter uppercase flex flex-col items-center">
              SB <span className="text-secondary italic text-lg tracking-[0.5em] -mt-2">OUTLET</span>
            </Link>
            <p className="text-muted-foreground text-lg max-w-xl mb-16 leading-relaxed font-medium capitalize">
              Vêtements vintage triés sur le volet et accessoires de créateurs. Une seconde vie pour du premium intemporel à Casablanca.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl pt-16 border-t border-black/5">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                  <Phone size={24} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em]">+212 661-163771</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                  <Instagram size={24} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em]">@sb_outlet_dv</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                  <ShieldCheck size={24} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em]">Casablanca, Maroc</p>
              </div>
            </div>
            
            <div className="mt-24 pt-10 border-t border-black/5 w-full flex flex-col md:flex-row items-center justify-between text-[11px] text-muted-foreground font-bold uppercase tracking-[0.3em] gap-6">
              <p>© 2026 SB Outlet Luxury. Fait avec passion.</p>
              <div className="flex items-center gap-10">
                <Link to="/" className="hover:text-secondary transition-colors">Politique de retour</Link>
                <Link to="/" className="hover:text-secondary transition-colors">Livraison MA</Link>
                <Link to="/login" className="hover:text-secondary transition-colors ml-4 text-black/20 hover:text-secondary">Admin</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
