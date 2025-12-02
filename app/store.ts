import { create } from "zustand";
import { ProductClientState } from "@/models/productModel";
import { Cart } from "@/models/cartModel";
//?===Product Store======
const defaultProduct: ProductClientState = {
  quantity: 0,
  size: "small",
  changes: [],
  base: "",
  id: 0,
  name: "",
  ingredients: "",
  image: "",
  category: "",
  price: "",
  upgrades: [],
  basePrice: 0,
};
//.defines the structure of the store for productState
type ProductStore = {
  product: ProductClientState;
  setProduct: (properties: Partial<ProductClientState>) => void;
};
//.create the store to be used by client in oreder to store and manipulate data of productState
export const useProductsStore = create<ProductStore>((set) => ({
  product: defaultProduct,
  setProduct: (properties: Partial<ProductClientState>) => {
    set((state) => ({ product: { ...state.product, ...properties } }));
  },
}));

//?======Cart store=======
const defaultCart: Cart = {
  cartItems: [],
};
type CartStore = {
  cart: Cart;
  addCartItem: (cartItem: ProductClientState) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: defaultCart,
  //.Pushes a new cart item and updates the state
  addCartItem: (cartItem: ProductClientState) => {
    set((state) => ({ cart: { cartItems: [...state.cart.cartItems, cartItem] } }));
  },
}));

//?======Token Store======
type TokenStore = {
  token: string;
  setToken: (token: string) => void;
};

export const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  setToken: (token: string) => {
    set({ token: token });
  },
}));
