import { API_BASE_URL } from "@/config/constants";
import { Order } from "@/models/orderModel";
import { retrieveToken } from "@/utils/authUtils";

export async function createOrder(order: Order) {
  let token = await retrieveToken();
  let response = await fetch(API_BASE_URL + "/order", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ total_price: order.totalPrice.toString(), items: JSON.stringify(order.items) }).toString(),
  });

  let data = await response.json();
  console.log("response from order is: ", data);
  return data;
}

export async function getOrders() {
  let token = await retrieveToken();
  let response = await fetch(API_BASE_URL + "/order", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  let data = await response.json();
  return data;
}
