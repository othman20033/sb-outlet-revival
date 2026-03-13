import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product, Category } from '@/types';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAuth();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const addProduct = useCallback(async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts(prev => [newProduct, ...prev]);
        toast.success('Article ajouté avec succès');
      } else {
        toast.error('Erreur lors de l\'ajout de l\'article');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Erreur réseau');
    }
  }, [token]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(prev =>
          prev.map(p => (p.id === id ? updatedProduct : p))
        );
        toast.success('Article mis à jour');
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Erreur réseau');
    }
  }, [token]);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Article supprimé');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Erreur réseau');
    }
  }, [token]);

  const getProduct = useCallback(
    (id: string) => products.find(p => p.id === id),
    [products]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};
