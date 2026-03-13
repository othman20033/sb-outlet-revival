import { useState } from 'react';
import { useProducts } from '@/contexts/ProductContext';
import { useOrders } from '@/contexts/OrderContext';
import { Product, ProductStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Package, Eye, ShieldCheck, ListOrdered } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProductForm {
  name: string;
  brand: string;
  price: string;
  original_price: string;
  size: string;
  category_id: string;
  description: string;
  images: string;
  status: ProductStatus;
}

const emptyForm: ProductForm = {
  name: '',
  brand: '',
  price: '',
  original_price: '',
  size: '',
  category_id: '1',
  description: '',
  images: '',
  status: 'available',
};

const Admin = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsOpen(true);
  };

  const openEdit = (product: Product) => {
    setForm({
      name: product.name,
      brand: product.brand,
      price: String(product.price),
      original_price: product.original_price ? String(product.original_price) : '',
      size: product.size,
      category_id: product.category_id,
      description: product.description,
      images: product.images.join(', '),
      status: product.status,
    });
    setEditingId(product.id);
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.brand || !form.price || !form.size) return;

    const images = form.images
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const productData = {
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : undefined,
      size: form.size,
      category_id: form.category_id,
      description: form.description,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop'],
      status: form.status,
    };

    if (editingId) {
      await updateProduct(editingId, productData);
    } else {
      await addProduct(productData);
    }

    setIsOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  const toggleStatus = async (product: Product) => {
    const newStatus: ProductStatus = product.status === 'available' ? 'sold' : 'available';
    await updateProduct(product.id, { status: newStatus });
  };

  const statusBadge = (status: ProductStatus) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">Disponible</Badge>;
      case 'sold':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30">Vendu</Badge>;
      case 'reserved':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30">Réservé</Badge>;
    }
  };

  const orderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30">En attente</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30">Confirmée</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30">Expédiée</Badge>;
      case 'delivered':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">Livrée</Badge>;
      default:
        return <Badge className="bg-muted text-muted-foreground">{status}</Badge>;
    }
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || '—';

  return (
    <div className="container py-8 md:py-12 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Administration
            </p>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Tableau de bord</h1>
        </div>
      </div>

      <div className="flex gap-6 border-b border-border/50 mb-8 pb-2">
        <button 
          onClick={() => setActiveTab('products')} 
          className={`pb-2 font-display text-lg transition-colors ${activeTab === 'products' ? 'border-b-2 border-foreground font-bold text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Articles
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`pb-2 font-display text-lg transition-colors ${activeTab === 'orders' ? 'border-b-2 border-foreground font-bold text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Commandes
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <p className="font-body text-sm text-muted-foreground mt-1">
              {products.length} article{products.length !== 1 ? 's' : ''} au total
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetProducts} className="rounded-full px-6">
                Réinitialiser les articles
              </Button>
              <Button onClick={openCreate} className="gap-2 rounded-full px-6">
                <Plus className="h-4 w-4" />
                Ajouter un article
              </Button>
            </div>
          </div>

          {/* Filters bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              placeholder="Rechercher par nom ou marque..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs bg-card border-border/50"
            />
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Tous' },
                { key: 'available', label: 'Disponible' },
                { key: 'sold', label: 'Vendu' },
              ].map(f => (
                <Button
                  key={f.key}
                  variant={filterStatus === f.key ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => setFilterStatus(f.key)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Products table / cards */}
          <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
            {/* Desktop table header */}
            <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-muted/30 text-xs font-body uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <span>Image</span>
              <span>Article</span>
              <span>Catégorie</span>
              <span>Taille</span>
              <span>Prix</span>
              <span>Statut</span>
              <span>Actions</span>
            </div>

            <AnimatePresence>
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Package className="h-12 w-12 mb-3 opacity-40" />
                  <p className="font-body">Aucun article trouvé</p>
                </div>
              ) : (
                filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-1 md:grid-cols-[80px_2fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 border-b border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    {/* Image */}
                    <div className="hidden md:block">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>

                    {/* Name + Brand (mobile: full card) */}
                    <div className="flex items-center gap-4 md:block">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded-lg md:hidden flex-shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-body text-[11px] text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                        <p className="font-body text-sm font-medium leading-tight">{product.name}</p>
                        {/* Mobile-only extra info */}
                        <div className="flex items-center gap-2 mt-1 md:hidden">
                          <span className="font-display text-base font-bold">{product.price} DH</span>
                          {product.original_price && (
                            <span className="text-xs text-muted-foreground line-through">{product.original_price} DH</span>
                          )}
                          <span className="ml-1">{statusBadge(product.status)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <p className="hidden md:block font-body text-sm text-muted-foreground">{getCategoryName(product.category_id)}</p>

                    {/* Size */}
                    <p className="hidden md:block font-body text-sm">{product.size}</p>

                    {/* Price */}
                    <div className="hidden md:block">
                      <p className="font-display text-base font-bold">{product.price} DH</p>
                      {product.original_price && (
                        <p className="font-body text-xs text-muted-foreground line-through">{product.original_price} DH</p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="hidden md:block">
                      <button onClick={() => toggleStatus(product)} className="cursor-pointer">
                        {statusBadge(product.status)}
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 justify-end md:justify-start">
                      <Link to={`/produit/${product.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => openEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-red-400"
                        onClick={() => setDeleteId(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {/* Mobile toggle status */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="md:hidden text-xs rounded-full ml-2"
                        onClick={() => toggleStatus(product)}
                      >
                        {product.status === 'available' ? 'Marquer vendu' : 'Remettre dispo'}
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
            {/* Desktop table header */}
            <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-muted/30 text-xs font-body uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <span>Date</span>
              <span>Client</span>
              <span>Montant</span>
              <span>Livraison</span>
              <span>Statut</span>
              <span>Action</span>
            </div>

             <AnimatePresence>
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <ListOrdered className="h-12 w-12 mb-3 opacity-40" />
                  <p className="font-body">Aucune commande reçue</p>
                </div>
              ) : (
                orders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 border-b border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <div>
                      <p className="font-body text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                      <p className="font-body text-[10px] text-muted-foreground">{new Date(order.created_at).toLocaleTimeString()}</p>
                    </div>

                    <div>
                      <p className="font-display font-bold text-base">{order.customer_name}</p>
                      <p className="font-body text-xs text-muted-foreground">{order.customer_city}</p>
                      <p className="font-body text-xs text-secondary mt-1 tracking-wider">{order.customer_phone}</p>
                    </div>

                    <div>
                      <p className="font-display font-black text-lg">{order.total_amount} DH</p>
                      <p className="font-body text-[10px] text-muted-foreground uppercase">{order.items.length} article(s)</p>
                    </div>

                    <div>
                      <p className="font-body text-sm max-w-[150px] truncate" title={order.customer_address}>{order.customer_address}</p>
                    </div>

                    <div>
                      <Select value={order.status} onValueChange={(v: any) => updateOrderStatus(order.id, v)}>
                        <SelectTrigger className="h-8 max-w-[130px] border-none bg-transparent p-0 focus:ring-0">
                          {orderStatusBadge(order.status)}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="confirmed">Confirmée</SelectItem>
                          <SelectItem value="shipped">Expédiée</SelectItem>
                          <SelectItem value="delivered">Livrée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-red-400"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingId ? 'Modifier l\'article' : 'Nouvel article'}
            </DialogTitle>
            <DialogDescription>
              {editingId ? 'Modifiez les informations de cet article.' : 'Remplissez les informations pour ajouter un nouvel article.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
             <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Nom *</label>
                <Input
                  placeholder="ex: Veste en cuir vintage"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Marque *</label>
                <Input
                  placeholder="ex: Schott"
                  value={form.brand}
                  onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Prix (DH) *</label>
                <Input
                  type="number"
                  placeholder="450"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Ancien prix</label>
                 <Input
                  type="number"
                  placeholder="850"
                  value={form.original_price}
                  onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Taille *</label>
                 <Input
                  placeholder="M, L, 42..."
                  value={form.size}
                  onChange={e => setForm(f => ({ ...f, size: e.target.value }))}
                />
              </div>
            </div>

             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                 <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Catégorie</label>
                 <Select value={form.category_id} onValueChange={v => setForm(f => ({ ...f, category_id: v }))}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     {categories.map(cat => (
                       <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div className="space-y-1.5">
                 <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Statut</label>
                 <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as ProductStatus }))}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="available">Disponible</SelectItem>
                     <SelectItem value="sold">Vendu</SelectItem>
                     <SelectItem value="reserved">Réservé</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>

             <div className="space-y-1.5">
               <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">Description</label>
               <textarea
                 className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                 placeholder="Description détaillée de l'article..."
                 value={form.description}
                 onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
               />
             </div>

             <div className="space-y-1.5">
               <label className="font-body text-xs text-muted-foreground uppercase tracking-wider">URLs images (séparées par des virgules)</label>
               <Input
                 placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                 value={form.images}
                 onChange={e => setForm(f => ({ ...f, images: e.target.value }))}
               />
               <p className="text-[11px] text-muted-foreground">Laissez vide pour utiliser une image par défaut</p>
             </div>
          </div>

          <DialogFooter>
             <Button variant="outline" onClick={() => setIsOpen(false)}>Annuler</Button>
             <Button
               onClick={handleSubmit}
               disabled={!form.name || !form.brand || !form.price || !form.size}
               className="gap-2"
             >
               {editingId ? 'Enregistrer' : 'Ajouter'}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'article sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
