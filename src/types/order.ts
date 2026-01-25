export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string;
  productId: string;
  productName?: string;
  quantity: number;
  price: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress?: string;
  paymentMethod?: string;
  notes?: string;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress?: string;
  paymentMethod?: string;
  notes?: string;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  paymentMethod?: string;
  notes?: string;
}

export interface OrderResponse {
  success: boolean;
  data?: Order;
  message?: string;
}

export interface OrdersListResponse {
  success: boolean;
  data?: Order[];
  message?: string;
  total?: number;
}

export interface OrderFilters {
  userId?: string;
  status?: OrderStatus;
  fromDate?: Date;
  toDate?: Date;
}
