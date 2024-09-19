import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack initialRouteName="location">
      <Stack.Screen
        name="index"
        options={{
          title: "Location",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
