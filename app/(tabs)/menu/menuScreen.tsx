import { View, Text, FlatList, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import CategoryScrollBar from "@/components/menu/menuCategory";
import { fetchProducts } from "@/api/menuAPI";
import { useTokenStore } from "@/app/store";
import CustomError from "@/components/general/errorComponent";
export default function Menu() {
  const token = useTokenStore((state) => state.token);
  const categories = ["classic", "mix & creamy", "super", "pro"];
  //const [products, setProducts] = useState<Product[]>([]);
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(token),
  });
  //test to see impact of useEffect========================
  /*?const { products: items, setProducts } = useMenuContext();
  useEffect(() => {
    (async () => {
      let data = await fetchProducts(token);
      setProducts(data);
    })();
  }, []);**/
  // console.log(`products from fetch are:  ${products ? "here" : "not here"}`);
  //===========End Test=======================
  function renderCategory({ item }: { item: string }) {
    return <CategoryScrollBar category={item} /*products={products.filter((prodcut: Product) => prodcut.category === item)}*/></CategoryScrollBar>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <CustomError message={error.message}></CustomError>;
  }

  return (
    <View style={{ marginHorizontal: 10, backgroundColor: "white", flex: 1 }}>
      <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => item}></FlatList>
    </View>
  );
}
