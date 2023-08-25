import { Product } from "./product.model"

export interface Cart{
    userId:string,
    cartItems:[
        {
            productId:Product[],
            quantity:number
        }
    ],
    totalPrice:number,
    totalItems:number
}