// export async function storeToken(token: string) {
//   await SecureStore.setItemAsync("token", token);
// }
import * as SecureStorage from "expo-secure-store";
export async function retrieveToken() {
  return await SecureStorage.getItemAsync("token");
}
