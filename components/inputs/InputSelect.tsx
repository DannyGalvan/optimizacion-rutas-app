import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "../icons/Icon";
import { useCountStore } from "@/store/useCountStore";
import { set } from "zod";
import { TouchableButton } from "../buttons/TouchableButton";
import { appColors } from "@/styles/appStyles";

interface InputSelectProps<T> {
  queryKey: string;
  entity: string;
  selector: (data: T) => string;
  queryFn: () => Promise<T []>;
  onSelect: (selectedItem: T, index: number) => void;
  textInput: string;
}

export const InputSelect = <T extends object>({
  queryKey,
  queryFn,
  onSelect,
  entity,
  selector,
  textInput,
}: InputSelectProps<T>) => {
  const {setCount} = useCountStore();

  const { isPending, data, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
    staleTime: 0,
  });

  useEffect(() => {
    setCount(data?.length || 0);
  }, [data]);

  return (
    <View className="flex flex-row justify-center px-4">
      {
        !isPending && (<SelectDropdown
          searchInputStyle={{ width: "100%" }}
          data={data ?? []}
          onSelect={onSelect}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <Icon
                    name={selectedItem.icon}
                    style={styles.dropdownButtonIconStyle}
                  />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.name) ||
                    `${textInput} ${entity}`}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}     
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Icon name={"add-circle"} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{selector(item)}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={true}
          dropdownStyle={styles.dropdownMenuStyle}
          search
          searchPlaceHolder={`Buscar ${entity}`}
        />) 
      }
      <TouchableButton iconColor={appColors.white} styles={styles.refreshButton} icon="refresh" title="" onPress={refetch} />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "90%",
    height: 45,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    marginTop: -30,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  refreshButton: {
    backgroundColor: appColors.primary,
  }
});
