export type HomeStat = {
  id: string;
  label: string;
  value: string;
  icon: 'bag-handle-outline' | 'heart-outline' | 'cube-outline';
};

export type HomeCategory = {
  id: string;
  label: string;
  icon: 'shirt-outline' | 'watch-outline' | 'headset-outline' | 'home-outline';
};

export type HomeProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
};
