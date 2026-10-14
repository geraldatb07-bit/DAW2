import { User } from "../interfaces/User/user";

export function isValidUser(user: User): boolean {
    if (!user || !user.email || !user.country) {
        return false;
    }

    return user.email.trim().length > 0 && user.country.countryName.trim().length > 0;
}