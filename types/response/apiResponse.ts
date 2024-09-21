

export interface apiResponse<T> {
    successful: boolean;
    message: string;
    data: T;
    errors: string[];
}