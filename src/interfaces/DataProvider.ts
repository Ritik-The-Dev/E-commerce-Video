export interface Product {
  id: number;
  title: string;
  images?: string[];
  price: number;
  rating: number;
  thumbnail?: string;
  description?: string;
  category: string;
  brand?: string;
  stock?: number;
  discountPercentage?: number;
  image: string | undefined;
}

export interface CartItem extends Product {
  quantity?: number;
}

export interface Category {
  name: string;
  slug: string;
  url: string;
}
