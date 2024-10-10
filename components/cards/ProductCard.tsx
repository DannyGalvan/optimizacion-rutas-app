import { useOrderDetails } from "@/hooks/useOrderDetails";
import { appColors } from "@/styles/appStyles";
import {
  Image,
  ListRenderItemInfo,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";

interface ProductCardProps {
  data: ListRenderItemInfo<ProductResponse>;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  const colorSheme = useColorScheme();
  const { addProduct, updateProduct, hasProduct } = useOrderDetails();

  const handleAddOrUpdateProduct = () => {
    if (hasProduct(data.item.id)) {
      updateProduct(data.item.id);
    } else {
      addProduct(data.item);
    }
  };

  return (
    <TouchableOpacity
      style={colorSheme === "dark" ? styles.shadowDark : styles.shadow}
      className="bg-cyan-300 rounded-lg p-3 m-2 border-2 border-gray-600"
      onPress={handleAddOrUpdateProduct}
    >
      <View className="flex flex-row justify-between">
        <Text className="font-bold text-md">{data.item.name}</Text>
        <Image
          className="w-20 h-20"
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png",
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowDark: {
    shadowColor: appColors.white,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 6.68,

    elevation: 14,
  },
  shadow: {
    shadowColor: appColors.black,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 6.68,

    elevation: 14,
  },
});
