import { useAuth } from "@/hooks/useAuth";
import { LoadingComponent } from "@/components/LoadinigComponent";
import { FlatList, Image, Text, View } from "react-native";
import { TextStyles } from "@/styles/textStyles";
import { useProducts } from "@/hooks/useProducts";
import { InputSearch } from "@/components/inputs/InputSearch";
import { appStyles } from "@/styles/appStyles";
import { InputSelect } from "@/components/inputs/InputSelect";
import { getAllClassifications } from "@/services/catalogueService";
import { ProductCard } from "@/components/cards/ProductCard";

export default function HomeScreen() {
  const { loading } = useAuth();
  const { data, error, isLoading, updateSearchKey, updateClassify } = useProducts();

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
        onSelect={(item, index) => updateClassify(item.id)}
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
          renderItem={(item) => <ProductCard data={item} />}
        />
      </View>
    </View>
  );
}
