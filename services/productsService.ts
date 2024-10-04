import { api } from "@/config/axiosConfig";
import { apiResponse } from "@/types/response/apiResponse";

interface ProductFilters {
  search?: string;
  classifyId?: number;
  supplierId?: number;
}

export const searchProducts = async (filters: ProductFilters) => {
  const response = await api.get<any, apiResponse<ProductResponse []>>(
    "/products/filter",
    { params: filters }
  );

  return response.data;
};
