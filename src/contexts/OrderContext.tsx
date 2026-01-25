'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '@/types/order';

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order>;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<Order>;
  deleteOrder: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      setOrders(data.orders || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Fetch orders error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderById = async (id: string): Promise<Order> => {
    try {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch order');
      }

      return data.order;
    } catch (err) {
      console.error('Fetch order error:', err);
      throw err;
    }
  };

  const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Refresh orders list
      await fetchOrders();

      return data.order;
    } catch (err) {
      console.error('Create order error:', err);
      throw err;
    }
  };

  const updateOrder = async (id: string, order: Partial<Order>): Promise<Order> => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update order');
      }

      // Refresh orders list
      await fetchOrders();

      return data.order;
    } catch (err) {
      console.error('Update order error:', err);
      throw err;
    }
  };

  const deleteOrder = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete order');
      }

      // Refresh orders list
      await fetchOrders();
    } catch (err) {
      console.error('Delete order error:', err);
      throw err;
    }
  };

  const value = {
    orders,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
