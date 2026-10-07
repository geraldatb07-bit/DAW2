export interface SuccessService<T>{
    success: true;
    code: number;
    data: T;
}