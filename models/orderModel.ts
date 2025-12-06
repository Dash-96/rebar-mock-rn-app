export interface Order {
  totalPrice: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  price: number;
}
