import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: any) => Promise<Order | null>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchOrdersByPhone: (phone: string) => Promise<Order[]>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token, isAuthenticated } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  const addOrder = async (orderData: any) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const newOrder = await response.json();
        // Optimistically update if admin is logged in, or just return
        if (isAuthenticated) {
          setOrders(prev => [newOrder, ...prev]);
        }
        return newOrder;
      } else {
        const errorData = await response.json();
        console.error('Order creation failed:', errorData);
        return null;
      }
    } catch (error) {
      console.error('Error adding order:', error);
      return null;
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(prev => prev.map(o => (o.id === id ? updatedOrder : o)));
        toast.success('Statut mis à jour');
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Erreur réseau');
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        setOrders(prev => prev.filter(o => o.id !== id));
        toast.success('Commande supprimée');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Erreur réseau');
    }
  };

  const fetchOrdersByPhone = useCallback(async (phone: string) => {
    try {
      const response = await fetch(`${API_URL}/orders/track?phone=${encodeURIComponent(phone)}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching orders by phone:', error);
      return [];
    }
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, deleteOrder, fetchOrders, fetchOrdersByPhone }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
