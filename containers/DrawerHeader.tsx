/* eslint-disable react/react-in-jsx-scope */
import { Icon } from "@/components/icons/Icon";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export const DrawerHeader = (props: DrawerContentComponentProps) => {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/logo_app.png")}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        inactiveTintColor={Colors.red}
        label="Cerrar Sesión"
        onPress={logout}
        icon={({ color, size }) => (
          <Icon name={"power"} size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
