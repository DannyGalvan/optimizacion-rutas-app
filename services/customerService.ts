import { api } from "@/config/axiosConfig";
import { customerRequest } from "@/types/request/customerRequest";
import { apiResponse } from "@/types/response/apiResponse";


export const registerCustomer = async (customer: customerRequest): Promise<apiResponse<string>> => {
    const response = await api.post<customerRequest, apiResponse<string>>("/customer/register", customer);

    return response;
}

export const getAddresses = async (customerId: number): Promise<apiResponse<string[]>> => {
    const response = await api.get<object, apiResponse<string[]>>(`/customer/addresses/${customerId}`);

    return response;
}