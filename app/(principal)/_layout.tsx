import { Drawer } from "expo-router/drawer";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerHeader } from "@/containers/DrawerHeader";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { useOrderDetails } from "@/hooks/useOrderDetails";

export default function DrawerLayout() {
  const sheme = useColorScheme();
  const {countProducts} = useOrderDetails();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={DrawerHeader}
        screenOptions={{
          headerTintColor: sheme == 'dark' ? Colors.white : Colors.black,
        }}
        initialRouteName="index"
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Optimización Rutas App",
            drawerLabel: "Home",
            drawerIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Drawer.Screen
          name="cart"
          options={{
            title: "Optimización Rutas App",
            drawerLabel: `Carrito (${countProducts()})`,
            drawerIcon: ({ color }) => <TabBarIcon name="cart" color={color} />,
          }}
        />
        <Drawer.Screen
          name="explorer"
          options={{
            title: "Optimización Rutas App",
            drawerLabel: "Explorer",
            drawerIcon: ({ color }) => (
              <TabBarIcon name="compass" color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
