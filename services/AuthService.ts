import { api } from "@/config/axiosConfig";
import { loginRequest } from "@/types/request/loginRequest";
import { apiResponse } from "@/types/response/apiResponse";
import { loginResponse } from "@/types/response/loginResponse";


export const login = async(login: loginRequest):Promise<apiResponse<loginResponse>>=>{

    const response = await api.post<any,apiResponse<loginResponse>, any>("login",login);

    return response;
}