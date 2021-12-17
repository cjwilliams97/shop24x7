import { product } from "./product"
import { cartItem } from "./cartItem"
export interface order {
    
    _id: string,
    userId: string,
    userEmail: string,
    cart: cartItem[],
    orderTotal: number,
    date: string,
    delivered: boolean


}[]