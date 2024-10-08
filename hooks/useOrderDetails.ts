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
    substractProduct,
    isLoading,
    syncProducts,
    totalOrder,
  } = useOrderStore();

  return {
    addProduct,
    countProducts,
    hasProduct,
    products,
    removeProduct,
    updateProduct,
    clearProducts,
    substractProduct,
    isLoading,
    syncProducts,
    totalOrder,
  };
};
