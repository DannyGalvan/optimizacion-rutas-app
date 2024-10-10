import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { Alert } from "react-native";
import { addStoreData, getStoreData } from "@/services/Storage";

interface OrderState {
  isLoading: boolean;
  products: OrderProducts[];
  syncProducts: () => void;
  addProduct: (product: ProductResponse) => void;
  updateProduct: (id: number) => void;
  substractProduct: (id: number) => void;
  removeProduct: (id: string) => void;
  hasProduct: (id: number) => boolean;
  countProducts: () => number;
  totalOrder: () => number;
  clearProducts: () => void;
}

const PRODUCTS_KEY = "order";

export const useOrderStore = create<OrderState>((set, get) => ({
  products: [],
  isLoading: false,
  syncProducts: async () => {
    set({ isLoading: true });
    const products = await getStoreData<OrderProducts[]>(PRODUCTS_KEY);
    set({ products: products ?? [] });
    console.log("Productos sincronizados");
    set({ isLoading: false });
  },
  addProduct: (product) => {
    const newProduct: OrderProducts = {
      id: Crypto.randomUUID(),
      quantity: 1,
      product,
    };
    const newProducts = [...get().products, newProduct];
    set({ products: newProducts });
    addStoreData(PRODUCTS_KEY, newProducts);
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
    addStoreData(PRODUCTS_KEY, newProducts);
  },
  substractProduct: (id) => {
    const index = get().products.findIndex((p) => p.product.id === id);
    const newProducts = [...get().products];
    if (newProducts[index].quantity > 1) {
      newProducts[index] = {
        ...newProducts[index],
        quantity: newProducts[index].quantity - 1,
      };
      set({ products: newProducts });
      addStoreData(PRODUCTS_KEY, newProducts);
    } else {
      Alert.alert(
        "Producto Eliminado",
        `El minimo de compra de ${newProducts[index].product.name} es 1 unidad`
      );
    }
  },
  removeProduct: (id) => {
    const products = get().products.filter((p) => p.id !== id);
    set({ products });
    addStoreData(PRODUCTS_KEY, products);
    Alert.alert(
      "Producto Eliminado",
      `El producto ha sido eliminado del carrito`
    );
  },
  hasProduct: (id) => {
    return get().products.some((p) => p.product.id === id);
  },
  countProducts: () => {
    return get().products.reduce((acc, p) => acc + p.quantity, 0);
  },
  totalOrder: () => {
    return get().products.reduce(
      (acc, p) => acc + p.quantity * p.product.price,
      0
    );
  },
  clearProducts() {
    set({ products: [] });
    addStoreData(PRODUCTS_KEY, []);
  },
}));
