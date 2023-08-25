import { Product } from 'src/app/models/product.model';

export interface Order {
    _id:string;
  userId: string;
  name: string;
  email: string;
  orderDetails: {
    products: [
      {
        productId: Product;
        quantity: number;
        canceled: boolean;
      }
    ];
    totalItems: number;
    totalPrice: number;
  };
  shippingDetails: {
    name: string;
    phone: number;
    address: {
      house: string;
      street: string;
      city: string;
      state: string;
      pincode: number;
    };
  };
  status: string;
  paymentStatus: string;
  paymentId: string;
  createdAt:string
}
