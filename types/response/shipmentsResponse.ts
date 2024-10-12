

export interface Customer {
    name: string;
    phone: string;
    addressName: string;
    latitude: string;
    longitude: string;
}

export interface OrderDetail {
    product: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Order {
    id: number;
    orderDate: string;
    total: number;
    orderDetail: OrderDetail[];
}

export interface Driver {
    name: string;
    phone: string;
    schedule: string;
}

export interface Vehicle {
    plateNumber: string;
    stopLimit: number;
    description:  string;
    driver: Driver;
}

export interface Warehouse {
    addressName: string;
    latitude: string;
    longitude: string;
}

export interface Shipment {
   message: string;
   totalWarehousePickupCost: number;
   deliveryTransportationCost: number;
   customer: Customer;
   order: Order;
   vehicle: Vehicle;
   warehouses: Warehouse[];
}