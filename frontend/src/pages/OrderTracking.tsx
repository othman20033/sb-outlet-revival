import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrders } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Clock, CheckCircle, Truck, PackageCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Order, OrderStatus } from '@/types';

const OrderTracking = () => {
  const { fetchOrdersByPhone } = useOrders();
  const [searchParams] = useSearchParams();
  const [phone, setPhone] = useState(searchParams.get('phone') || '');
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    if (phoneParam) {
      const triggerSearch = async () => {
        setIsLoading(true);
        const found = await fetchOrdersByPhone(phoneParam);
        setUserOrders(Array.isArray(found) ? found : []);
        setSearched(true);
        setIsLoading(false);
      };
      triggerSearch();
    }
  }, [searchParams, fetchOrdersByPhone]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setIsLoading(true);
      const found = await fetchOrdersByPhone(phone.trim());
      setUserOrders(Array.isArray(found) ? found : []);
      setSearched(true);
      setIsLoading(false);
    }
  };

  const getStatusDisplay = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'En attente de validation',
          color: 'text-amber-500',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          icon: Clock,
          progress: 25
        };
      case 'confirmed':
        return {
          label: 'Commande Confirmée',
          color: 'text-blue-500',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
          icon: CheckCircle,
          progress: 50
        };
      case 'shipped':
        return {
          label: 'En cours de livraison',
          color: 'text-purple-500',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20',
          icon: Truck,
          progress: 75
        };
      case 'delivered':
        return {
          label: 'Commande Livrée',
          color: 'text-emerald-500',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          icon: PackageCheck,
          progress: 100
        };
      default:
        return {
          label: 'Inconnu',
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          icon: Package,
          progress: 0
        };
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <section className="py-20 border-b border-black/5">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-secondary font-black text-[11px] uppercase tracking-[0.4em] mb-4">Suivi Premium</p>
            <h1 className="font-display text-5xl md:text-7xl font-black italic tracking-tighter mb-8 leading-[0.9]">
              Mes <br />Commandes.
            </h1>
            <p className="font-medium text-muted-foreground max-w-lg mx-auto mb-10 text-lg">
              Entrez le numéro de téléphone utilisé lors de votre commande pour suivre l'état de la livraison en temps réel.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch} 
            className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mx-auto"
          >
            <Input
              placeholder="Ex: 0612345678"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="flex-1 h-16 rounded-full px-8 text-lg text-center sm:text-left border-black/10 focus-visible:ring-secondary focus-visible:ring-offset-0 placeholder:uppercase placeholder:text-xs placeholder:tracking-[0.2em] font-medium shadow-sm"
              autoFocus
            />
            <Button 
              type="submit" 
              className="w-full sm:w-auto h-16 rounded-full px-10 bg-black text-white hover:bg-black/90 uppercase font-black tracking-widest text-[11px] transition-transform hover:scale-105"
            >
              Suivre <Search className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin mb-4" />
                <p className="font-bold uppercase tracking-widest text-[10px]">Recherche de vos pépites...</p>
              </motion.div>
            ) : !searched ? null : userOrders.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20 bg-card/30 backdrop-blur rounded-[40px] border border-black/5"
              >
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h3 className="font-display text-3xl font-black mb-4 tracking-tighter uppercase">Commande introuvable</h3>
                <p className="font-medium text-muted-foreground max-w-sm mx-auto mb-8">
                  Nous n'avons trouvé aucune commande correspondant à ce numéro. Vérifiez votre numéro ou contactez-nous.
                </p>
                <Button asChild variant="outline" className="h-12 px-8 rounded-full border-black/10 hover:bg-black/5 font-black uppercase tracking-widest text-[10px]">
                  <Link to="/catalogue">Continuer le shopping</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-3xl font-black uppercase tracking-tighter">Votre Historique</h2>
                  <span className="text-secondary font-black text-[11px] uppercase tracking-[0.2em] px-4 py-2 bg-secondary/10 rounded-full">
                    {userOrders.length} commande{userOrders.length > 1 ? 's' : ''}
                  </span>
                </div>

                {userOrders.map((order, i) => {
                  const display = getStatusDisplay(order.status);
                  const Icon = display.icon;
                  
                  return (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-card rounded-[32px] border border-black/5 shadow-sm overflow-hidden flex flex-col"
                    >
                      {/* Order Header / Status */}
                      <div className={`p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${display.bg} border-b ${display.border}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm ${display.color}`}>
                            <Icon size={24} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-foreground/50 mb-1">Statut Actuel</p>
                            <h3 className={`font-display text-2xl font-black tracking-tighter ${display.color}`}>
                              {display.label}
                            </h3>
                          </div>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto">
                          <p className="text-[10px] uppercase font-black tracking-widest text-foreground/50 mb-1">Date</p>
                          <p className="font-bold text-foreground">
                            {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Progress Stepper */}
                      <div className="px-6 sm:px-8 py-8 border-b border-black/5 bg-white/50">
                        <div className="relative flex justify-between max-w-2xl mx-auto">
                          {/* Background Line */}
                          <div className="absolute top-5 left-0 w-full h-0.5 bg-muted" />
                          {/* Path Line */}
                          <motion.div 
                            className="absolute top-5 left-0 h-0.5 bg-black"
                            initial={{ width: 0 }}
                            animate={{ width: `${(display.progress - 25) / 75 * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                          
                          {[
                            { id: 'pending', label: 'Attente', icon: Clock },
                            { id: 'confirmed', label: 'Confirmée', icon: CheckCircle },
                            { id: 'shipped', label: 'En cours', icon: Truck },
                            { id: 'delivered', label: 'Livrée', icon: PackageCheck },
                          ].map((step, idx) => {
                            const stepProgress = (idx + 1) * 25;
                            const isCompleted = display.progress >= stepProgress;
                            const isCurrent = display.progress === stepProgress;
                            const SvgIcon = step.icon;

                            return (
                              <div key={step.id} className="relative flex flex-col items-center gap-2 z-10 w-1/4">
                                <motion.div 
                                  initial={false}
                                  animate={{ 
                                    scale: isCurrent ? 1.2 : 1,
                                    backgroundColor: isCompleted ? '#000000' : '#ffffff',
                                    color: isCompleted ? '#ffffff' : '#94a3b8',
                                    borderColor: isCompleted ? '#000000' : '#e2e8f0'
                                  }}
                                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-sm"
                                >
                                  <SvgIcon size={18} />
                                </motion.div>
                                <span className={`text-[10px] font-black uppercase tracking-tighter text-center ${isCompleted ? 'text-black' : 'text-muted-foreground'}`}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-8 md:gap-12">
                        {/* Items */}
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-4">Articles</p>
                          <div className="space-y-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                {item.product && (
                                  <img 
                                    src={item.product.images[0]} 
                                    alt={item.product.name} 
                                    className="w-16 h-20 object-cover rounded-xl"
                                  />
                                )}
                                <div>
                                  <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{item.product?.brand || 'Marque'}</p>
                                  <p className="font-bold text-sm leading-tight mb-1">{item.product?.name || 'Article introuvable'}</p>
                                  <p className="font-display font-black text-foreground">{item.price} DH</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Summary & Shipping */}
                        <div className="flex flex-col justify-between">
                          <div className="mb-6">
                            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-4">Adresse de livraison</p>
                            <div className="bg-muted/50 p-4 rounded-2xl">
                              <p className="font-bold mb-1">{order.customer_name}</p>
                              <p className="text-sm text-foreground/80 mb-1">{order.customer_phone}</p>
                              <p className="text-sm text-foreground/80">{order.customer_address}</p>
                              <p className="text-sm font-bold uppercase tracking-widest mt-2">{order.customer_city}</p>
                            </div>
                          </div>
                          
                          <div className="border-t border-black/5 pt-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Livraison</span>
                              <span className="font-bold">{order.delivery_fee} DH</span>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                              <span className="text-xs uppercase font-black tracking-widest">Total</span>
                              <span className="font-display text-4xl font-black">{order.total_amount} DH</span>
                            </div>
                            <p className="text-[10px] text-right font-bold text-secondary uppercase tracking-[0.2em] mt-2">Paiement à la réception</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default OrderTracking;
