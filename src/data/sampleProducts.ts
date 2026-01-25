import { CreateProductDto } from '@/types/product';

/**
 * Sample product data for bamboo products shop
 */
export const sampleProducts: CreateProductDto[] = [
  // Bamboo Furniture
  {
    name: 'Bamboo Dining Table',
    description: 'Elegant dining table made from sustainable bamboo. Seats 6 people comfortably.',
    price: 499.99,
    stock: 15,
    category: 'Furniture',
    imageUrl: '/images/products/bamboo-dining-table.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Chair Set (4 pieces)',
    description: 'Set of 4 modern bamboo chairs with ergonomic design.',
    price: 299.99,
    stock: 20,
    category: 'Furniture',
    imageUrl: '/images/products/bamboo-chairs.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Coffee Table',
    description: 'Minimalist coffee table perfect for living rooms.',
    price: 159.99,
    stock: 30,
    category: 'Furniture',
    imageUrl: '/images/products/bamboo-coffee-table.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Bookshelf',
    description: '5-tier bamboo bookshelf with sturdy construction.',
    price: 189.99,
    stock: 12,
    category: 'Furniture',
    imageUrl: '/images/products/bamboo-bookshelf.jpg',
    isActive: true,
  },

  // Kitchen & Dining
  {
    name: 'Bamboo Cutting Board Set',
    description: 'Set of 3 cutting boards in different sizes. Antibacterial and durable.',
    price: 34.99,
    stock: 100,
    category: 'Kitchen',
    imageUrl: '/images/products/bamboo-cutting-board.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Utensil Set',
    description: 'Complete set of bamboo cooking utensils including spoons, spatulas, and more.',
    price: 24.99,
    stock: 75,
    category: 'Kitchen',
    imageUrl: '/images/products/bamboo-utensils.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Bowl Set (6 pieces)',
    description: 'Beautiful handcrafted bamboo bowls, perfect for salads and soups.',
    price: 39.99,
    stock: 50,
    category: 'Kitchen',
    imageUrl: '/images/products/bamboo-bowls.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Plate Set (8 pieces)',
    description: 'Eco-friendly dinner plates made from premium bamboo.',
    price: 49.99,
    stock: 60,
    category: 'Kitchen',
    imageUrl: '/images/products/bamboo-plates.jpg',
    isActive: true,
  },

  // Home Decor
  {
    name: 'Bamboo Plant Pot',
    description: 'Decorative bamboo planter for indoor plants.',
    price: 19.99,
    stock: 80,
    category: 'Decor',
    imageUrl: '/images/products/bamboo-plant-pot.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Wall Art Panel',
    description: 'Handwoven bamboo wall decoration panel.',
    price: 79.99,
    stock: 25,
    category: 'Decor',
    imageUrl: '/images/products/bamboo-wall-art.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Lamp',
    description: 'Modern bamboo table lamp with LED bulb included.',
    price: 59.99,
    stock: 35,
    category: 'Decor',
    imageUrl: '/images/products/bamboo-lamp.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Mirror Frame',
    description: 'Decorative bamboo-framed mirror, 24" x 36".',
    price: 89.99,
    stock: 18,
    category: 'Decor',
    imageUrl: '/images/products/bamboo-mirror.jpg',
    isActive: true,
  },

  // Personal Care
  {
    name: 'Bamboo Toothbrush (Pack of 4)',
    description: 'Eco-friendly bamboo toothbrushes with soft bristles.',
    price: 12.99,
    stock: 200,
    category: 'Personal Care',
    imageUrl: '/images/products/bamboo-toothbrush.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Bath Caddy',
    description: 'Expandable bamboo bath tray with wine holder and book rest.',
    price: 44.99,
    stock: 40,
    category: 'Personal Care',
    imageUrl: '/images/products/bamboo-bath-caddy.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Soap Dish',
    description: 'Natural bamboo soap holder with drainage.',
    price: 8.99,
    stock: 150,
    category: 'Personal Care',
    imageUrl: '/images/products/bamboo-soap-dish.jpg',
    isActive: true,
  },

  // Accessories
  {
    name: 'Bamboo Phone Stand',
    description: 'Adjustable bamboo stand for smartphones and tablets.',
    price: 16.99,
    stock: 90,
    category: 'Accessories',
    imageUrl: '/images/products/bamboo-phone-stand.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Laptop Stand',
    description: 'Ergonomic bamboo laptop stand with ventilation.',
    price: 39.99,
    stock: 45,
    category: 'Accessories',
    imageUrl: '/images/products/bamboo-laptop-stand.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Sunglasses',
    description: 'Stylish polarized sunglasses with bamboo frames.',
    price: 49.99,
    stock: 65,
    category: 'Accessories',
    imageUrl: '/images/products/bamboo-sunglasses.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Watch',
    description: 'Minimalist bamboo watch with Japanese movement.',
    price: 79.99,
    stock: 30,
    category: 'Accessories',
    imageUrl: '/images/products/bamboo-watch.jpg',
    isActive: true,
  },
  {
    name: 'Bamboo Water Bottle',
    description: 'Insulated stainless steel bottle with bamboo exterior.',
    price: 29.99,
    stock: 100,
    category: 'Accessories',
    imageUrl: '/images/products/bamboo-water-bottle.jpg',
    isActive: true,
  },
];

/**
 * Get sample products by category
 */
export function getSampleProductsByCategory(category: string): CreateProductDto[] {
  return sampleProducts.filter(product => product.category === category);
}

/**
 * Get available product categories
 */
export function getProductCategories(): string[] {
  const categories = new Set(sampleProducts.map(p => p.category));
  return Array.from(categories);
}

/**
 * Get products within price range
 */
export function getSampleProductsByPriceRange(minPrice: number, maxPrice: number): CreateProductDto[] {
  return sampleProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
}
