"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import { ProductService } from '@/services/product.service';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product>;
  createProduct: (product: CreateProductDto) => Promise<Product>;
  updateProduct: (id: string, product: UpdateProductDto) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await ProductService.getAllProducts();
      if (!res.success) {
        setError(res.message || 'Lỗi khi tải sản phẩm');
        setProducts([]);
      } else {
        setProducts(res.data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đã xảy ra lỗi';
      setError(errorMessage);
      console.error('Fetch products error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchProductById = async (id: string): Promise<Product> => {
    const res = await ProductService.getProductById(id);
    if (!res.success) throw new Error(res.message || 'Không thể tải sản phẩm');
    return res.data as Product;
  };

  const createProduct = async (product: CreateProductDto): Promise<Product> => {
    const res = await ProductService.createProduct(product);
    if (!res.success) throw new Error(res.message || 'Không thể tạo sản phẩm');
    // Refresh products list
    await fetchProducts();
    return res.data as Product;
  };

  const updateProduct = async (id: string, product: UpdateProductDto): Promise<Product> => {
    const res = await ProductService.updateProduct(id, product);
    if (!res.success) throw new Error(res.message || 'Không thể cập nhật sản phẩm');
    await fetchProducts();
    return res.data as Product;
  };

  const deleteProduct = async (id: string): Promise<void> => {
    const res = await ProductService.deleteProduct(id);
    if (!res.success) throw new Error(res.message || 'Không thể xóa sản phẩm');
    await fetchProducts();
  };

  const value = {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
