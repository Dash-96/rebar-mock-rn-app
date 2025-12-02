import { createContext, useContext, ReactNode, useState } from "react";
import { Product } from "@/models/productModel";

type MenuContextType = {
  products: Product[];
  setProducts: (items: Product[]) => void;
};

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function ProductsContext({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  return <MenuContext.Provider value={{ products, setProducts }}>{children}</MenuContext.Provider>;
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenuContext must be used with a MenuContext");
  }
  return context;
}
