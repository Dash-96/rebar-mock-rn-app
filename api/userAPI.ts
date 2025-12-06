import { API_BASE_URL } from "@/config/constants";
import { retrieveToken } from "@/utils/authUtils";

export async function getUserLevel() {
  let token = await retrieveToken();
  let response = await fetch(API_BASE_URL + "/user/level", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  let data = await response.json();
  console.log("user level: ", data["status"]);
  return data;
}
