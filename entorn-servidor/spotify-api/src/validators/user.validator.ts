import { User } from "../interfaces/User/user";

export function isValidUser(user: User): boolean | string | undefined {
    if (!user || !user.email || !user.country) {
        return false;
    }
}