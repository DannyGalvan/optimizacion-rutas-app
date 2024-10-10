import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter, useSegments } from "expo-router";

interface LoginRedirectScreenProps {
  children: React.ReactNode;
}

const LoginRedirectScreen = ({ children }: LoginRedirectScreenProps) => {
  const segments = useSegments();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    if (segments[0] === "(auth)") {
      return <Redirect href={"(principal)"}/>;
    }
  }

  return children;
};

export default LoginRedirectScreen;
