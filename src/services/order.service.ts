import { API_ENDPOINTS } from '@/lib/constants';
import { CreateOrderDto, UpdateOrderDto, Order, OrderResponse, OrdersListResponse, OrderFilters } from '@/types/order';

export class OrderService {
  /**
   * Create a new order
   */
  static async createOrder(orderData: CreateOrderDto): Promise<OrderResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to create order',
        };
      }

      return {
        success: true,
        data: data.data,
        message: 'Order created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Get all orders with optional filters
   */
  static async getAllOrders(filters?: OrderFilters): Promise<OrdersListResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.status) params.append('status', filters.status);

      const url = `${API_ENDPOINTS.ORDERS.GET_ALL}${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch orders',
        };
      }

      return {
        success: true,
        data: data.data,
        total: data.total,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Get order by ID
   */
  static async getOrderById(id: string): Promise<OrderResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS.GET_BY_ID(id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch order',
        };
      }

      return {
        success: true,
        data: data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Update order
   */
  static async updateOrder(id: string, orderData: UpdateOrderDto): Promise<OrderResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS.UPDATE(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to update order',
        };
      }

      return {
        success: true,
        data: data.data,
        message: 'Order updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Delete order
   */
  static async deleteOrder(id: string): Promise<OrderResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.ORDERS.DELETE(id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to delete order',
        };
      }

      return {
        success: true,
        message: 'Order deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}
