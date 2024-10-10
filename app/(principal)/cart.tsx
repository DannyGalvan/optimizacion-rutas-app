import { TouchableButton } from "@/components/buttons/TouchableButton";
import { Icon } from "@/components/icons/Icon";
import { LoadingComponent } from "@/components/LoadinigComponent";
import { Colors } from "@/constants/Colors";
import { useOrderDetails } from "@/hooks/useOrderDetails";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  const {navigate} = useRouter();
  const { products, clearProducts, removeProduct, updateProduct, substractProduct, isLoading, totalOrder } = useOrderDetails();
  return (
    <View className="flex-1 p-12">
      {
        isLoading ? (
          <LoadingComponent title="Cargando Productos..." />
        ) : (<FlatList
          data={products}
          scrollEnabled
          renderItem={(productsData) => {
            return (
              <View
                style={styles.item}
                className="bg-gray-400 flex-row flex justify-between p-10 border border-white rounded-md mt-5">
                <Icon
                  style={styles.icon}
                  name="trash"
                  size={25}
                  color={Colors.red}
                  onPress={() => removeProduct(productsData.item.id)} />
                <Text className="text-md font-bold w-24">{productsData.item.product.name}</Text>
                <View className="flex flex-row justify-between w-28">
                  <TouchableButton iconColor={Colors.green} iconSize={35} icon="add-circle" title="" onPress={() => updateProduct(productsData.item.product.id)} />
                  <Text className="text-lg font-bold">{productsData.item.quantity}</Text>
                  <TouchableButton iconColor={Colors.red} iconSize={35} icon="remove-circle" title="" onPress={() => substractProduct(productsData.item.product.id)} />
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center">
              <Text className="text-slate-800 text-4xl font-bold">No Hay Productos 🥲</Text>
            </View>
          }
        />
        )
      }
      <Text className="text-black dark:text-white font-bold text-lg">Total a Pagar Q.{totalOrder().toFixed(2)}</Text>
      <View className="flex items-center">
        <TouchableButton
          textClassName="text-xl font-bold text-white"
          className="rounded-xl" styles={styles.checkInButton}
          icon="list-sharp"
          iconColor="white"
          title="CheckIn" onPress={()=>navigate("checkIn")} />
      </View>
      <View className="flex items-center">
        <TouchableButton
          textClassName="text-xl font-bold text-white"
          className="rounded-xl" styles={styles.button}
          icon="trash"
          iconColor="white"
          title="Limpiar Carrito" onPress={clearProducts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: "75%",
  },
  checkInButton: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: "75%",
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
