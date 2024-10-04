import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { Alert } from "react-native";

interface OrderState {
  products: OrderProducts[];
  addProduct: (product: ProductResponse) => void;
  updateProduct: (id: number) => void;
  removeProduct: (id: string) => void;
  hasProduct: (id: number) => boolean;
  countProducts: () => number;
  clearProducts: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  products: [],
  addProduct: (product) => {
    const newProduct: OrderProducts = {
      id: Crypto.randomUUID(),
      quantity: 1,
      product,
    };
    set({ products: [...get().products, newProduct] });
    Alert.alert(
      "Producto agregado",
      `El producto ${product.name} ha sido agregado al carrito`
    );
  },
  updateProduct: (id) => {
    const index = get().products.findIndex((p) => p.product.id === id);
    const newProducts = [...get().products];
    newProducts[index] = {
      ...newProducts[index],
      quantity: newProducts[index].quantity + 1,
    };
    set({ products: newProducts });
    Alert.alert(
      "Producto actualizado",
      `El producto ${newProducts[index].product.name} ha sido agregado al carrito`
    );
  },
  removeProduct: (id) => {
    set({ products: get().products.filter((p) => p.id !== id) });
  },
  hasProduct: (id) => {
    return get().products.some((p) => p.product.id === id);
  },
  countProducts: () => {
    return get().products.reduce((acc, p) => acc + p.quantity, 0);
  },
  clearProducts() {
      set({products: []});
  },
}));
