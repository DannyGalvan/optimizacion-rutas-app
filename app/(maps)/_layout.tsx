import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: "Ubicacion",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="routes"
        options={{
          title: "Rutas",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
