export interface User {
    id: string;
    email: string;
    country: string;
}

export type UserInput = Omit<User, "id">;