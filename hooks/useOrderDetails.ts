import { useOrderStore } from "@/store/useOrderStore";

export const useOrderDetails = () => {
  const {
    addProduct,
    countProducts,
    hasProduct,
    products,
    removeProduct,
    updateProduct,
    clearProducts,
  } = useOrderStore();

  return {
    addProduct,
    countProducts,
    hasProduct,
    products,
    removeProduct,
    updateProduct,
    clearProducts,
  };
};
