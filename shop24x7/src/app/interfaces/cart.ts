export interface cart {
    isEmpty: boolean;
    cartItems: {
        product: any,
        quantity: number
    }[]
}