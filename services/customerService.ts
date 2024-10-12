import { api } from "@/config/axiosConfig";
import { customerRequest } from "@/types/request/customerRequest";
import { apiResponse } from "@/types/response/apiResponse";


export const registerCustomer = async (customer: customerRequest): Promise<apiResponse<string>> => {
    const response = await api.post<customerRequest, apiResponse<string>>("/customer/register", customer);

    return response;
}

export const getAddresses = async (customerId: number): Promise<AddressResponse[]> => {
    try {
        const response = await api.get<object, apiResponse<AddressResponse[]>>(`/customer/addresses/${customerId}`);

        return response.data ?? [];
    } catch (error) {
        return [];
    }
}