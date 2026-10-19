export interface updateSuccessService<T> {
    success: boolean;
    code: number;
    index: number;
    data: T;
}