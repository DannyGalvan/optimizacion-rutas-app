import { OrderForm } from "@/app/(principal)/checkIn";
import { api } from "@/config/axiosConfig";
import { OrderRequest } from "@/types/request/orderRequest";
import { apiResponse } from "@/types/response/apiResponse";


export const createOrder = async (order: OrderForm) => {

    const orderRequest: OrderRequest = {
        customerId: order.customerId,
        total: order.total,
        address: {
            name: order.name,
            latitude: order.latitude,
            longitude: order.longitude,
        },
        orderDetails: order.orderDetails
    };

    const response = await api.post<OrderRequest, apiResponse<string[]>>(
        "/orders/create",
        orderRequest
    );

    return response;
}
