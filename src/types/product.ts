export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface ProductResponse {
  success: boolean;
  data?: Product;
  message?: string;
}

export interface ProductsListResponse {
  success: boolean;
  data?: Product[];
  message?: string;
  total?: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  search?: string;
}
