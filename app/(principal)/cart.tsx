import { useOrderDetails } from "@/hooks/useOrderDetails";
import { Button, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function CartScreen() {
  const { products, clearProducts } = useOrderDetails();
  return (
    <ScrollView>
      <Button title="limpiar carrito" onPress={clearProducts} />
      <Text>{JSON.stringify(products, null, 2)}</Text>
    </ScrollView>
  );
}
