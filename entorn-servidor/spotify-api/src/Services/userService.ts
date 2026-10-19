import { randomUUID } from "crypto";
import { users } from "../data/user/user.data";
import { isValidUser } from "../validators/user.validator";
import type { User } from "../interfaces/User/user";
import type { UserBD } from "../interfaces/User/userBD";
import type { deleteSuccessService } from "../interfaces/error/deleteSuccessService";
import type { errorService as ErrorService } from "../interfaces/error/errorService";
import type { successService as SuccessService } from "../interfaces/error/SuccessService";
import type { updateSuccessService } from "../interfaces/error/updateSuccessService";

export function getAllUsers(): UserBD[] {
    return users;
}

export function getUserById(id: string): UserBD | undefined {
    return users.find(user => user.id === id);
}

export function createUser(user: User): SuccessService<UserBD> | ErrorService {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const userRecord: UserBD = {
        id: randomUUID(),
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country
    };

    users.push(userRecord);
    return { success: true, data: userRecord, code: 201 };
}

export function putUser(
    user: User,
    id: string
): updateSuccessService<UserBD> | ErrorService {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data." };
    }

    const index = users.findIndex(existingUser => existingUser.id === id);

    if (index === -1) {
        return { success: false, code: 404, message: `User ${id} not found.` };
    }

    const userRecord: UserBD = {
        id,
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country
    };

    users[index] = userRecord;
    return { success: true, data: userRecord, code: 200, index };
}

export function deleteUser(id: string): deleteSuccessService | ErrorService {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return { success: false, code: 404, message: `User ${id} not found.` };
    }

    users.splice(index, 1);
    return { success: true, code: 204, index };
}