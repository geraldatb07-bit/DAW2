import { UserInput } from "../interfaces/User/user";

export function isValidUser(user: UserInput): boolean {
    if (!user || !user.email || !user.country) {
        return false;
    }

    return user.email.trim().length > 0 && user.country.trim().length > 0;
}