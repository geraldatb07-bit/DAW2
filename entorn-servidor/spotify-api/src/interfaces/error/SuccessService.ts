export interface successService<T> {
    success: boolean;
    code: number;
    data: T;
}