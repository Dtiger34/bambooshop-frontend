'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { ProductProvider } from './ProductContext';
import { OrderProvider } from './OrderContext';

export { useAuth } from './AuthContext';
export { useProducts } from './ProductContext';
export { useOrders } from './OrderContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          {children}
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
