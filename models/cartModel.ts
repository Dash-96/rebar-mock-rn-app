import { ProductClientState } from "./productModel";

export interface Cart {
  cartItems: ProductClientState[];
}

export interface checkoutItem {
  totalPrice: number;
  productList: string[];
  cartId: number;
}
// export interface CartItem{
//     products: ProductClientState[];
// }
