import { API_BASE_URL } from "@/config/constants";
import { Credentails, LoginResponse } from "@/models/userModel";

export async function signUp(credentials: Credentails) {
  console.log("credentials", credentials.username, " ", credentials.password);
  const res = await fetch(API_BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: credentials.username,
      password: credentials.password,
      action: "login",
    }).toString(),
  });
  // console.log(await res.text());
  return res.json();
}
