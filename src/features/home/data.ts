import type { HomeCategory, HomeProduct, HomeStat } from '@/src/features/home/types';

export const HOME_STATS: HomeStat[] = [
  { id: 'orders', label: 'Orders', value: '12', icon: 'cube-outline' },
  { id: 'saved', label: 'Saved', value: '8', icon: 'heart-outline' },
  { id: 'bag', label: 'In cart', value: '3', icon: 'bag-handle-outline' },
];

export const HOME_CATEGORIES: HomeCategory[] = [
  { id: 'apparel', label: 'Apparel', icon: 'shirt-outline' },
  { id: 'watches', label: 'Watches', icon: 'watch-outline' },
  { id: 'audio', label: 'Audio', icon: 'headset-outline' },
  { id: 'home', label: 'Home', icon: 'home-outline' },
];

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    id: 'p1',
    name: 'Aero Knit Sneakers',
    category: 'Footwear',
    price: 128,
    rating: 4.8,
  },
  {
    id: 'p2',
    name: 'Northline Watch',
    category: 'Accessories',
    price: 246,
    rating: 4.6,
  },
  {
    id: 'p3',
    name: 'Studio Headphones',
    category: 'Audio',
    price: 189,
    rating: 4.9,
  },
];
