export interface Product {
  _id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage:number;
  price: number;
  stock: number;
  rating: number;
  thumbnail: string;
  images: [string];
}
