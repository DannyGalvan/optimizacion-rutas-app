

export interface userRequest {
    email: string;
    password: string;
    alias: string;
    deleted: boolean;
}

export interface customerRequest {
    firstName: string;
    lastName: string;
    phone: string;
    nit: string;
    cui: string;
    user: userRequest;
}

export interface customerForm {
    firstName: string;
    lastName: string;
    phone: string;
    nit: string;
    cui: string;
    email: string;
    password: string;
    alias: string;
    deleted: boolean;
}