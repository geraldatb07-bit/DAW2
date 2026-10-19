export interface selectSuccessService<T> {
    success: boolean;
    code: number;
    data: T;
}