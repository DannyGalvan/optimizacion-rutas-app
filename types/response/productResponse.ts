

interface ProductResponse {
    id: number;
    name: string;
    price: number;
    deleted: boolean;
    clasification: ClassificationResponse;
    supplier: SupplierResponse;
}