import { useTokenStore } from "@/app/store";
import { API_BASE_URL } from "@/config/constants";
import { Product } from "@/models/productModel";

export const fetchProducts = async (token: string) => {
  const response = await fetch(API_BASE_URL + "/product", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    throw new Error("Unathorized");
  }
  return await response.json();
};

export const fetchIngredients = async (token: string) => {
  const response = await fetch(API_BASE_URL + "/product/ingredients", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401) {
    throw new Error("Unathorized");
  }
  return response.json();
};

// export const menuAPI = async (url: string, options: RequestInit = {}) => {
//   const token = useTokenStore((state) => state.token);

//   const headers = {
//     ...(options.headers || {}),
//     Authorization: token ? `Bearer ${token}` : undefined,
//   };
//   return fetch(API_BASE_URL + url, {...options, headers});
// };
