import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { LoadingComponent } from "@/components/LoadinigComponent";

export default function HomeScreen() {
  const { isLoggedIn, username, token, loading } = useAuth();

  if (loading) {
    return <LoadingComponent title="cargando..." />;
  }

  return (
    <View>
      <Link href={"/(maps)"}>
        <ThemedText type="link">Location</ThemedText>
      </Link>
      <ThemedText type="default">
        {JSON.stringify({ isLoggedIn, username, token }, null, 2)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
