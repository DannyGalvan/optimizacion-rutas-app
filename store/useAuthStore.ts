import { api } from "@/config/axiosConfig";
import { getStoreData, removeValue, storeAuth } from "@/services/Storage";
import { create } from "zustand";

export interface AuthState {
    isLoggedIn: boolean;
    username?: string;
    token: string;
    idUser: number;
}

export const InitialAuthState: AuthState = {
    isLoggedIn: false,
    username: undefined,
    token: "",
    idUser: 0,
}

export interface SignIn {
    username: string;
    token: string;
    idUser: number;
}

interface AuthStoreState {
    authState: AuthState;
    isLoadingAuth: boolean;
    signIn: (data: SignIn) => void;
    initializeAuth: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    authState: InitialAuthState,
    isLoadingAuth: false,
    signIn: (state) => {
        api.defaults.headers.common.Authorization = `Bearer ${state.token}`;
        const newState = { ...state, isLoggedIn: true };
        set({ authState: newState });
        storeAuth(newState);
    },
    initializeAuth: async () => {
        set({ isLoadingAuth: true });
        const data = await getStoreData<AuthState>('@auth');
        if (data) {
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            set({ authState: { ...data } });
        }
        set({ isLoadingAuth: false });
    },
    logout: () => {
        api.defaults.headers.common.Authorization = null;
        removeValue('@auth');
        set({ authState: InitialAuthState });
    },
}));