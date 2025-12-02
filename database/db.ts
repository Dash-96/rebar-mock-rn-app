import * as SQLite from "expo-sqlite";
import { Product } from "@/models/productModel";

const getDB = async () => {
  const db = await SQLite.openDatabaseAsync("rebar_mock");
  return db;
};

export async function initDB() {
  const db = await getDB();
  const result = await db.execAsync(
    "CREATE TABLE if NOT EXISTS `products`(" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "ingredients TEXT," +
      "image_uri TEXT," +
      "category TEXT," +
      "base_price INTEGER" +
      ");"
  );
}

export async function clearDB() {
  const db = await getDB();
  const result = await db.execAsync("DELETE FROM products;");
}
export async function insertProduct(products: Product[]) {
  const db = await getDB();
  try {
    products.forEach(async (product) => {
      console.log("inserting product: ", product);
      let query = `INSERT INTO products ( ingredients, image_uri, category, base_price) VALUES ( '${product.ingredients}', '${product.image}', '${product.category}', '${product.base_price}' );`;
      await db.execAsync(query);
    });
  } catch (error) {
    console.log("insert error: ", error);
  }
}

export async function getTestProduct() {
  const db = await getDB();
  const result = await db.getAllAsync<Product>("SELECT * from products");
  console.log("fetch query === ", result);
  return result;
}
