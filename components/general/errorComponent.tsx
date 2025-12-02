import { View, Text } from "react-native";
import { colors } from "@/app/styles/rootStyle";
interface Props {
  message: string;
}

export default function CustomError({ message }: Props) {
  return (
    <View style={{ justifyContent: "center", alignContent: "center" }}>
      <Text style={{ color: colors.error, fontSize: 24 }}>{message}</Text>
    </View>
  );
}
