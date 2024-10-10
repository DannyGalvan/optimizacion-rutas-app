
export interface OrderDetailRequest {
    productId: number;
    lineTotal: number;
    quantity: number;
}

export interface AddressRequest {
    name: string;
    longitude: number;
    latitude: number;
}

export interface OrderRequest {
    customerId: number;
    total: number;
    address: AddressRequest;
    orderDetails: OrderDetailRequest[];
}