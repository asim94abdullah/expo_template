import type { CartItem } from '@/src/features/cart/types';

export const CART_ITEMS: CartItem[] = [
  {
    id: 'c1',
    name: 'Aero Knit Sneakers',
    variant: 'White / 42',
    price: 128,
    quantity: 1,
  },
  {
    id: 'c2',
    name: 'Studio Headphones',
    variant: 'Graphite',
    price: 189,
    quantity: 1,
  },
  {
    id: 'c3',
    name: 'Everyday Tee',
    variant: 'Navy / M',
    price: 36,
    quantity: 2,
  },
];

export const CART_SHIPPING = 8;
