//represents data coming from the database
export interface Product {
  id: number;
  name: string;
  ingredients: string;
  image: string;
  category: string;
  price: string;
}

//represents data used in the app including user selections
export interface ProductClientState extends Product {
  quantity: number;
  size: "small" | "medium" | "large";
  changes: string[];
  upgrades: Upgrade[];
  base: string;
  basePrice: number;
  totalPrice: number;
}

//.==========================
export interface Category {
  id: number;
  categoryName: string;
  categoryProducts: Product[];
}
//.=========================
export interface Ingredient {
  id: number;
  name: string;
  is_available: boolean;
}
//.=========================
export interface Upgrade {
  title: string;
  price: number;
  quaintity: number;
}
