import { CreateOrderDto, OrderStatus } from '@/types/order';

/**
 * Sample order data for testing
 * Note: These use placeholder IDs. In real usage, replace with actual user and product IDs from database
 */

/**
 * Helper function to create sample orders with actual user and product IDs
 * @param userIds - Array of user IDs from database
 * @param productIds - Array of product IDs from database
 */
export function generateSampleOrders(userIds: string[], productIds: string[]): CreateOrderDto[] {
  if (userIds.length === 0 || productIds.length === 0) {
    console.warn('Cannot generate sample orders: missing user or product IDs');
    return [];
  }

  return [
    // Order 1: Small order
    {
      userId: userIds[0] || 'user-id-1',
      items: [
        {
          productId: productIds[0] || 'product-id-1',
          quantity: 2,
          price: 34.99,
        },
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card',
      notes: 'Please deliver in the morning',
    },

    // Order 2: Medium order
    {
      userId: userIds[1] || 'user-id-2',
      items: [
        {
          productId: productIds[1] || 'product-id-2',
          quantity: 1,
          price: 499.99,
        },
        {
          productId: productIds[2] || 'product-id-3',
          quantity: 4,
          price: 24.99,
        },
      ],
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      paymentMethod: 'PayPal',
      notes: 'Gift wrap requested',
    },

    // Order 3: Large order
    {
      userId: userIds[2] || 'user-id-3',
      items: [
        {
          productId: productIds[3] || 'product-id-4',
          quantity: 1,
          price: 299.99,
        },
        {
          productId: productIds[4] || 'product-id-5',
          quantity: 3,
          price: 39.99,
        },
        {
          productId: productIds[5] || 'product-id-6',
          quantity: 2,
          price: 59.99,
        },
      ],
      shippingAddress: '789 Elm St, Chicago, IL 60601',
      paymentMethod: 'Credit Card',
      notes: 'Leave at front door if not home',
    },

    // Order 4: Accessories order
    {
      userId: userIds[0] || 'user-id-1',
      items: [
        {
          productId: productIds[6] || 'product-id-7',
          quantity: 2,
          price: 16.99,
        },
        {
          productId: productIds[7] || 'product-id-8',
          quantity: 1,
          price: 49.99,
        },
        {
          productId: productIds[8] || 'product-id-9',
          quantity: 3,
          price: 29.99,
        },
      ],
      shippingAddress: '321 Pine St, Seattle, WA 98101',
      paymentMethod: 'Debit Card',
    },

    // Order 5: Kitchen items
    {
      userId: userIds[3] || 'user-id-4',
      items: [
        {
          productId: productIds[9] || 'product-id-10',
          quantity: 2,
          price: 39.99,
        },
        {
          productId: productIds[10] || 'product-id-11',
          quantity: 1,
          price: 49.99,
        },
      ],
      shippingAddress: '555 Maple Dr, Austin, TX 78701',
      paymentMethod: 'Credit Card',
      notes: 'Urgent delivery needed',
    },
  ];
}

/**
 * Sample order statuses for updating orders
 */
export const sampleOrderStatuses: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

/**
 * Get random order status
 */
export function getRandomOrderStatus(): OrderStatus {
  return sampleOrderStatuses[Math.floor(Math.random() * sampleOrderStatuses.length)];
}

/**
 * Calculate total amount for an order
 */
export function calculateOrderTotal(items: { quantity: number; price: number }[]): number {
  return items.reduce((total, item) => total + (item.quantity * item.price), 0);
}
