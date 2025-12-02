import { Button } from "@react-navigation/elements";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { signUp } from "@/api/authAPI";
import { Credentails, LoginResponse } from "@/models/userModel";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
export default function Signup() {
  const {
    data: response,
    mutate,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation<LoginResponse, Error, Credentails>({
    mutationKey: ["signUp"],
    mutationFn: (credentials: Credentails) => signUp(credentials),
  });
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function storeToken(t: string) {
    await SecureStore.setItemAsync("token", t);
  }
  useEffect(() => {
    if (isSuccess && response?.token) {
      (async () => {
        await storeToken(response.token);
        router.replace("/(tabs)");
      })();
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <Text>Signup screen</Text>
      <TextInput
        onChangeText={(text) => setUserName(text)}
        style={styles.input}
        placeholder="שם משתמש"
      ></TextInput>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="סיסמא"
      ></TextInput>
      <Button
        onPressOut={() =>
          mutate({
            username: userName,
            password: password,
          })
        }
      >
        התחברות
      </Button>
      {isPending && <Text>Loading Token...</Text>}
      {isError && <Text>{error.message}</Text>}
      <Link href="/(tabs)">תפריט</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 30,
  },
  input: {
    width: "50%",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
});
