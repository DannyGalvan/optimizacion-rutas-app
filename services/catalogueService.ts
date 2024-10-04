import { api } from "@/config/axiosConfig";
import { apiResponse } from "@/types/response/apiResponse";


export const getAllClassifications = async () => {
    const response = await api.get<any, apiResponse<ClassificationResponse []>>("/classification/all");
  
    return response.data;
  };


  export const getAllSuppliers = async () => {
    const response = await api.get("/supplier/all");
  
    return response.data;
  };