

export interface loginResponse {
    id: number;
    token: string;
    alias: string;
    email: string;
    authorities: [];
    type: string;
    role: number;
    expirationDate: string;
}
