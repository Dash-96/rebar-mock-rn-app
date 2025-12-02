import { createContext, useContext } from "react";
import { ProductClientState } from "@/models/productModel";

export const ProductContext = createContext<ProductClientState | undefined>(
  undefined
);

export function useProductContext() {
  const prodcut = useContext(ProductContext);

  if (prodcut === undefined) {
    throw new Error("useProductContext must be used with productContext");
  }

  return prodcut;
}
