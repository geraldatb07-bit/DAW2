export interface createSuccessService<T> {
    success: boolean;
    code: number;
    data: T;
}