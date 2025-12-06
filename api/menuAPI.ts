import { API_BASE_URL } from "@/config/constants";
import { retrieveToken } from "@/utils/authUtils";

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

export async function getPopularProducts() {
  let token = await retrieveToken();
  let response = await fetch(API_BASE_URL + "/product/popular", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  let data = await response.json();
  console.log("popular is: ", data);
  return data;
}

// export const menuAPI = async (url: string, options: RequestInit = {}) => {
//   const token = useTokenStore((state) => state.token);

//   const headers = {
//     ...(options.headers || {}),
//     Authorization: token ? `Bearer ${token}` : undefined,
//   };
//   return fetch(API_BASE_URL + url, {...options, headers});
// };
