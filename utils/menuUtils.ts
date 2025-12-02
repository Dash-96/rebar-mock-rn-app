import { Product, Category } from "@/models/productModel";
import { useQueryClient } from "@tanstack/react-query";

//return an array of category objects
// each object contains category name, and the products in that category
export function sortbyCategory(categories: string[], products: Product[]) {
  let sortedProducts: Category[] = [];
  categories.forEach((category, index) => {
    sortedProducts.push({
      id: index,
      categoryName: category,
      categoryProducts: products.filter((product) => product.category === category),
    });
  });
  return sortedProducts;
}
//.Generic Wraper function for react query getQueryData
//.Avoids using nullable and undefined in the code
export function useQueryData<T>(key: string): T {
  const queryClient = useQueryClient();
  const queryData: T | undefined = queryClient.getQueryData([key]);
  if (queryData === undefined) {
    throw new Error("invalid key or query not containing data");
  }
  return queryData;
}
