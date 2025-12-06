import { getPopularProducts } from "@/api/menuAPI";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import CustomError from "../general/errorComponent";

export default function PopularList() {
  const { data: products, isError, error, isLoading } = useQuery({ queryKey: ["populars"], queryFn: getPopularProducts });

  if (isError) return <CustomError message={error.message} />;
  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return <View></View>;
}
