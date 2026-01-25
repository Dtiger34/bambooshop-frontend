/**
 * Mapper functions to convert between MongoDB models and frontend types
 */

import { IUser } from '@/models/User';
import { IProduct } from '@/models/Product';
import { IOrder } from '@/models/Order';
import { User, UserRole } from '@/types/user';
import { Product } from '@/types/product';
import { Order, OrderStatus } from '@/types/order';

/**
 * Convert MongoDB User document to frontend User type
 * Removes password and converts _id to id
 */
export function mapUserToFrontend(user: IUser): User {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role === 'ADMIN' ? UserRole.ADMIN : UserRole.USER,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/**
 * Convert MongoDB User document to frontend User type (without password)
 * Useful when you have a Mongoose document object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapUserDocumentToFrontend(userDoc: any): User {
  const userObj = userDoc.toObject ? userDoc.toObject() : userDoc;
  return mapUserToFrontend(userObj);
}

/**
 * Convert MongoDB Product document to frontend Product type
 */
export function mapProductToFrontend(product: IProduct): Product {
  return {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    imageUrl: product.imageUrl,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

/**
 * Convert MongoDB Product document to frontend Product type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProductDocumentToFrontend(productDoc: any): Product {
  const productObj = productDoc.toObject ? productDoc.toObject() : productDoc;
  return mapProductToFrontend(productObj);
}

/**
 * Convert MongoDB Order document to frontend Order type
 */
export function mapOrderToFrontend(order: IOrder): Order {
  return {
    id: order._id.toString(),
    userId: order.userId,
    orderItems: order.orderItems.map(item => ({
      id: `${order._id}-${item.productId}`,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      createdAt: order.createdAt,
    })),
    status: order.status === 'PENDING' ? OrderStatus.PENDING :
            order.status === 'PROCESSING' ? OrderStatus.PROCESSING :
            order.status === 'SHIPPED' ? OrderStatus.SHIPPED :
            order.status === 'DELIVERED' ? OrderStatus.DELIVERED :
            OrderStatus.CANCELLED,
    totalAmount: order.totalAmount,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    notes: order.notes,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

/**
 * Convert MongoDB Order document to frontend Order type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapOrderDocumentToFrontend(orderDoc: any
export function mapOrderDocumentToFrontend(orderDoc: Document & IOrder): Order {
  const orderObj = orderDoc.toObject ? orderDoc.toObject() : orderDoc;
  return mapOrderToFrontend(orderObj);
}

/**
 * Convert array of MongoDB documents to frontend types
 */
export function mapUsersToFrontend(users: IUser[]): User[] {
  return users.map(mapUserToFrontend);
}

export function mapProductsToFrontend(products: IProduct[]): Product[] {
  return products.map(mapProductToFrontend);
}

export function mapOrdersToFrontend(orders: IOrder[]): Order[] {
  return orders.map(mapOrderToFrontend);
}
