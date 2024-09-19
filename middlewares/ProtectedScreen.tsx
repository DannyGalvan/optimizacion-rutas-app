import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter, useSegments } from "expo-router";

interface ProtectedScreenProps {
  children: React.ReactNode;
}

const ProtectedScreen = ({ children }: ProtectedScreenProps) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href={"(auth)"}/>;
  }

  return children;
};

export default ProtectedScreen;
