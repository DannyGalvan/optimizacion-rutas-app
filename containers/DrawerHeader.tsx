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
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export const DrawerHeader = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { logout, role } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/logo_app.png")}
        />
      </View>
      {
        role === 2 && (<DrawerItemList descriptors={props.descriptors} navigation={props.navigation} state={props.state} />)
      }
       {
        role === 1 && (
          <>
            <DrawerItem
              inactiveTintColor={Colors.green}
              label="Home"
              onPress={() => router.navigate("(principal)/home")}
              icon={({ color, size }) => (
                <Icon name={"home"} size={size} color={color} />
              )}
            />
            <DrawerItem
              inactiveTintColor={Colors.green}
              label="Rutas"
              onPress={() => router.navigate("(maps)/routes")}
              icon={({ color, size }) => (
                <Icon name={"location"} size={size} color={color} />
              )}
            />            
          </>
        )
      }
      <DrawerItem
        inactiveTintColor={Colors.green}
        label="Mapa"
        onPress={() => router.navigate("(maps)")}
        icon={({ color, size }) => (
          <Icon name={"locate"} size={size} color={color} />
        )}
      />     
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
