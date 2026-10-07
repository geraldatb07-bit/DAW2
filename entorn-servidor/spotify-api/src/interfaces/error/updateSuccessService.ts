export interface updateSuccessService<T> {
    success: true;
    code: number;
    data: T;
}