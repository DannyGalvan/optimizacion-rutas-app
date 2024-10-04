

export interface apiResponse<T> {
    success: boolean;
    successful: boolean;
    message: string;
    data: T;
    errors: string[];
}