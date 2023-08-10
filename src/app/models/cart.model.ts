export interface Cart{
    userId:string,
    cartItems:[
        {
            productId:any[],
            quantity:number
        }
    ],
    totalPrice:number,
    totalItems:number
}