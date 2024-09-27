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
  image:string | undefined;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}
