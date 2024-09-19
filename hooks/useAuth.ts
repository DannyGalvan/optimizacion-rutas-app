import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const { authState, logout, signIn, loading } = useContext(AuthContext);


  return {
    isLoggedIn: authState.isLoggedIn,
    logout,
    signIn,
    token: authState?.token,
    username: authState?.username,
    idUser: authState?.idUser,
    loading: loading,
  };
};
