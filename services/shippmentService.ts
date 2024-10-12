import { api } from "@/config/axiosConfig";
import { Shipment } from "@/types/response/shipmentsResponse";


export const createShippment = async () => {
   return api.post<object, string>('/shipments/createShipments');
};

export const getShippment = async () => {
    return api.get<object, Shipment[]>('/shipments/getShipments');
};