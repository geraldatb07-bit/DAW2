export interface updateSuccessService<T> {
    success: boolean;
    code: number;
    data: T;
    index?: number;
}