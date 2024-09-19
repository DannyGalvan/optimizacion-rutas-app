import React, { createContext, useEffect, useReducer, useState } from "react";
import { authReducer } from "./AuthReducer";
import { api } from "@/config/axiosConfig";
import { getStoreData } from "@/services/Storage";
import { isLoading } from "expo-font";
import { LoadingComponent } from "@/components/LoadinigComponent";
import { useRouter } from "expo-router";

// Definir cómo luce, qué información tendré aquí
export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  token: string;
  idUser: number;
}

export interface signin {
  username: string;
  token: string;
  idUser: number;
}

// Estado inicial
export const authInitialState: AuthState = {
  isLoggedIn: false,
  username: undefined,
  token: "",
  idUser: 0,
};

// Lo usaremos para decirle a React cómo luce y qué expone el context
export interface AuthContextProps {
  authState: AuthState;
  loading: boolean;
  signIn: (data: signin) => void;
  initializeAuth: (data: AuthState) => void;
  logout: () => void;
  changeFavoriteIcon: (idUser: number) => void;
  changeUsername: (username: string) => void;
}

// Crear el contexto
export const AuthContext = createContext({} as AuthContextProps);

// Componente proveedor del estado
export const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authState, dispatch] = useReducer(
    authReducer,
    authInitialState
  );

  useEffect(() => {    
    const initializeAuthState = async () => {
      setLoading(true);

      const data = await getStoreData<AuthState>('@auth');
      
      if (data) {
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        dispatch({ type: "initialize", payload: data });
      }
      setLoading(false);
    };

    initializeAuthState();    
  }, []);

  const signIn = (data: signin) => {
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    dispatch({ type: "signIn", payload: data });
    router.replace("(principal)");
  };

  const initializeAuth = (data: AuthState) => {
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    dispatch({ type: "initialize", payload: data });
    router.replace("(principal)");
  };

  const changeFavoriteIcon = (idUser: number) => {
    dispatch({ type: "changeFavIcon", payload: idUser });
  };

  const logout = () => {
    api.defaults.headers.common.Authorization = null;
    dispatch({ type: "logout" });
    router.replace("(auth)");
  };

  const changeUsername = (username: string) => {
    dispatch({ type: "changeUsername", payload: username });
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        authState,
        signIn,
        initializeAuth,
        logout,
        changeFavoriteIcon,
        changeUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
