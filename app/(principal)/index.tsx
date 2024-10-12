import { useAuth } from "@/hooks/useAuth";
import { LoadingComponent } from "@/components/LoadinigComponent";
import { FlatList, Text, View } from "react-native";
import { TextStyles } from "@/styles/textStyles";
import { useProducts } from "@/hooks/useProducts";
import { InputSearch } from "@/components/inputs/InputSearch";
import { appStyles } from "@/styles/appStyles";
import { InputSelect } from "@/components/inputs/InputSelect";
import { getAllClassifications } from "@/services/catalogueService";
import { ProductCard } from "@/components/cards/ProductCard";

export default function HomeScreen() {
  const { isLoading } = useAuth();
  const { data, isLoading : isLoadingProducts, updateSearchKey, updateClassify, refetch } = useProducts();

  if (isLoading) {
    return <LoadingComponent title="cargando..." />;
  }

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Text className={TextStyles.title} style={appStyles.textCenter}>
        Productos
      </Text>
      <InputSelect
        entity="clasificación"
        queryKey="classifications"
        textInput="Seleccione"
        onSelect={(item) => updateClassify(item.id)}
        queryFn={getAllClassifications}
        selector={(data) => data.name}
      />
      <InputSearch updateFn={updateSearchKey} />
      <View className="h-[600] my-5 mx-3">
        <FlatList
          scrollEnabled
          className="px-3"
          data={data}
          refreshing={isLoadingProducts}
          onRefresh={() => refetch()}
          renderItem={(item) => <ProductCard data={item} />}
        />
      </View>
    </View>
  );
}
