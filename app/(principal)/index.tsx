import { useAuth } from "@/hooks/useAuth";
import { LoadingComponent } from "@/components/LoadinigComponent";
import { FlatList, Image, Text, View } from "react-native";
import { TextStyles } from "@/styles/textStyles";
import { useProducts } from "@/hooks/useProducts";
import { InputSearch } from "@/components/inputs/InputSearch";
import { appStyles } from "@/styles/appStyles";
import { InputSelect } from "@/components/inputs/InputSelect";
import { getAllClassifications } from "@/services/catalogueService";

export default function HomeScreen() {
  const { loading } = useAuth();
  const { data, error, isLoading, updateSearchKey } = useProducts();

  if (loading) {
    return <LoadingComponent title="cargando..." />;
  }

  return (
    <View style={appStyles.screen}>
      <Text className={TextStyles.title} style={appStyles.textCenter}>
        Productos
      </Text>
      <InputSelect
        queryKey="classifications"
        onSelect={(item, index) => console.log({ item, index })}
        queryFn={getAllClassifications}
      />
      <InputSearch updateFn={updateSearchKey} />
      <View className="h-[600] my-5 mx-3">
        <FlatList
          scrollEnabled
          className="px-3"
          data={data}
          refreshing={isLoading}
          onRefresh={() => updateSearchKey("")}
          renderItem={(item) => {
            return (
              <View className="bg-cyan-300 rounded-lg p-3 m-2 border-2 border-gray-600">
                <View className="flex flex-row justify-between">
                  <Text className="font-bold text-md">{item.item.name}</Text>
                  <Image
                    className="w-20 h-20"
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png",
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
