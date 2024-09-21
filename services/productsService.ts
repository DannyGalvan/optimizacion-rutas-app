import { api } from "@/config/axiosConfig";

interface ProductFilters {
  search?: string;
  classifyId?: number;
  supplierId?: number;
}

export const searchProducts = async (filters: ProductFilters) => {
  const response = await api.get("/products/filter", { params: filters });

  return response.data;
};
